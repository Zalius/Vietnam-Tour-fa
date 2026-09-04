import type { Metadata } from "next"
import { ServiceContentPage } from "@/components/service-content-page"
import { getContactSettings } from "@/lib/contact-settings"
import { getServiceContent } from "@/lib/service-content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "شرایط رزرو | تور ویتنام",
  description: "شرایط رزرو تورهای ویتنام و راه‌های تماس با ادمین‌ها پیش از پرداخت.",
}

export default async function BookingTermsPage() {
  const [content, contact] = await Promise.all([
    getServiceContent("booking-terms"),
    getContactSettings(),
  ])

  return (
    <ServiceContentPage
      content={content}
      contactBlock={
        <div className="mb-8 rounded-2xl border border-border p-6">
          <h2 className="text-xl font-medium text-foreground">
            قبل از هر پرداختی با ادمین هماهنگ کنید
          </h2>
          <div className="mt-4 grid gap-3 text-sm leading-relaxed text-muted-foreground md:grid-cols-2">
            <ContactValue label="شماره ویتنام" value={contact.vietnamPhone} />
            <ContactValue label="شماره ایران" value={contact.iranPhone} />
            <ContactValue label="تلگرام" value={contact.telegramId} />
            <ContactValue label="ایمیل" value={contact.contactEmail} />
          </div>
        </div>
      }
    />
  )
}

function ContactValue({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span>{label}: </span>
      <span dir="ltr" className="inline-block text-foreground">
        {value || "ثبت نشده"}
      </span>
    </p>
  )
}
