"use client"

import Link from "next/link"
import { useFormStatus } from "react-dom"
import type { AboutPage } from "@/lib/db/schema"

const labelClass = "text-sm font-medium text-foreground"
const inputClass =
  "rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
    >
      {pending ? "در حال ذخیره..." : "ذخیره صفحه درباره ما"}
    </button>
  )
}

function FileInput({ id, name }: { id: string; name: string }) {
  return (
    <input
      id={id}
      name={name}
      type="file"
      accept="image/*"
      className="text-sm text-muted-foreground file:ml-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground hover:file:bg-secondary/80"
    />
  )
}

export function AboutForm({
  action,
  page,
}: {
  action: (formData: FormData) => Promise<void>
  page: AboutPage
}) {
  const valuesText = page.values
    .map((value) => `${value.title} :: ${value.body}`)
    .join("\n")

  return (
    <form action={action} className="flex flex-col gap-8">
      <fieldset className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="heroEyebrow" className={labelClass}>
            برچسب بالای هیرو
          </label>
          <input
            id="heroEyebrow"
            name="heroEyebrow"
            defaultValue={page.heroEyebrow}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="heroTitle" className={labelClass}>
            عنوان هیرو
          </label>
          <textarea
            id="heroTitle"
            name="heroTitle"
            rows={3}
            defaultValue={page.heroTitle}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="heroImageFile" className={labelClass}>
            آپلود تصویر هیرو
          </label>
          <FileInput id="heroImageFile" name="heroImageFile" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="heroImage" className={labelClass}>
            URL تصویر هیرو
          </label>
          <input
            id="heroImage"
            name="heroImage"
            defaultValue={page.heroImage}
            className={inputClass}
            dir="ltr"
          />
        </div>
      </fieldset>

      <fieldset className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="introEyebrow" className={labelClass}>
            برچسب مقدمه
          </label>
          <input
            id="introEyebrow"
            name="introEyebrow"
            defaultValue={page.introEyebrow}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="introTitle" className={labelClass}>
            عنوان مقدمه
          </label>
          <textarea
            id="introTitle"
            name="introTitle"
            rows={3}
            defaultValue={page.introTitle}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="introBody" className={labelClass}>
            پاراگراف‌های مقدمه{" "}
            <span className="font-normal text-muted-foreground">
              (هر پاراگراف در یک خط)
            </span>
          </label>
          <textarea
            id="introBody"
            name="introBody"
            rows={5}
            defaultValue={page.introBody.join("\n")}
            className={inputClass}
          />
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="values" className={labelClass}>
          ارزش‌ها{" "}
          <span className="font-normal text-muted-foreground">
            (عنوان :: متن، هر مورد در یک خط)
          </span>
        </label>
        <textarea
          id="values"
          name="values"
          rows={5}
          defaultValue={valuesText}
          className={inputClass}
        />
      </div>

      <fieldset className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="featureEyebrow" className={labelClass}>
            برچسب بخش ویژه
          </label>
          <input
            id="featureEyebrow"
            name="featureEyebrow"
            defaultValue={page.featureEyebrow}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="featureTitle" className={labelClass}>
            عنوان بخش ویژه
          </label>
          <textarea
            id="featureTitle"
            name="featureTitle"
            rows={3}
            defaultValue={page.featureTitle}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="featureBody" className={labelClass}>
            متن بخش ویژه
          </label>
          <textarea
            id="featureBody"
            name="featureBody"
            rows={4}
            defaultValue={page.featureBody}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="featureImageFile" className={labelClass}>
            آپلود تصویر بخش ویژه
          </label>
          <FileInput id="featureImageFile" name="featureImageFile" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="featureImage" className={labelClass}>
            URL تصویر بخش ویژه
          </label>
          <input
            id="featureImage"
            name="featureImage"
            defaultValue={page.featureImage}
            className={inputClass}
            dir="ltr"
          />
        </div>
      </fieldset>

      <div className="flex items-center gap-4 border-t border-border pt-6">
        <SubmitButton />
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
