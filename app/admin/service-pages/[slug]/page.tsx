import { notFound } from "next/navigation";
import { updateServiceContent } from "@/app/actions/service-content";
import { ServiceContentForm } from "@/components/admin/service-content-form";
import { defaultServiceContents, getServiceContent } from "@/lib/service-content";

export const dynamic = "force-dynamic";

export default async function AdminServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!defaultServiceContents[slug]) notFound();

  const content = await getServiceContent(slug);
  const action = updateServiceContent.bind(null, slug);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">
          ویرایش صفحه: {content.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          متن‌ها، کارت‌ها و تصویر اصلی این صفحه را از اینجا تغییر دهید.
        </p>
      </div>
      <ServiceContentForm action={action} content={content} />
    </div>
  );
}
