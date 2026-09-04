import { asc, eq } from "drizzle-orm"
import { db, pool } from "@/lib/db"
import { hotels, tourHotels, type Hotel, type NewHotel } from "@/lib/db/schema"
import { getMinioImageUrl } from "@/lib/minio"

function withDisplayHotelImage(hotel: Hotel): Hotel {
  return {
    ...hotel,
    image: getMinioImageUrl(hotel.image),
    gallery: hotel.gallery.map(getMinioImageUrl),
  }
}

export async function ensureHotelTables() {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    await client.query("SELECT pg_advisory_xact_lock(hashtext('tour_vietnam_hotel_tables'))")
    await client.query(`
      CREATE TABLE IF NOT EXISTS hotels (
        id serial PRIMARY KEY,
        name text NOT NULL,
        city text NOT NULL,
        quality text DEFAULT '4 ستاره' NOT NULL,
        address text DEFAULT '' NOT NULL,
        website text DEFAULT '' NOT NULL,
        phone text DEFAULT '' NOT NULL,
        image text DEFAULT '' NOT NULL,
        gallery jsonb DEFAULT '[]'::jsonb NOT NULL,
        description text DEFAULT '' NOT NULL,
        amenities jsonb DEFAULT '[]'::jsonb NOT NULL,
        notes text DEFAULT '' NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `)
    await client.query("ALTER TABLE hotels ADD COLUMN IF NOT EXISTS image text DEFAULT '' NOT NULL")
    await client.query("ALTER TABLE hotels ADD COLUMN IF NOT EXISTS gallery jsonb DEFAULT '[]'::jsonb NOT NULL")
    await client.query("ALTER TABLE hotels ALTER COLUMN quality SET DEFAULT '4 ستاره'")
    await client.query(`
      UPDATE hotels
      SET quality = CASE quality
        WHEN '3-star' THEN '3 ستاره'
        WHEN '4-star' THEN '4 ستاره'
        WHEN '5-star' THEN '5 ستاره'
        WHEN 'boutique' THEN 'بوتیک'
        WHEN 'resort' THEN 'ریزورت'
        WHEN 'homestay' THEN 'اقامتگاه محلی'
        ELSE quality
      END
      WHERE quality IN ('3-star', '4-star', '5-star', 'boutique', 'resort', 'homestay')
    `)
    await client.query(`
      CREATE TABLE IF NOT EXISTS tour_hotels (
        tour_id integer NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
        hotel_id integer NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
        created_at timestamp DEFAULT now() NOT NULL,
        PRIMARY KEY (tour_id, hotel_id)
      )
    `)
    await client.query("COMMIT")
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

export async function getAllHotels(): Promise<Hotel[]> {
  await ensureHotelTables()
  const rows = await db.select().from(hotels).orderBy(asc(hotels.city), asc(hotels.name))
  return rows.map(withDisplayHotelImage)
}

export async function getHotelById(id: number): Promise<Hotel | null> {
  await ensureHotelTables()
  const rows = await db.select().from(hotels).where(eq(hotels.id, id)).limit(1)
  return rows[0] ? withDisplayHotelImage(rows[0]) : null
}

export async function createHotelRecord(data: NewHotel): Promise<Hotel> {
  await ensureHotelTables()
  const rows = await db.insert(hotels).values(data).returning()
  return rows[0]
}

export async function updateHotelRecord(
  id: number,
  data: Partial<NewHotel>,
): Promise<Hotel | null> {
  await ensureHotelTables()
  const rows = await db
    .update(hotels)
    .set(data)
    .where(eq(hotels.id, id))
    .returning()

  return rows[0] ?? null
}

export async function getHotelIdsForTour(tourId: number): Promise<number[]> {
  await ensureHotelTables()
  const rows = await db
    .select({ hotelId: tourHotels.hotelId })
    .from(tourHotels)
    .where(eq(tourHotels.tourId, tourId))

  return rows.map((row) => row.hotelId)
}

export async function getHotelsForTour(tourId: number): Promise<Hotel[]> {
  await ensureHotelTables()
  const rows = await db
    .select({ hotel: hotels })
    .from(tourHotels)
    .innerJoin(hotels, eq(tourHotels.hotelId, hotels.id))
    .where(eq(tourHotels.tourId, tourId))
    .orderBy(asc(hotels.city), asc(hotels.name))

  return rows.map((row) => withDisplayHotelImage(row.hotel))
}

export async function setTourHotels(tourId: number, hotelIds: number[]) {
  await ensureHotelTables()
  await db.delete(tourHotels).where(eq(tourHotels.tourId, tourId))

  const uniqueHotelIds = Array.from(new Set(hotelIds.filter(Number.isFinite)))
  if (uniqueHotelIds.length === 0) return

  await db.insert(tourHotels).values(
    uniqueHotelIds.map((hotelId) => ({
      tourId,
      hotelId,
    })),
  )
}
