import Link from "next/link";
import { FileText, ImageIcon, Plus } from "lucide-react";
import { TourRowActions } from "@/components/admin/tour-row-actions";
import { formatPrice, getAllTours } from "@/lib/tours";
import { getTourUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

const serviceEditors = [
  { label: "بازرگانی", href: "/admin/service-pages/commerce" },
  { label: "بیمه سفر", href: "/admin/service-pages/travel-insurance" },
  { label: "لغو سفر", href: "/admin/service-pages/cancellation" },
  { label: "شرایط رزرو", href: "/admin/service-pages/booking-terms" },
  { label: "پرسش‌های رایج", href: "/admin/service-pages/faq" },
];

export default async function AdminToursPage() {
  const tours = await getAllTours();

  return (
    <div>
      <div className="mb-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-border bg-secondary/40 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                مدیریت صفحه اصلی
              </p>
              <h2 className="mt-2 text-xl font-medium text-foreground">
                ویرایش ساده متن‌ها و تصاویر صفحه اصلی
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                این بخش برای مشتری ساده‌تر است و امکان آپلود مستقیم تصویر دارد.
              </p>
            </div>
            <Link
              href="/admin/homepage-content"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              <ImageIcon size={16} />
              ویرایش صفحه اصلی
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2">
            <FileText size={18} />
            <h2 className="text-lg font-medium text-foreground">
              ویرایش صفحه‌های سایت
            </h2>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {serviceEditors.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-foreground">
            تورها
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            مجموع {tours.length} تور
          </p>
        </div>
        <Link
          href="/admin/new"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          <Plus size={16} />
          تور جدید
        </Link>
      </div>

      {tours.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            هنوز توری ثبت نشده است. اولین تور را بسازید.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-border bg-secondary/50">
              <tr className="text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-3 font-medium">تور</th>
                <th className="hidden px-5 py-3 font-medium md:table-cell">
                  منطقه
                </th>
                <th className="hidden px-5 py-3 font-medium sm:table-cell">
                  قیمت
                </th>
                <th className="px-5 py-3 font-medium">وضعیت</th>
                <th className="px-5 py-3 font-medium text-left">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4">
                    <div className="font-medium text-foreground">
                      {tour.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      /{tour.slug} &middot; {tour.durationDays} روز
                      {tour.featured ? " · ویژه" : ""}
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 text-muted-foreground md:table-cell">
                    {tour.region}
                  </td>
                  <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">
                    {formatPrice(tour.price)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        tour.published
                          ? "bg-foreground text-background"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {tour.published ? "منتشر شده" : "پیش‌نویس"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <TourRowActions
                        id={tour.id}
                        viewHref={getTourUrl(tour.slug)}
                        published={tour.published}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
