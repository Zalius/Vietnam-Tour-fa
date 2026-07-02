import type { Metadata } from "next";
import { ServiceContentPage } from "@/components/service-content-page";
import { getServiceContent } from "@/lib/service-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "شرایط رزرو | تور ویتنام",
  description: "شرایط رزرو تورهای ویتنام و راه‌های تماس با ادمین‌ها پیش از پرداخت.",
};

const vietnamPhone =
  process.env.NEXT_PUBLIC_VIETNAM_PHONE || "شماره ویتنام را در env وارد کنید";
const iranPhone =
  process.env.NEXT_PUBLIC_IRAN_PHONE || "شماره ایران را در env وارد کنید";
const telegramId =
  process.env.NEXT_PUBLIC_TELEGRAM_ID || "Telegram ID را در env وارد کنید";
const email =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@tourvietnam.ir";

export default async function BookingTermsPage() {
  const content = await getServiceContent("booking-terms");

  return (
    <ServiceContentPage
      content={content}
      contactBlock={
        <div className="mb-8 rounded-2xl border border-border p-6">
          <h2 className="text-xl font-medium text-foreground">
            قبل از هر پرداختی با ادمین هماهنگ کنید
          </h2>
          <div className="mt-4 grid gap-3 text-sm leading-relaxed text-muted-foreground md:grid-cols-2">
            <p>شماره ویتنام: {vietnamPhone}</p>
            <p>شماره ایران: {iranPhone}</p>
            <p>تلگرام: {telegramId}</p>
            <p>ایمیل: {email}</p>
          </div>
        </div>
      }
    />
  );
}
