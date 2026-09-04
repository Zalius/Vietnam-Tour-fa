import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Building2, MapPin } from "lucide-react"
import { getAllHotels } from "@/lib/hotels"

export async function HotelsSection() {
  const hotels = (await getAllHotels()).slice(0, 3)

  if (hotels.length === 0) return null

  return (
    <section className="bg-background px-6 pb-24 md:px-12 lg:px-20">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            اقامت‌های منتخب
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            هتل‌های تحت قرارداد ما
          </h2>
        </div>
        <Link
          href="/hotels"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          مشاهده همه هتل‌ها
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="grid gap-7 md:grid-cols-3">
        {hotels.map((hotel) => (
          <Link
            key={hotel.id}
            href={`/hotels/${hotel.id}`}
            className="group overflow-hidden rounded-2xl border border-border bg-background"
          >
            <div className="relative aspect-[4/3] bg-secondary">
              {hotel.image ? (
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <Building2 size={32} />
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {hotel.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin size={14} />
                    {hotel.city}
                  </p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                  {hotel.quality}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
