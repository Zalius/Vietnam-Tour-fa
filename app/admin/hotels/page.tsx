import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Pencil } from "lucide-react"
import { createHotel } from "@/app/actions/hotels"
import { HotelForm } from "@/components/admin/hotel-form"
import { getAllHotels } from "@/lib/hotels"

export const dynamic = "force-dynamic"

export default async function AdminHotelsPage() {
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

      <div className="mt-4 mb-8">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">
          هتل‌ها
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          هتل‌ها را اضافه یا ویرایش کنید و بعد در فرم هر تور، چند هتل مرتبط را انتخاب کنید.
        </p>
      </div>

      <HotelForm action={createHotel} />

      <section className="mt-10">
        <h2 className="text-xl font-medium text-foreground">
          هتل‌های ثبت‌شده
        </h2>

        {hotels.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            هنوز هتلی ثبت نشده است.
          </div>
        ) : (
          <div className="mt-5 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-right text-sm">
              <thead className="border-b border-border bg-secondary/50 text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">هتل</th>
                  <th className="px-5 py-3 font-medium">شهر</th>
                  <th className="px-5 py-3 font-medium">کیفیت</th>
                  <th className="hidden px-5 py-3 font-medium md:table-cell">
                    امکانات
                  </th>
                  <th className="px-5 py-3 font-medium text-left">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((hotel) => (
                  <tr key={hotel.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-secondary">
                          {hotel.image ? (
                            <Image
                              src={hotel.image}
                              alt={hotel.name}
                              fill
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                        <div>
                          <Link
                            href={`/hotels/${hotel.id}`}
                            target="_blank"
                            className="font-medium text-foreground transition-colors hover:text-muted-foreground"
                          >
                            {hotel.name}
                          </Link>
                          {hotel.website ? (
                            <a
                              href={hotel.website}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-1 block text-xs text-muted-foreground transition-colors hover:text-foreground"
                              dir="ltr"
                            >
                              {hotel.website}
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{hotel.city}</td>
                    <td className="px-5 py-4 text-muted-foreground">{hotel.quality}</td>
                    <td className="hidden px-5 py-4 text-muted-foreground md:table-cell">
                      {hotel.amenities.slice(0, 3).join("، ") || "-"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <Link
                          href={`/admin/hotels/${hotel.id}`}
                          className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                        >
                          <Pencil size={14} />
                          ویرایش
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
