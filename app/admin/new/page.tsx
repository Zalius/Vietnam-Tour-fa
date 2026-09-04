import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createTour } from "@/app/actions/tours"
import { TourForm } from "@/components/admin/tour-form"
import { getAllHotels } from "@/lib/hotels"

export default async function NewTourPage() {
  const hotels = await getAllHotels()

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        بازگشت به تورها
      </Link>
      <h1 className="mt-4 mb-8 text-2xl font-medium tracking-tight text-foreground">
        تور جدید
      </h1>
      <TourForm action={createTour} hotels={hotels} />
    </div>
  )
}
