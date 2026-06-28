import { redirect } from "next/navigation"
import { headers } from "next/headers"
import Link from "next/link"
import { auth } from "@/lib/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/sign-in")

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-lg font-medium tracking-tight text-foreground"
            >
              تور ویتنام
            </Link>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs uppercase tracking-widest text-muted-foreground">
              CMS
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/admin/about"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              درباره
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              مشاهده سایت
            </Link>
            <span className="hidden text-muted-foreground sm:inline">
              {session.user.email}
            </span>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </div>
  )
}
