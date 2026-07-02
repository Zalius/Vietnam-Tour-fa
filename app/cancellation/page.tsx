import type { Metadata } from "next";
import { ServiceContentPage } from "@/components/service-content-page";
import { getServiceContent } from "@/lib/service-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "لغو سفر | تور ویتنام",
  description: "راهنمای لغو یا تغییر تاریخ تورهای ویتنام.",
};

export default async function CancellationPage() {
  const content = await getServiceContent("cancellation");
  return <ServiceContentPage content={content} />;
}
