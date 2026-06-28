import React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const vazirmatn = localFont({
  src: "../public/fonts/Vazirmatn[wght].woff2",
  variable: "--font-vazirmatn",
  display: "swap",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "تور ویتنام | سفرهای اختصاصی و گروهی ویتنام",
  description:
    "تورهای کوچک و اختصاصی در ویتنام؛ از کروز خلیج ها لونگ تا ساپا، هوی آن و دلتای مکونگ همراه با راهنماهای محلی.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
