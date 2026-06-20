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
      {pending ? "Saving..." : "Save About page"}
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
      className="text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground hover:file:bg-secondary/80"
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
            Hero eyebrow
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
            Hero title
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
            Hero image upload
          </label>
          <FileInput id="heroImageFile" name="heroImageFile" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="heroImage" className={labelClass}>
            Hero image URL
          </label>
          <input
            id="heroImage"
            name="heroImage"
            defaultValue={page.heroImage}
            className={inputClass}
          />
        </div>
      </fieldset>

      <fieldset className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="introEyebrow" className={labelClass}>
            Intro eyebrow
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
            Intro title
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
            Intro paragraphs <span className="font-normal text-muted-foreground">(one per line)</span>
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
          Values <span className="font-normal text-muted-foreground">(Title :: Body, one per line)</span>
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
            Feature eyebrow
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
            Feature title
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
            Feature body
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
            Feature image upload
          </label>
          <FileInput id="featureImageFile" name="featureImageFile" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="featureImage" className={labelClass}>
            Feature image URL
          </label>
          <input
            id="featureImage"
            name="featureImage"
            defaultValue={page.featureImage}
            className={inputClass}
          />
        </div>
      </fieldset>

      <div className="flex items-center gap-4 border-t border-border pt-6">
        <SubmitButton />
        <Link
          href="/admin"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
