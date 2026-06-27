import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { FadeImage } from "@/components/fade-image"
import { getPublishedTours, formatPrice } from "@/lib/tours"

export async function ToursSection() {
  const tours = (await getPublishedTours()).slice(0, 6)

  return (
    <section id="tours" className="bg-background">
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              سفرهای ما
            </p>
            <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              تورهای ویتنام
            </h2>
          </div>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            مشاهده همه تورها
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>

      {tours.length === 0 ? (
        <div className="px-6 pb-24 md:px-12 lg:px-20">
          <p className="text-muted-foreground">
            هنوز توری منتشر نشده است. به‌زودی دوباره سر بزنید.
          </p>
        </div>
      ) : (
        <div className="pb-24">
          <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
            {tours.map((tour) => (
              <Link
                key={tour.id}
                href={`/tours/${tour.slug}`}
                className="group flex-shrink-0 w-[75vw] snap-center"
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                  <FadeImage
                    src={tour.mainImage || "/placeholder.svg"}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-105"
                  />
                </div>
                <div className="py-6">
                  <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                    {tour.region} &middot; {tour.durationDays} روز
                  </p>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="flex-1 text-lg font-medium leading-snug text-foreground">
                      {tour.title}
                    </h3>
                    <span className="text-lg font-medium text-foreground">
                      {formatPrice(tour.price)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
            {tours.map((tour) => (
              <Link key={tour.id} href={`/tours/${tour.slug}`} className="group">
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                  <FadeImage
                    src={tour.mainImage || "/placeholder.svg"}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-105"
                  />
                </div>
                <div className="py-6">
                  <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                    {tour.region} &middot; {tour.durationDays} روز
                  </p>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="flex-1 text-lg font-medium leading-snug text-foreground">
                      {tour.title}
                    </h3>
                    <span className="font-medium text-foreground text-2xl">
                      {formatPrice(tour.price)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {tour.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
