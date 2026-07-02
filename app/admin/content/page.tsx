import { updateSiteContent } from "@/app/actions/site-content"
import { SiteContentForm } from "@/components/admin/site-content-form"
import { getSiteContent } from "@/lib/site-content"

export const dynamic = "force-dynamic"

export default async function AdminContentPage() {
  const content = await getSiteContent()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">
          محتوای صفحه اصلی و منو
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          متن‌ها، تصاویر، آیتم‌های گالری و لینک‌های منوی بالای سایت را از این بخش ویرایش کنید.
        </p>
      </div>
      <SiteContentForm action={updateSiteContent} content={content} />
    </div>
  )
}
