import type { Metadata } from "next";
import { ServiceContentPage } from "@/components/service-content-page";
import { getServiceContent } from "@/lib/service-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "بیمه سفر | تور ویتنام",
  description: "نکات مهم درباره بیمه سفر برای تورهای ویتنام.",
};

export default async function TravelInsurancePage() {
  const content = await getServiceContent("travel-insurance");
  return <ServiceContentPage content={content} />;
}
