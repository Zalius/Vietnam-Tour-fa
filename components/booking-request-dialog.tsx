"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { Mail, MessageCircle, Phone, X } from "lucide-react"

export function BookingRequestDialog({
  tourCode,
  tourTitle,
}: {
  tourCode: string
  tourTitle: string
}) {
  const [open, setOpen] = useState(false)
  const vietnamPhone =
    process.env.NEXT_PUBLIC_VIETNAM_PHONE || "شماره ویتنام در تنظیمات ثبت نشده"
  const iranPhone =
    process.env.NEXT_PUBLIC_IRAN_PHONE || "شماره ایران در تنظیمات ثبت نشده"
  const telegramId =
    process.env.NEXT_PUBLIC_TELEGRAM_ID || "شناسه تلگرام در تنظیمات ثبت نشده"
  const email =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@tourvietnam.ir"

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 block w-full rounded-full bg-foreground px-5 py-3 text-center text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        درخواست رزرو
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="درخواست رزرو تور"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  هماهنگی رزرو
                </p>
                <h2 className="mt-2 text-2xl font-medium text-foreground">
                  درخواست رزرو تور
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-secondary p-2 text-foreground transition hover:opacity-80"
                aria-label="بستن"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="rounded-2xl bg-secondary p-5">
                <p className="text-sm text-muted-foreground">کد تور</p>
                <p className="mt-1 font-mono text-lg font-semibold text-foreground" dir="ltr">
                  {tourCode}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">نام تور</p>
                <p className="mt-1 text-lg font-medium text-foreground">
                  {tourTitle}
                </p>
              </div>

              <p className="mt-6 leading-relaxed text-muted-foreground">
                برای هماهنگی تاریخ، ظرفیت، خدمات، قیمت نهایی و رزرو قطعی این تور، لطفا پیش از هر پرداختی با ادمین‌ها تماس بگیرید.
              </p>

              <div className="mt-6 grid gap-3">
                <ContactRow icon={<Phone size={18} />} label="شماره تماس ایران" value={iranPhone} />
                <ContactRow icon={<Phone size={18} />} label="شماره تماس ویتنام" value={vietnamPhone} />
                <ContactRow icon={<Mail size={18} />} label="ایمیل" value={email} />
                <ContactRow icon={<MessageCircle size={18} />} label="تلگرام" value={telegramId} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border px-4 py-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
