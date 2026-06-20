import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { updateTour } from "@/app/actions/tours"
import { getTourById } from "@/lib/tours"
import { TourForm } from "@/components/admin/tour-form"
import { getTourUrl } from "@/lib/site-url"

export default async function EditTourPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tourId = Number.parseInt(id, 10)
  if (Number.isNaN(tourId)) notFound()

  const tour = await getTourById(tourId)
  if (!tour) notFound()

  const updateAction = updateTour.bind(null, tourId)

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to tours
          </Link>
          <h1 className="mt-4 text-2xl font-medium tracking-tight text-foreground">
            Edit tour
          </h1>
        </div>
        <Link
          href={getTourUrl(tour.slug)}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <ExternalLink size={16} />
          View in site
        </Link>
      </div>
      <div className="mb-8" />
      <TourForm action={updateAction} tour={tour} />
    </div>
  )
}
