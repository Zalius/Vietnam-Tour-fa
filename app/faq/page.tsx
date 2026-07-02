import type { Metadata } from "next";
import { ServiceContentPage } from "@/components/service-content-page";
import { getServiceContent } from "@/lib/service-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "پرسش‌های رایج | تور ویتنام",
  description: "پاسخ به سوالات رایج درباره رزرو، برنامه سفر، پرداخت و خدمات تور ویتنام.",
};

export default async function FaqPage() {
  const content = await getServiceContent("faq");
  return <ServiceContentPage content={content} />;
}
