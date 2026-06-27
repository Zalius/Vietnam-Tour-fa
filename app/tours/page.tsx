import type { Metadata } from "next"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import {
  ToursFilteredList,
  type TourListItem,
} from "@/components/tours/tours-filtered-list"
import { getPublishedTours } from "@/lib/tours"

export const metadata: Metadata = {
  title: "همه تورها | تور ویتنام",
  description:
    "همه تورهای ویتنام را ببینید و بر اساس قیمت، منطقه، مکان، مدت سفر، اندازه گروه و سطح سفر فیلتر کنید.",
}

export const dynamic = "force-dynamic"

export default async function ToursPage() {
  const tours = await getPublishedTours()
  const items: TourListItem[] = tours.map((tour) => ({
    id: tour.id,
    slug: tour.slug,
    title: tour.title,
    region: tour.region,
    summary: tour.summary,
    price: tour.price,
    durationDays: tour.durationDays,
    startLocation: tour.startLocation,
    endLocation: tour.endLocation,
    maxGroupSize: tour.maxGroupSize,
    difficulty: tour.difficulty,
    mainImage: tour.mainImage,
    featured: tour.featured,
  }))

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="bg-foreground px-6 pb-12 pt-36 text-white md:px-12 md:pb-16 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-white/60">
          همه تورها
        </p>
        <div className="mt-5 max-w-4xl">
          <h1 className="text-4xl font-medium leading-tight tracking-tight text-white md:text-6xl">
            تور ویتنام را بر اساس سبک سفر خود انتخاب کنید.
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/70 md:text-lg">
            تورها را بر اساس بودجه، منطقه، نقطه شروع و پایان، مدت سفر، اندازه گروه و سطح فعالیت فیلتر کنید.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 lg:px-20">
        <ToursFilteredList tours={items} />
      </section>

      <FooterSection />
    </main>
  )
}
