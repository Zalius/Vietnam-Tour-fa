import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { updateContactSettings } from "@/app/actions/contact-settings"
import { ContactSettingsForm } from "@/components/admin/contact-settings-form"
import { getContactSettings } from "@/lib/contact-settings"

export const dynamic = "force-dynamic"

export default async function AdminContactPage() {
  const settings = await getContactSettings()

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        بازگشت به مدیریت
      </Link>
      <div className="mt-4 mb-8">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">
          اطلاعات تماس و رزرو
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          این اطلاعات در پاپ‌آپ درخواست رزرو و صفحه شرایط رزرو نمایش داده می‌شود.
        </p>
      </div>
      <ContactSettingsForm action={updateContactSettings} settings={settings} />
    </div>
  )
}
