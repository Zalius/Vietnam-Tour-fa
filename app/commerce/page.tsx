import type { Metadata } from "next";
import { ServiceContentPage } from "@/components/service-content-page";
import { getServiceContent } from "@/lib/service-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "بازرگانی | تور ویتنام",
  description: "خدمات بازرگانی، هماهنگی تامین‌کنندگان و پشتیبانی محلی در ویتنام.",
};

export default async function CommercePage() {
  const content = await getServiceContent("commerce");
  return <ServiceContentPage content={content} />;
}
