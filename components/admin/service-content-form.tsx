"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import type { ServiceContent } from "@/lib/service-content";

const inputClass =
  "rounded-lg border border-border bg-input px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
    >
      {pending ? "در حال ذخیره..." : "ذخیره صفحه"}
    </button>
  );
}

export function ServiceContentForm({
  action,
  content,
}: {
  action: (formData: FormData) => Promise<void>;
  content: ServiceContent;
}) {
  return (
    <form action={action} className="space-y-6">
      <Field name="title" label="عنوان صفحه" defaultValue={content.title} />
      <Field name="eyebrow" label="برچسب بالای صفحه" defaultValue={content.eyebrow} />
      <TextArea name="intro" label="متن معرفی کوتاه" defaultValue={content.intro} />

      <div className="grid gap-3 rounded-2xl border border-border p-5">
        <label className="text-sm font-medium text-foreground">
          تصویر اصلی صفحه
        </label>
        <input
          name="heroImageFile"
          type="file"
          accept="image/*"
          className="text-sm text-muted-foreground file:ml-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground"
        />
        <input
          name="heroImage"
          defaultValue={content.heroImage}
          dir="ltr"
          className={inputClass}
        />
        <p className="text-xs leading-relaxed text-muted-foreground">
          اگر تصویر جدید آپلود کنید، آدرس بالا به صورت خودکار با فایل جدید جایگزین می‌شود.
        </p>
      </div>

      <TextArea name="body" label="متن اصلی" defaultValue={content.body} />
      <TextArea
        name="cards"
        label="کارت‌ها و پرسش‌ها"
        hint="هر خط را با این قالب وارد کنید: عنوان :: متن"
        defaultValue={content.cards
          .map((card) => `${card.title} :: ${card.body}`)
          .join("\n")}
      />

      <div className="flex items-center gap-4 border-t border-border pt-6">
        <SubmitButton />
        <Link
          href="/admin"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          بازگشت
        </Link>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input name={name} defaultValue={defaultValue} className={inputClass} />
    </label>
  );
}

function TextArea({
  name,
  label,
  defaultValue,
  hint,
}: {
  name: string;
  label: string;
  defaultValue: string;
  hint?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      <textarea
        name={name}
        rows={5}
        defaultValue={defaultValue}
        className={inputClass}
      />
    </label>
  );
}
