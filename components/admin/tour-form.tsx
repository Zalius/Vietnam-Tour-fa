"use client"

import { useState } from "react"
import Link from "next/link"
import { useFormStatus } from "react-dom"
import type { Tour } from "@/lib/db/schema"

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
    >
      {pending ? "در حال ذخیره..." : label}
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

const labelClass = "text-sm font-medium text-foreground"
const inputClass =
  "rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"

export function TourForm({
  action,
  tour,
}: {
  action: (formData: FormData) => Promise<void>
  tour?: Tour
}) {
  const [title, setTitle] = useState(tour?.title ?? "")

  const itineraryText = (tour?.itinerary ?? [])
    .map((d) => `${d.title} :: ${d.description}`)
    .join("\n")

  return (
    <form action={action} className="flex flex-col gap-8">
      <fieldset className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="title" className={labelClass}>
            عنوان تور
          </label>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder="کروز شبانه خلیج ها لونگ"
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="slug" className={labelClass}>
            آدرس URL{" "}
            <span className="font-normal text-muted-foreground">
              (اختیاری، از عنوان ساخته می‌شود)
            </span>
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={tour?.slug ?? ""}
            className={inputClass}
            placeholder="ha-long-bay-cruise"
            dir="ltr"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="region" className={labelClass}>
            منطقه
          </label>
          <input
            id="region"
            name="region"
            required
            defaultValue={tour?.region ?? ""}
            className={inputClass}
            placeholder="شمال ویتنام"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="difficulty" className={labelClass}>
            سطح سفر
          </label>
          <select
            id="difficulty"
            name="difficulty"
            defaultValue={tour?.difficulty ?? "متوسط"}
            className={inputClass}
          >
            <option>آسان</option>
            <option>متوسط</option>
            <option>چالش‌برانگیز</option>
            <option>سخت</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="price" className={labelClass}>
            قیمت (دلار برای هر نفر)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            defaultValue={tour?.price ?? 0}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="durationDays" className={labelClass}>
            مدت سفر (روز)
          </label>
          <input
            id="durationDays"
            name="durationDays"
            type="number"
            min={1}
            defaultValue={tour?.durationDays ?? 1}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="startLocation" className={labelClass}>
            محل شروع
          </label>
          <input
            id="startLocation"
            name="startLocation"
            defaultValue={tour?.startLocation ?? ""}
            className={inputClass}
            placeholder="هانوی"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="endLocation" className={labelClass}>
            محل پایان
          </label>
          <input
            id="endLocation"
            name="endLocation"
            defaultValue={tour?.endLocation ?? ""}
            className={inputClass}
            placeholder="هانوی"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="maxGroupSize" className={labelClass}>
            حداکثر اندازه گروه
          </label>
          <input
            id="maxGroupSize"
            name="maxGroupSize"
            type="number"
            min={1}
            defaultValue={tour?.maxGroupSize ?? 12}
            className={inputClass}
          />
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="summary" className={labelClass}>
          خلاصه کوتاه
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={2}
          defaultValue={tour?.summary ?? ""}
          className={inputClass}
          placeholder="متن کوتاهی که روی کارت تور نمایش داده می‌شود."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className={labelClass}>
          توضیحات کامل
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={tour?.description ?? ""}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="mainImageFile" className={labelClass}>
          آپلود تصویر اصلی
        </label>
        <FileInput id="mainImageFile" name="mainImageFile" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="mainImage" className={labelClass}>
          مسیر یا URL تصویر اصلی
        </label>
        <input
          id="mainImage"
          name="mainImage"
          defaultValue={tour?.mainImage ?? ""}
          className={inputClass}
          placeholder="/images/example.jpg یا https://..."
          dir="ltr"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="galleryFiles" className={labelClass}>
          افزودن تصاویر گالری
        </label>
        <FileInput id="galleryFiles" name="galleryFiles" multiple />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="gallery" className={labelClass}>
          تصاویر گالری{" "}
          <span className="font-normal text-muted-foreground">
            (هر مسیر یا URL در یک خط)
          </span>
        </label>
        <textarea
          id="gallery"
          name="gallery"
          rows={3}
          defaultValue={(tour?.gallery ?? []).join("\n")}
          className={inputClass}
          dir="ltr"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="highlights" className={labelClass}>
          نکات برجسته{" "}
          <span className="font-normal text-muted-foreground">
            (هر مورد در یک خط)
          </span>
        </label>
        <textarea
          id="highlights"
          name="highlights"
          rows={4}
          defaultValue={(tour?.highlights ?? []).join("\n")}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="included" className={labelClass}>
          موارد شامل تور{" "}
          <span className="font-normal text-muted-foreground">
            (هر مورد در یک خط)
          </span>
        </label>
        <textarea
          id="included"
          name="included"
          rows={4}
          defaultValue={(tour?.included ?? []).join("\n")}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="itinerary" className={labelClass}>
          برنامه سفر{" "}
          <span className="font-normal text-muted-foreground">
            (هر روز در یک خط، قالب: عنوان :: توضیح)
          </span>
        </label>
        <textarea
          id="itinerary"
          name="itinerary"
          rows={5}
          defaultValue={itineraryText}
          className={inputClass}
          placeholder={"ورود و حرکت با کشتی :: انتقال به بندر و سوار شدن به کشتی.\nطلوع و بازگشت :: تای‌چی روی عرشه و سپس بازگشت."}
        />
      </div>

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
        <SubmitButton label={tour ? "ذخیره تغییرات" : "ساخت تور"} />
        <Link
          href="/admin"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          انصراف
        </Link>
      </div>
    </form>
  )
}
