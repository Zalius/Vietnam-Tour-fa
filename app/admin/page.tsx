import Link from "next/link";
import { Building2, FileText, ImageIcon, Phone, Plus } from "lucide-react";
import { TourRowActions } from "@/components/admin/tour-row-actions";
import { formatPrice, getAllTours } from "@/lib/tours";
import { getTourUrl } from "@/lib/site-url";
import type { Tour } from "@/lib/db/schema";

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
      <div className="mb-6 grid gap-4 lg:mb-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-border bg-secondary/40 p-4 sm:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                مدیریت صفحه اصلی
              </p>
              <h2 className="mt-2 text-lg font-medium text-foreground sm:text-xl">
                ویرایش ساده متن‌ها و تصاویر صفحه اصلی
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                این بخش برای مشتری ساده‌تر است و امکان آپلود مستقیم تصویر دارد.
              </p>
            </div>
            <Link
              href="/admin/homepage-content"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80 sm:w-auto"
            >
              <ImageIcon size={16} />
              ویرایش صفحه اصلی
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <FileText size={18} />
            <h2 className="text-base font-medium text-foreground sm:text-lg">
              ویرایش صفحه‌های سایت
            </h2>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            {serviceEditors.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-border p-4 sm:p-5 lg:mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-3">
            <Building2 className="mt-1 shrink-0 text-muted-foreground" size={20} />
            <div>
              <h2 className="text-base font-medium text-foreground sm:text-lg">
                مدیریت هتل‌ها
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                هتل‌ها را اضافه کنید و بعد داخل فرم هر تور، چند هتل مرتبط را انتخاب کنید.
              </p>
            </div>
          </div>
          <Link
            href="/admin/hotels"
            className="inline-flex w-full items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:w-auto"
          >
            افزودن و مشاهده هتل‌ها
          </Link>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-border p-4 sm:p-5 lg:mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-3">
            <Phone className="mt-1 shrink-0 text-muted-foreground" size={20} />
            <div>
              <h2 className="text-base font-medium text-foreground sm:text-lg">
                اطلاعات تماس و رزرو
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                شماره‌ها، تلگرام و ایمیل نمایش داده‌شده در صفحه رزرو و پاپ‌آپ درخواست رزرو را تغییر دهید.
              </p>
            </div>
          </div>
          <Link
            href="/admin/contact"
            className="inline-flex w-full items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:w-auto"
          >
            ویرایش اطلاعات تماس
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80 sm:w-auto"
        >
          <Plus size={16} />
          تور جدید
        </Link>
      </div>

      {tours.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center sm:mt-10 sm:p-12">
          <p className="text-muted-foreground">
            هنوز توری ثبت نشده است. اولین تور را بسازید.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 md:hidden">
            {tours.map((tour) => (
              <TourMobileCard key={tour.id} tour={tour} />
            ))}
          </div>

          <div className="mt-8 hidden overflow-hidden rounded-2xl border border-border md:block">
            <table className="w-full text-right text-sm">
              <thead className="border-b border-border bg-secondary/50">
                <tr className="text-xs uppercase tracking-widest text-muted-foreground">
                  <th className="px-5 py-3 font-medium">تور</th>
                  <th className="px-5 py-3 font-medium">منطقه</th>
                  <th className="px-5 py-3 font-medium">قیمت</th>
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
                    <td className="px-5 py-4 text-muted-foreground">
                      {tour.region}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {formatPrice(tour.price)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge published={tour.published} />
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
        </>
      )}
    </div>
  );
}

function TourMobileCard({ tour }: { tour: Tour }) {
  return (
    <article className="rounded-2xl border border-border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="break-words text-base font-medium leading-snug text-foreground">
            {tour.title}
          </h2>
          <p className="mt-1 break-all text-xs text-muted-foreground" dir="ltr">
            /{tour.slug}
          </p>
        </div>
        <StatusBadge published={tour.published} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <MobileMeta label="منطقه" value={tour.region || "-"} />
        <MobileMeta label="مدت" value={`${tour.durationDays} روز`} />
        <MobileMeta label="قیمت" value={formatPrice(tour.price)} />
        <MobileMeta label="نوع" value={tour.featured ? "ویژه" : "معمولی"} />
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <TourRowActions
          id={tour.id}
          viewHref={getTourUrl(tour.slug)}
          published={tour.published}
          compact
        />
      </div>
    </article>
  );
}

function MobileMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary/60 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 line-clamp-2 text-sm font-medium text-foreground">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex min-w-[82px] shrink-0 items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium leading-none ${
        published
          ? "bg-foreground text-background"
          : "bg-secondary text-muted-foreground"
      }`}
    >
      {published ? "منتشر شده" : "پیش‌نویس"}
    </span>
  );
}
