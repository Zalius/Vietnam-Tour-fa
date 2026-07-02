"use client"

import Link from "next/link"

const footerLinks = {
  explore: [
    { label: "همه تورها", href: "/tours" },
    { label: "تجربه سفر", href: "/#technology" },
    { label: "گالری", href: "/#gallery" },
    { label: "درباره ما", href: "/about" },
  ],
  about: [
    { label: "داستان ما", href: "/about" },
    { label: "بازرگانی", href: "/commerce" },
    { label: "سفر مسئولانه", href: "/about" },
    { label: "تماس", href: "/booking-terms" },
  ],
  service: [
    { label: "پرسش‌های رایج", href: "/faq" },
    { label: "شرایط رزرو", href: "/booking-terms" },
    { label: "لغو سفر", href: "/cancellation" },
    { label: "بیمه سفر", href: "/travel-insurance" },
  ],
}

export function FooterSection() {
  return (
    <footer className="bg-background">
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="text-lg font-medium text-foreground">
              تور ویتنام
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              سفرهای کوچک و اختصاصی در ویتنام؛ از صخره‌های آهکی خلیج ها لونگ تا شالیزارهای ساپا، همراه با راهنماهای محلی.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">گشت‌وگذار</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">درباره</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">خدمات</h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            ۲۰۲۶ تور ویتنام. همه حقوق محفوظ است.
          </p>

          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Instagram
            </Link>
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Telegram
            </Link>
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
