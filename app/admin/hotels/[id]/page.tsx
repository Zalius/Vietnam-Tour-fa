import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { updateHotel } from "@/app/actions/hotels"
import { HotelForm } from "@/components/admin/hotel-form"
import { getHotelById } from "@/lib/hotels"

export const dynamic = "force-dynamic"

export default async function EditHotelPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const hotelId = Number.parseInt(id, 10)
  if (Number.isNaN(hotelId)) notFound()

  const hotel = await getHotelById(hotelId)
  if (!hotel) notFound()

  const action = updateHotel.bind(null, hotelId)

  return (
    <div>
      <Link
        href="/admin/hotels"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        بازگشت به هتل‌ها
      </Link>
      <h1 className="mt-4 mb-8 text-2xl font-medium tracking-tight text-foreground">
        ویرایش هتل
      </h1>
      <HotelForm action={action} hotel={hotel} />
    </div>
  )
}
