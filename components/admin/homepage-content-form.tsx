"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";
import type { SiteContent } from "@/lib/site-content-defaults";

const labelClass = "text-sm font-medium text-foreground";
const inputClass =
  "rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
    >
      {pending ? "در حال ذخیره..." : "ذخیره تغییرات صفحه اصلی"}
    </button>
  );
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
  );
}

export function HomepageContentForm({
  action,
  content,
}: {
  action: (formData: FormData) => Promise<void>;
  content: SiteContent;
}) {
  const leftHero = content.hero.sideImages.find((image) => image.position === "left");
  const rightHero = content.hero.sideImages.find((image) => image.position === "right");

  return (
    <form action={action} className="space-y-8">
      <Section title="منوی بالای سایت">
        <p className="text-sm text-muted-foreground md:col-span-2">
          هر خط را با این قالب وارد کنید: عنوان | آدرس
        </p>
        <textarea
          name="headerLinks"
          rows={5}
          defaultValue={content.headerLinks
            .map((link) => `${link.label} | ${link.href}`)
            .join("\n")}
          className={`${inputClass} md:col-span-2`}
        />
      </Section>

      <Section title="بخش اول سایت">
        <TextArea name="heroTagline" label="متن پایین تصویر اصلی" defaultValue={content.hero.tagline} />
        <ImageField name="heroMainImage" fileName="heroMainImageFile" label="تصویر اصلی" defaultValue={content.hero.mainImage} />
        <ImageField name="heroLeftImage" fileName="heroLeftImageFile" label="تصویر سمت چپ" defaultValue={leftHero?.src ?? ""} />
        <TextInput name="heroLeftAlt" label="توضیح تصویر سمت چپ" defaultValue={leftHero?.alt ?? ""} />
        <ImageField name="heroRightImage" fileName="heroRightImageFile" label="تصویر سمت راست" defaultValue={rightHero?.src ?? ""} />
        <TextInput name="heroRightAlt" label="توضیح تصویر سمت راست" defaultValue={rightHero?.alt ?? ""} />
      </Section>

      <Section title="بخش فلسفه سفر">
        <TextInput name="philosophyMobileTitle" label="عنوان موبایل" defaultValue={content.philosophy.mobileTitle} />
        <TextArea name="philosophyMobileBody" label="متن موبایل" defaultValue={content.philosophy.mobileBody} />
        <TextInput name="philosophyDesktopTitle" label="عنوان دسکتاپ" defaultValue={content.philosophy.desktopTitle} />
        <ImageField name="philosophyFirstImage" fileName="philosophyFirstImageFile" label="تصویر اول" defaultValue={content.philosophy.firstImage} />
        <TextInput name="philosophyFirstLabel" label="برچسب تصویر اول" defaultValue={content.philosophy.firstLabel} />
        <ImageField name="philosophySecondImage" fileName="philosophySecondImageFile" label="تصویر دوم" defaultValue={content.philosophy.secondImage} />
        <TextInput name="philosophySecondLabel" label="برچسب تصویر دوم" defaultValue={content.philosophy.secondLabel} />
        <TextInput name="philosophyEyebrow" label="برچسب توضیح" defaultValue={content.philosophy.eyebrow} />
        <TextArea name="philosophyBody" label="متن توضیح" defaultValue={content.philosophy.body} />
      </Section>

      <Section title="بخش‌های متنی دیگر">
        <TextArea name="featuredTitle" label="عنوان بخش خدمات" defaultValue={content.featured.title} />
        <TextArea name="featuredIntro" label="متن بخش خدمات" defaultValue={content.featured.intro} />
        <TextInput name="technologyEyebrow" label="برچسب تجربه سفر" defaultValue={content.technology.eyebrow} />
        <TextInput name="technologyTitle" label="عنوان تجربه سفر" defaultValue={content.technology.title} />
        <TextArea name="technologyBody" label="متن کوتاه تجربه سفر" defaultValue={content.technology.body} />
        <TextArea name="technologyDescription" label="متن توضیح تجربه سفر" defaultValue={content.technology.description} />
        <TextInput name="galleryEyebrow" label="برچسب گالری" defaultValue={content.gallery.eyebrow} />
        <TextInput name="galleryTitle" label="عنوان گالری" defaultValue={content.gallery.title} />
        <TextArea name="testimonialsStatement" label="متن پایانی" defaultValue={content.testimonials.statement} />
      </Section>

      <div className="flex items-center gap-4 border-t border-border pt-6">
        <SubmitButton />
        <Link href="/admin" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          بازگشت
        </Link>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border p-6">
      <h2 className="text-xl font-medium text-foreground">{title}</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function TextInput({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  return (
    <label className="grid gap-2">
      <span className={labelClass}>{label}</span>
      <input name={name} defaultValue={defaultValue} className={inputClass} />
    </label>
  );
}

function TextArea({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  return (
    <label className="grid gap-2 md:col-span-2">
      <span className={labelClass}>{label}</span>
      <textarea name={name} rows={4} defaultValue={defaultValue} className={inputClass} />
    </label>
  );
}

function ImageField({
  name,
  fileName,
  label,
  defaultValue,
}: {
  name: string;
  fileName: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <div className="grid gap-3 md:col-span-2">
      <label className={labelClass}>{label}</label>
      <FileInput id={fileName} name={fileName} />
      <input name={name} defaultValue={defaultValue} className={inputClass} dir="ltr" />
      <p className="text-xs leading-relaxed text-muted-foreground">
        اگر فایل جدید انتخاب کنید، آدرس بالا با تصویر آپلود شده جایگزین می‌شود.
      </p>
    </div>
  );
}
