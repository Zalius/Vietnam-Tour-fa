"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import type { FormEvent } from "react"
import { useFormStatus } from "react-dom"
import type { Hotel } from "@/lib/db/schema"

const inputClass =
  "rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
const labelClass = "text-sm font-medium text-foreground"

const qualityOptions = [
  "3 ستاره",
  "4 ستاره",
  "5 ستاره",
  "بوتیک",
  "ریزورت",
  "اقامتگاه محلی",
]

function SubmitButton({
  label,
  uploading,
}: {
  label: string
  uploading: boolean
}) {
  const { pending } = useFormStatus()
  const disabled = pending || uploading

  return (
    <button
      type="submit"
      disabled={disabled}
      className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
    >
      {uploading ? "در حال آپلود تصاویر..." : pending ? "در حال ذخیره..." : label}
    </button>
  )
}

export function HotelForm({
  action,
  hotel,
}: {
  action: (formData: FormData) => Promise<void>
  hotel?: Hotel
}) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const readyToSubmitRef = useRef(false)

  async function uploadFiles(files: File[]): Promise<string[]> {
    if (files.length === 0) return []

    const formData = new FormData()
    formData.set("folder", "hotels")
    files.forEach((file) => formData.append("files", file))

    const response = await fetch("/api/admin/uploads", {
      method: "POST",
      body: formData,
    })
    const payload = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(payload.error || "آپلود تصویر ناموفق بود")
    }

    return Array.isArray(payload.urls) ? payload.urls : []
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (readyToSubmitRef.current) {
      readyToSubmitRef.current = false
      return
    }

    const form = event.currentTarget
    const imageFileInput = form.elements.namedItem("imageFile") as HTMLInputElement | null
    const galleryFilesInput = form.elements.namedItem("galleryFiles") as HTMLInputElement | null
    const imageInput = form.elements.namedItem("image") as HTMLInputElement | null
    const galleryTextarea = form.elements.namedItem("gallery") as HTMLTextAreaElement | null

    const imageFiles = Array.from(imageFileInput?.files ?? [])
    const galleryFiles = Array.from(galleryFilesInput?.files ?? [])

    if (imageFiles.length === 0 && galleryFiles.length === 0) return

    event.preventDefault()
    setUploading(true)
    setUploadError("")

    try {
      const [imageUrls, galleryUrls] = await Promise.all([
        uploadFiles(imageFiles.slice(0, 1)),
        uploadFiles(galleryFiles),
      ])

      if (imageUrls[0] && imageInput) {
        imageInput.value = imageUrls[0]
      }

      if (galleryUrls.length > 0 && galleryTextarea) {
        const existing = galleryTextarea.value.trim()
        galleryTextarea.value = [existing, ...galleryUrls].filter(Boolean).join("\n")
      }

      if (imageFileInput) imageFileInput.value = ""
      if (galleryFilesInput) galleryFilesInput.value = ""

      readyToSubmitRef.current = true
      form.requestSubmit()
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "آپلود تصویر ناموفق بود")
    } finally {
      setUploading(false)
    }
  }

  return (
    <form action={action} onSubmit={handleSubmit} className="rounded-2xl border border-border p-6">
      <h2 className="text-xl font-medium text-foreground">
        {hotel ? "ویرایش هتل" : "هتل جدید"}
      </h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Field name="name" label="نام هتل" defaultValue={hotel?.name ?? ""} required />
        <Field name="city" label="شهر" defaultValue={hotel?.city ?? ""} required />

        <label className="grid gap-2">
          <span className={labelClass}>کیفیت</span>
          <select
            name="quality"
            defaultValue={hotel?.quality ?? "4 ستاره"}
            className={inputClass}
          >
            {qualityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <Field name="phone" label="شماره تماس" defaultValue={hotel?.phone ?? ""} dir="ltr" />
        <Field name="website" label="وب‌سایت" defaultValue={hotel?.website ?? ""} dir="ltr" />
        <Field name="address" label="آدرس" defaultValue={hotel?.address ?? ""} />

        <div className="grid gap-3 md:col-span-2">
          <label className={labelClass}>تصویر اصلی هتل</label>
          <input
            name="imageFile"
            type="file"
            accept="image/*"
            className="text-sm text-muted-foreground file:ml-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground"
          />
          <input
            name="image"
            defaultValue={hotel?.image ?? ""}
            dir="ltr"
            className={inputClass}
            placeholder="/images/hotel.jpg یا https://..."
          />
          <p className="text-xs text-muted-foreground">
            اگر فایل جدید انتخاب کنید، آدرس تصویر با فایل آپلود شده جایگزین می‌شود.
          </p>
        </div>

        <div className="grid gap-3 md:col-span-2">
          <label className={labelClass}>افزودن تصاویر گالری</label>
          <input
            name="galleryFiles"
            type="file"
            accept="image/*"
            multiple
            className="text-sm text-muted-foreground file:ml-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground"
          />
          <textarea
            name="gallery"
            rows={4}
            defaultValue={(hotel?.gallery ?? []).join("\n")}
            dir="ltr"
            className={inputClass}
            placeholder="هر مسیر یا URL در یک خط"
          />
          <p className="text-xs text-muted-foreground">
            تصاویر انتخاب‌شده به MinIO آپلود و به لیست گالری اضافه می‌شوند.
          </p>
        </div>

        <TextArea
          name="description"
          label="توضیحات برای نمایش در سایت"
          defaultValue={hotel?.description ?? ""}
          rows={4}
        />
        <TextArea
          name="amenities"
          label="امکانات"
          hint="هر مورد در یک خط، مثل: صبحانه، استخر، نزدیک مرکز شهر"
          defaultValue={(hotel?.amenities ?? []).join("\n")}
          rows={4}
        />
        <TextArea
          name="notes"
          label="یادداشت داخلی"
          hint="این متن برای مشتری نمایش داده نمی‌شود."
          defaultValue={hotel?.notes ?? ""}
          rows={3}
        />
      </div>

      <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
        <SubmitButton
          label={hotel ? "ذخیره تغییرات" : "افزودن هتل"}
          uploading={uploading}
        />
        {hotel ? (
          <Link
            href="/admin/hotels"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            بازگشت
          </Link>
        ) : null}
      </div>

      {uploadError ? (
        <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600">
          {uploadError}
        </p>
      ) : null}
    </form>
  )
}

function Field({
  name,
  label,
  defaultValue,
  required,
  dir,
}: {
  name: string
  label: string
  defaultValue: string
  required?: boolean
  dir?: "ltr" | "rtl"
}) {
  return (
    <label className="grid gap-2">
      <span className={labelClass}>{label}</span>
      <input
        name={name}
        required={required}
        defaultValue={defaultValue}
        dir={dir}
        className={inputClass}
      />
    </label>
  )
}

function TextArea({
  name,
  label,
  hint,
  defaultValue,
  rows,
}: {
  name: string
  label: string
  hint?: string
  defaultValue: string
  rows: number
}) {
  return (
    <label className="grid gap-2 md:col-span-2">
      <span className={labelClass}>{label}</span>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className={inputClass}
      />
    </label>
  )
}
