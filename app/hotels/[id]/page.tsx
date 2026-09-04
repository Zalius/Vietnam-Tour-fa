import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { ArrowLeft, Building2, Globe, MapPin, Phone } from "lucide-react"
import { FooterSection } from "@/components/sections/footer-section"
import { Header } from "@/components/header"
import { getAllHotels, getHotelById } from "@/lib/hotels"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const hotel = await getHotelById(Number.parseInt(id, 10))
  if (!hotel) return { title: "هتل پیدا نشد" }

  return {
    title: `${hotel.name} | تور ویتنام`,
    description: hotel.description || `${hotel.name} در ${hotel.city}`,
  }
}

export async function generateStaticParams() {
  const hotels = await getAllHotels()
  return hotels.map((hotel) => ({ id: String(hotel.id) }))
}

export default async function HotelPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const hotelId = Number.parseInt(id, 10)
  if (Number.isNaN(hotelId)) notFound()

  const hotel = await getHotelById(hotelId)
  if (!hotel) notFound()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative min-h-[62vh] overflow-hidden">
        {hotel.image ? (
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary text-muted-foreground">
            <Building2 size={56} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 text-white md:px-12 lg:px-20">
          <p className="text-xs uppercase tracking-widest text-white/75">
            {hotel.city} · {hotel.quality}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-medium leading-tight md:text-6xl">
            {hotel.name}
          </h1>
        </div>
      </section>

      <section className="px-6 py-12 md:px-12 lg:px-20">
        <Link
          href="/hotels"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} className="rotate-180" />
          همه هتل‌ها
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-medium text-foreground">
              درباره این هتل
            </h2>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">
              {hotel.description || "توضیحاتی برای این هتل ثبت نشده است."}
            </p>

            {hotel.amenities.length > 0 ? (
              <div className="mt-10">
                <h3 className="text-xl font-medium text-foreground">
                  امکانات
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="rounded-2xl border border-border p-6">
            <h2 className="text-lg font-medium text-foreground">اطلاعات هتل</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <InfoRow icon={<MapPin size={16} />} label="شهر" value={hotel.city} />
              <InfoRow icon={<Building2 size={16} />} label="کیفیت" value={hotel.quality} />
              {hotel.address ? (
                <InfoRow icon={<MapPin size={16} />} label="آدرس" value={hotel.address} />
              ) : null}
              {hotel.phone ? (
                <InfoRow icon={<Phone size={16} />} label="تماس" value={hotel.phone} ltr />
              ) : null}
              {hotel.website ? (
                <div className="flex items-start gap-3 border-t border-border pt-4">
                  <Globe size={16} className="mt-1 text-muted-foreground" />
                  <div>
                    <dt className="text-muted-foreground">وب‌سایت</dt>
                    <dd>
                      <a
                        href={hotel.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 block text-foreground transition-colors hover:text-muted-foreground"
                        dir="ltr"
                      >
                        {hotel.website}
                      </a>
                    </dd>
                  </div>
                </div>
              ) : null}
            </dl>
          </aside>
        </div>

        {hotel.gallery.length > 0 ? (
          <div className="mt-14">
            <h2 className="text-2xl font-medium text-foreground">
              گالری هتل
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hotel.gallery.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary"
                >
                  <Image
                    src={image}
                    alt={`${hotel.name} - تصویر ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <FooterSection />
    </main>
  )
}

function InfoRow({
  icon,
  label,
  value,
  ltr,
}: {
  icon: ReactNode
  label: string
  value: string
  ltr?: boolean
}) {
  return (
    <div className="flex items-start gap-3 border-t border-border pt-4 first:border-t-0 first:pt-0">
      <div className="mt-1 text-muted-foreground">{icon}</div>
      <div>
        <dt className="text-muted-foreground">{label}</dt>
        <dd className="mt-1 text-foreground" dir={ltr ? "ltr" : undefined}>
          {value}
        </dd>
      </div>
    </div>
  )
}
