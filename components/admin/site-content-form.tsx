"use client"

import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import { useFormStatus } from "react-dom"
import type { SiteContent } from "@/lib/site-content-defaults"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
    >
      {pending ? "در حال ذخیره..." : "ذخیره محتوای سایت"}
    </button>
  )
}

export function SiteContentForm({
  action,
  content,
}: {
  action: (formData: FormData) => Promise<void>
  content: SiteContent
}) {
  const [draft, setDraft] = useState(content)
  const serialized = useMemo(() => JSON.stringify(draft), [draft])

  function update(path: string[], value: unknown) {
    setDraft((current) => {
      const next = structuredClone(current)
      let target: Record<string, unknown> = next as unknown as Record<string, unknown>
      for (const key of path.slice(0, -1)) {
        target = target[key] as Record<string, unknown>
      }
      target[path[path.length - 1]] = value
      return next
    })
  }

  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="content" value={serialized} />

      <Section title="منوی بالای سایت">
        <JsonEditor
          value={draft.headerLinks}
          onChange={(value) => update(["headerLinks"], value)}
        />
      </Section>

      <Section title="HeroSection">
        <TextField label="تصویر اصلی" value={draft.hero.mainImage} onChange={(value) => update(["hero", "mainImage"], value)} />
        <TextArea label="متن پایین هیرو" value={draft.hero.tagline} onChange={(value) => update(["hero", "tagline"], value)} />
        <JsonEditor value={draft.hero.sideImages} onChange={(value) => update(["hero", "sideImages"], value)} />
      </Section>

      <Section title="PhilosophySection">
        <TextField label="عنوان موبایل" value={draft.philosophy.mobileTitle} onChange={(value) => update(["philosophy", "mobileTitle"], value)} />
        <TextArea label="متن موبایل" value={draft.philosophy.mobileBody} onChange={(value) => update(["philosophy", "mobileBody"], value)} />
        <TextField label="عنوان دسکتاپ" value={draft.philosophy.desktopTitle} onChange={(value) => update(["philosophy", "desktopTitle"], value)} />
        <TextField label="تصویر اول" value={draft.philosophy.firstImage} onChange={(value) => update(["philosophy", "firstImage"], value)} />
        <TextField label="برچسب تصویر اول" value={draft.philosophy.firstLabel} onChange={(value) => update(["philosophy", "firstLabel"], value)} />
        <TextField label="تصویر دوم" value={draft.philosophy.secondImage} onChange={(value) => update(["philosophy", "secondImage"], value)} />
        <TextField label="برچسب تصویر دوم" value={draft.philosophy.secondLabel} onChange={(value) => update(["philosophy", "secondLabel"], value)} />
        <TextField label="برچسب توضیح" value={draft.philosophy.eyebrow} onChange={(value) => update(["philosophy", "eyebrow"], value)} />
        <TextArea label="متن توضیح" value={draft.philosophy.body} onChange={(value) => update(["philosophy", "body"], value)} />
      </Section>

      <Section title="FeaturedProductsSection">
        <TextArea label="عنوان" value={draft.featured.title} onChange={(value) => update(["featured", "title"], value)} />
        <TextArea label="متن کوتاه" value={draft.featured.intro} onChange={(value) => update(["featured", "intro"], value)} />
        <JsonEditor value={draft.featured.items} onChange={(value) => update(["featured", "items"], value)} />
      </Section>

      <Section title="Technology / Gallery / Editorial / Testimonials">
        <JsonEditor value={{
          technology: draft.technology,
          gallery: draft.gallery,
          editorial: draft.editorial,
          testimonials: draft.testimonials,
        }} onChange={(value) => {
          const next = value as Pick<SiteContent, "technology" | "gallery" | "editorial" | "testimonials">
          setDraft((current) => ({ ...current, ...next }))
        }} />
      </Section>

      <div className="flex border-t border-border pt-6">
        <SubmitButton />
      </div>
    </form>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border p-6">
      <h2 className="text-xl font-medium text-foreground">{title}</h2>
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  )
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="rounded-lg border border-border bg-input px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
    </label>
  )
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} className="rounded-lg border border-border bg-input px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
    </label>
  )
}

function JsonEditor({ value, onChange }: { value: unknown; onChange: (value: unknown) => void }) {
  const [text, setText] = useState(JSON.stringify(value, null, 2))
  const [error, setError] = useState("")

  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      آرایه / تنظیمات پیشرفته
      <textarea
        dir="ltr"
        value={text}
        onChange={(event) => {
          const nextText = event.target.value
          setText(nextText)
          try {
            const nextValue = JSON.parse(nextText)
            setError("")
            onChange(nextValue)
          } catch {
            setError("JSON معتبر نیست.")
          }
        }}
        rows={8}
        className="rounded-lg border border-border bg-input px-4 py-2.5 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
      />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  )
}
