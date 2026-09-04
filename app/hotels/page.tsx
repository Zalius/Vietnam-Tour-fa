import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Building2, MapPin } from "lucide-react"
import { FooterSection } from "@/components/sections/footer-section"
import { Header } from "@/components/header"
import { getAllHotels } from "@/lib/hotels"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "هتل‌های تحت قرارداد ما | تور ویتنام",
  description: "هتل‌هایی که تور ویتنام برای اقامت مسافران در شهرهای مختلف ویتنام با آن‌ها همکاری می‌کند.",
}

export default async function HotelsPage() {
  const hotels = await getAllHotels()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="px-6 pb-12 pt-36 md:px-12 md:pb-16 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          اقامت در ویتنام
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-tight tracking-tight text-foreground md:text-6xl">
          هتل‌های تحت قرارداد ما
        </h1>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
          مجموعه‌ای از هتل‌هایی که برای مسیرهای مختلف ویتنام بررسی کرده‌ایم تا اقامت شما با سطح انتظار، شهر مقصد و سبک سفر هماهنگ باشد.
        </p>
      </section>

      <section className="px-6 pb-20 md:px-12 lg:px-20">
        {hotels.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            هنوز هتلی ثبت نشده است.
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
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
                      <Building2 size={34} />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-medium text-foreground">
                        {hotel.name}
                      </h2>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        {hotel.city}
                      </p>
                    </div>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                      {hotel.quality}
                    </span>
                  </div>
                  {hotel.description ? (
                    <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {hotel.description}
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <FooterSection />
    </main>
  )
}
