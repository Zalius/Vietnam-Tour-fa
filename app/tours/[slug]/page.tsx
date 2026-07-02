import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, Check, Clock, MapPin, Mountain, Users } from "lucide-react"
import { BookingRequestDialog } from "@/components/booking-request-dialog"
import { FadeImage } from "@/components/fade-image"
import { FooterSection } from "@/components/sections/footer-section"
import { Header } from "@/components/header"
import { TourGalleryLightbox } from "@/components/tour-gallery-lightbox"
import {
  formatDifficulty,
  formatPrice,
  getPublishedTours,
  getTourBySlug,
} from "@/lib/tours"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tour = await getTourBySlug(slug)
  if (!tour) return { title: "تور پیدا نشد" }
  return {
    title: `${tour.title} | تور ویتنام`,
    description: tour.summary,
  }
}

export async function generateStaticParams() {
  const tours = await getPublishedTours()
  return tours.map((tour) => ({ slug: tour.slug }))
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tour = await getTourBySlug(slug)

  if (!tour || !tour.published) notFound()

  const tourCode = `VT-${String(tour.id).padStart(4, "0")}`
  const stats = [
    { icon: Clock, label: "مدت سفر", value: `${tour.durationDays} روز` },
    { icon: Users, label: "اندازه گروه", value: `تا ${tour.maxGroupSize} نفر` },
    { icon: Mountain, label: "سطح سفر", value: formatDifficulty(tour.difficulty) },
    { icon: MapPin, label: "منطقه", value: tour.region },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative h-[70vh] min-h-[460px] w-full overflow-hidden">
        <FadeImage
          src={tour.mainImage || "/placeholder.svg"}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 md:px-12 lg:px-20">
          <p className="mb-3 text-xs uppercase tracking-widest text-white/80">
            {tour.region}
          </p>
          <h1 className="max-w-3xl text-4xl font-medium leading-tight tracking-tight text-white text-balance md:text-5xl lg:text-6xl">
            {tour.title}
          </h1>
        </div>
      </section>

      <div className="px-6 py-8 md:px-12 lg:px-20">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} className="rotate-180" />
          همه تورها
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-px border-y border-border bg-border md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-background px-6 py-6 md:px-8">
            <stat.icon size={20} className="mb-3 text-muted-foreground" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-1 text-base font-medium text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 px-6 py-16 md:px-12 lg:grid-cols-3 lg:gap-16 lg:px-20">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-medium tracking-tight text-foreground">
            درباره این سفر
          </h2>
          <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">
            {tour.description || tour.summary}
          </p>

          {tour.highlights.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-medium tracking-tight text-foreground">
                نکات برجسته
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {tour.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 shrink-0 text-foreground" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tour.itinerary.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-medium tracking-tight text-foreground">
                برنامه سفر
              </h3>
              <ol className="mt-6 border-r border-border">
                {tour.itinerary.map((day) => (
                  <li key={day.day} className="relative pr-8 pb-8 last:pb-0">
                    <span className="absolute -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
                      {day.day}
                    </span>
                    <h4 className="text-base font-medium text-foreground">
                      {day.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {day.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {tour.gallery.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-medium tracking-tight text-foreground">
                گالری
              </h3>
              <TourGalleryLightbox images={tour.gallery} title={tour.title} />
            </div>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-28 rounded-2xl border border-border p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              شروع قیمت
            </p>
            <p className="mt-1 text-3xl font-medium text-foreground">
              {formatPrice(tour.price)}
              <span className="text-sm font-normal text-muted-foreground">
                {" "}
                / نفر
              </span>
            </p>

            <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">شروع</dt>
                <dd className="text-foreground">{tour.startLocation || "-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">پایان</dt>
                <dd className="text-foreground">{tour.endLocation || "-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">کد تور</dt>
                <dd className="font-mono text-foreground" dir="ltr">{tourCode}</dd>
              </div>
            </dl>

            {tour.included.length > 0 && (
              <div className="mt-6 border-t border-border pt-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  شامل چه مواردی است
                </p>
                <ul className="mt-3 space-y-2">
                  {tour.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-foreground" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <BookingRequestDialog tourCode={tourCode} tourTitle={tour.title} />
          </div>
        </aside>
      </div>

      <FooterSection />
    </main>
  )
}
