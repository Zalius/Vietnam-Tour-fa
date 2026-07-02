import { updateHomepageContent } from "@/app/actions/site-content"
import { HomepageContentForm } from "@/components/admin/homepage-content-form"
import { getSiteContent } from "@/lib/site-content"

export const dynamic = "force-dynamic"

export default async function AdminHomepageContentPage() {
  const content = await getSiteContent()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">
          ویرایش ساده صفحه اصلی
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          این فرم برای استفاده ساده‌تر ساخته شده است. برای تنظیمات پیشرفته‌تر همچنان می‌توانید از بخش «محتوای سایت» استفاده کنید.
        </p>
      </div>
      <HomepageContentForm action={updateHomepageContent} content={content} />
    </div>
  )
}
