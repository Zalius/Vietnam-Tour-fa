"use client"

import Link from "next/link"
import { useFormStatus } from "react-dom"
import type { ContactSettings } from "@/lib/contact-settings"

const inputClass =
  "rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
const labelClass = "text-sm font-medium text-foreground"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
    >
      {pending ? "در حال ذخیره..." : "ذخیره اطلاعات تماس"}
    </button>
  )
}

export function ContactSettingsForm({
  action,
  settings,
}: {
  action: (formData: FormData) => Promise<void>
  settings: ContactSettings
}) {
  return (
    <form action={action} className="rounded-2xl border border-border p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          name="iranPhone"
          label="شماره تماس ایران"
          defaultValue={settings.iranPhone}
        />
        <Field
          name="vietnamPhone"
          label="شماره تماس ویتنام"
          defaultValue={settings.vietnamPhone}
        />
        <Field
          name="telegramId"
          label="آیدی تلگرام"
          defaultValue={settings.telegramId}
          placeholder="@tourvietnam"
        />
        <Field
          name="contactEmail"
          label="ایمیل"
          defaultValue={settings.contactEmail}
          type="email"
        />
      </div>

      <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
        <SubmitButton />
        <Link
          href="/admin"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          بازگشت
        </Link>
      </div>
    </form>
  )
}

function Field({
  name,
  label,
  defaultValue,
  placeholder,
  type = "text",
}: {
  name: string
  label: string
  defaultValue: string
  placeholder?: string
  type?: string
}) {
  return (
    <label className="grid gap-2">
      <span className={labelClass}>{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        dir="ltr"
        className={inputClass}
      />
    </label>
  )
}
