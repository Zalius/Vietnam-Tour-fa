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
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
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
