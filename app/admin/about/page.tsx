import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { updateAboutPage } from "@/app/actions/about"
import { AboutForm } from "@/components/admin/about-form"
import { getAboutPage } from "@/lib/about"
import { getSiteUrl } from "@/lib/site-url"

export const dynamic = "force-dynamic"

export default async function AdminAboutPage() {
  const page = await getAboutPage()

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-foreground">
            درباره ما
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            محتوای صفحه عمومی درباره ما و تصاویر آن را ویرایش کنید.
          </p>
        </div>
        <Link
          href={`${getSiteUrl()}/about`}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <ExternalLink size={16} />
          مشاهده در سایت
        </Link>
      </div>

      <AboutForm action={updateAboutPage} page={page} />
    </div>
  )
}
