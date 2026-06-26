import Image from "next/image"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { getAboutPage } from "@/lib/about"

export const metadata: Metadata = {
  title: "درباره ما | تور ویتنام",
  description:
    "با تور ویتنام آشنا شوید؛ تیمی برای طراحی سفرهای اختصاصی و گروهی کوچک در سراسر ویتنام.",
}

export const dynamic = "force-dynamic"

export default async function AboutPage() {
  const page = await getAboutPage()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative flex min-h-[78vh] items-end overflow-hidden">
        <Image
          src={page.heroImage}
          alt="قایق‌ها میان صخره‌های آهکی ویتنام"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/20" />
        <div className="relative z-10 px-6 pb-16 pt-36 md:px-12 lg:px-20">
          <p className="mb-4 text-xs uppercase tracking-widest text-white/75">
            {page.heroEyebrow}
          </p>
          <h1 className="max-w-4xl text-5xl font-medium leading-tight text-white md:text-7xl">
            {page.heroTitle}
          </h1>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {page.introEyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight text-foreground md:text-5xl">
              {page.introTitle}
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {page.introBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border px-6 py-14 md:px-12 lg:px-20">
        <div className="grid gap-8 md:grid-cols-3">
          {page.values.map((value) => (
            <div key={value.title}>
              <h3 className="text-lg font-medium text-foreground">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-0 lg:grid-cols-2">
        <div className="relative min-h-[360px] lg:min-h-[560px]">
          <Image
            src={page.featureImage}
            alt="فانوس‌های هوی آن در ویتنام"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex items-center px-6 py-16 md:px-12 lg:px-20">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {page.featureEyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight text-foreground md:text-5xl">
              {page.featureTitle}
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              {page.featureBody}
            </p>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
