"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import type { FormEvent } from "react"
import { useFormStatus } from "react-dom"
import type { Hotel, Tour } from "@/lib/db/schema"

const labelClass = "text-sm font-medium text-foreground"
const inputClass =
  "rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"

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

function FileInput({
  id,
  name,
  multiple = false,
}: {
  id: string
  name: string
  multiple?: boolean
}) {
  return (
    <input
      id={id}
      name={name}
      type="file"
      accept="image/*"
      multiple={multiple}
      className="text-sm text-muted-foreground file:ml-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground hover:file:bg-secondary/80"
    />
  )
}

export function TourForm({
  action,
  tour,
  hotels = [],
  selectedHotelIds = [],
}: {
  action: (formData: FormData) => Promise<void>
  tour?: Tour
  hotels?: Hotel[]
  selectedHotelIds?: number[]
}) {
  const [title, setTitle] = useState(tour?.title ?? "")
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const readyToSubmitRef = useRef(false)
  const selectedHotels = new Set(selectedHotelIds)

  const itineraryText = (tour?.itinerary ?? [])
    .map((day) => `${day.title} :: ${day.description}`)
    .join("\n")

  async function uploadFiles(files: File[]): Promise<string[]> {
    if (files.length === 0) return []

    const formData = new FormData()
    formData.set("folder", "tours")
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
    const mainImageFileInput = form.elements.namedItem("mainImageFile") as HTMLInputElement | null
    const galleryFilesInput = form.elements.namedItem("galleryFiles") as HTMLInputElement | null
    const mainImageInput = form.elements.namedItem("mainImage") as HTMLInputElement | null
    const galleryTextarea = form.elements.namedItem("gallery") as HTMLTextAreaElement | null

    const mainFiles = Array.from(mainImageFileInput?.files ?? [])
    const galleryFiles = Array.from(galleryFilesInput?.files ?? [])

    if (mainFiles.length === 0 && galleryFiles.length === 0) return

    event.preventDefault()
    setUploading(true)
    setUploadError("")

    try {
      const [mainUrls, galleryUrls] = await Promise.all([
        uploadFiles(mainFiles.slice(0, 1)),
        uploadFiles(galleryFiles),
      ])

      if (mainUrls[0] && mainImageInput) {
        mainImageInput.value = mainUrls[0]
      }

      if (galleryUrls.length > 0 && galleryTextarea) {
        const existing = galleryTextarea.value.trim()
        galleryTextarea.value = [existing, ...galleryUrls].filter(Boolean).join("\n")
      }

      if (mainImageFileInput) mainImageFileInput.value = ""
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
    <form action={action} onSubmit={handleSubmit} className="flex flex-col gap-8">
      <fieldset className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <TextInput
          name="title"
          label="عنوان تور"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className="md:col-span-2"
          placeholder="کروز خلیج ها لونگ"
        />

        <TextInput
          name="slug"
          label="آدرس URL"
          defaultValue={tour?.slug ?? ""}
          className="md:col-span-2"
          placeholder="ha-long-bay-cruise"
          dir="ltr"
          hint="اختیاری، اگر خالی باشد از عنوان ساخته می‌شود."
        />

        <TextInput
          name="region"
          label="منطقه"
          defaultValue={tour?.region ?? ""}
          required
          placeholder="شمال ویتنام"
        />

        <label className="flex flex-col gap-2">
          <span className={labelClass}>سطح سفر</span>
          <select
            name="difficulty"
            defaultValue={tour?.difficulty ?? "متوسط"}
            className={inputClass}
          >
            <option>آسان</option>
            <option>متوسط</option>
            <option>چالش‌برانگیز</option>
            <option>سخت</option>
          </select>
        </label>

        <TextInput
          name="price"
          label="قیمت (دلار برای هر نفر)"
          type="number"
          min={0}
          defaultValue={String(tour?.price ?? 0)}
        />

        <TextInput
          name="durationDays"
          label="مدت سفر (روز)"
          type="number"
          min={1}
          defaultValue={String(tour?.durationDays ?? 1)}
        />

        <TextInput
          name="startLocation"
          label="محل شروع"
          defaultValue={tour?.startLocation ?? ""}
          placeholder="هانوی"
        />

        <TextInput
          name="endLocation"
          label="محل پایان"
          defaultValue={tour?.endLocation ?? ""}
          placeholder="هانوی"
        />

        <TextInput
          name="maxGroupSize"
          label="حداکثر اندازه گروه"
          type="number"
          min={1}
          defaultValue={String(tour?.maxGroupSize ?? 12)}
        />
      </fieldset>

      <TextArea
        name="summary"
        label="خلاصه کوتاه"
        rows={2}
        defaultValue={tour?.summary ?? ""}
        placeholder="متن کوتاهی که روی کارت تور نمایش داده می‌شود."
      />

      <TextArea
        name="description"
        label="توضیحات کامل"
        rows={5}
        defaultValue={tour?.description ?? ""}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="mainImageFile" className={labelClass}>
          آپلود تصویر اصلی
        </label>
        <FileInput id="mainImageFile" name="mainImageFile" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          تصویر ابتدا جداگانه آپلود می‌شود و سپس آدرس آن در فرم ذخیره می‌شود.
        </p>
      </div>

      <TextInput
        name="mainImage"
        label="مسیر یا URL تصویر اصلی"
        defaultValue={tour?.mainImage ?? ""}
        placeholder="/images/example.jpg یا https://..."
        dir="ltr"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="galleryFiles" className={labelClass}>
          افزودن تصاویر گالری
        </label>
        <FileInput id="galleryFiles" name="galleryFiles" multiple />
        <p className="text-xs leading-relaxed text-muted-foreground">
          تصاویر انتخاب‌شده به MinIO آپلود و به لیست گالری اضافه می‌شوند.
        </p>
      </div>

      <TextArea
        name="gallery"
        label="تصاویر گالری"
        rows={3}
        defaultValue={(tour?.gallery ?? []).join("\n")}
        dir="ltr"
        hint="هر مسیر یا URL در یک خط"
      />

      <TextArea
        name="highlights"
        label="نکات برجسته"
        rows={4}
        defaultValue={(tour?.highlights ?? []).join("\n")}
        hint="هر مورد در یک خط"
      />

      <TextArea
        name="included"
        label="موارد شامل تور"
        rows={4}
        defaultValue={(tour?.included ?? []).join("\n")}
        hint="هر مورد در یک خط"
      />

      <section className="rounded-2xl border border-border p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-medium text-foreground">
              هتل‌های این تور
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              می‌توانید چند هتل را برای این تور انتخاب کنید. اگر هتل مورد نظر وجود ندارد، ابتدا آن را اضافه کنید.
            </p>
          </div>
          <Link
            href="/admin/hotels"
            className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            افزودن هتل
          </Link>
        </div>

        {hotels.length === 0 ? (
          <p className="mt-5 rounded-xl bg-secondary p-4 text-sm text-muted-foreground">
            هنوز هتلی ثبت نشده است.
          </p>
        ) : (
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {hotels.map((hotel) => (
              <label
                key={hotel.id}
                className="flex cursor-pointer gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-secondary/60"
              >
                <input
                  type="checkbox"
                  name="hotelIds"
                  value={hotel.id}
                  defaultChecked={selectedHotels.has(hotel.id)}
                  className="mt-1 h-4 w-4 shrink-0 accent-foreground"
                />
                <span>
                  <span className="block text-sm font-medium text-foreground">
                    {hotel.name}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {hotel.city} · {hotel.quality}
                  </span>
                  {hotel.amenities.length > 0 ? (
                    <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                      {hotel.amenities.slice(0, 3).join("، ")}
                    </span>
                  ) : null}
                </span>
              </label>
            ))}
          </div>
        )}
      </section>

      <TextArea
        name="itinerary"
        label="برنامه سفر"
        rows={5}
        defaultValue={itineraryText}
        hint="هر روز در یک خط، قالب: عنوان :: توضیح"
        placeholder={"ورود و حرکت با کشتی :: انتقال به بندر و سوار شدن به کشتی.\nطلوع و بازگشت :: تای‌چی روی عرشه و سپس بازگشت."}
      />

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={tour?.featured ?? false}
            className="h-4 w-4 accent-foreground"
          />
          تور ویژه
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            name="published"
            defaultChecked={tour?.published ?? true}
            className="h-4 w-4 accent-foreground"
          />
          منتشر شده (قابل مشاهده در سایت)
        </label>
      </div>

      <div className="flex items-center gap-4 border-t border-border pt-6">
        <SubmitButton
          label={tour ? "ذخیره تغییرات" : "ساخت تور"}
          uploading={uploading}
        />
        <Link
          href="/admin"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          انصراف
        </Link>
      </div>

      {uploadError ? (
        <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600">
          {uploadError}
        </p>
      ) : null}
    </form>
  )
}

function TextInput({
  name,
  label,
  hint,
  className,
  value,
  onChange,
  ...props
}: {
  name: string
  label: string
  hint?: string
  className?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className={labelClass}>{label}</span>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={inputClass}
        {...props}
      />
    </label>
  )
}

function TextArea({
  name,
  label,
  hint,
  rows,
  defaultValue,
  dir,
  placeholder,
}: {
  name: string
  label: string
  hint?: string
  rows: number
  defaultValue: string
  dir?: "ltr" | "rtl"
  placeholder?: string
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className={labelClass}>{label}</span>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className={inputClass}
        dir={dir}
        placeholder={placeholder}
      />
    </label>
  )
}
