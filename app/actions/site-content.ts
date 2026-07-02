"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { saveSiteContent, type SiteContent } from "@/lib/site-content"
import { headers } from "next/headers"
import { getSiteContent } from "@/lib/site-content"
import { uploadImageToMinio } from "@/lib/minio"

async function requireAuth() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("دسترسی غیرمجاز")
}

export async function updateSiteContent(formData: FormData) {
  await requireAuth()
  const raw = String(formData.get("content") ?? "")
  const content = JSON.parse(raw) as SiteContent
  await saveSiteContent(content)
  revalidatePath("/")
  revalidatePath("/admin/content")
  redirect("/admin/content")
}

async function uploadIfPresent(value: FormDataEntryValue | null) {
  if (!(value instanceof File) || value.size === 0) return null
  return uploadImageToMinio(value, "site")
}

export async function updateHomepageContent(formData: FormData) {
  await requireAuth()
  const current = await getSiteContent()

  const heroMainUpload = await uploadIfPresent(formData.get("heroMainImageFile"))
  const heroLeftUpload = await uploadIfPresent(formData.get("heroLeftImageFile"))
  const heroRightUpload = await uploadIfPresent(formData.get("heroRightImageFile"))
  const philosophyFirstUpload = await uploadIfPresent(formData.get("philosophyFirstImageFile"))
  const philosophySecondUpload = await uploadIfPresent(formData.get("philosophySecondImageFile"))

  const content: SiteContent = {
    ...current,
    headerLinks: parseHeaderLinks(String(formData.get("headerLinks") ?? "")),
    hero: {
      ...current.hero,
      mainImage:
        heroMainUpload || String(formData.get("heroMainImage") ?? "").trim(),
      tagline: String(formData.get("heroTagline") ?? "").trim(),
      sideImages: current.hero.sideImages.map((image, index) => {
        if (index === 0) {
          return {
            ...image,
            src:
              heroLeftUpload ||
              String(formData.get("heroLeftImage") ?? "").trim(),
            alt: String(formData.get("heroLeftAlt") ?? "").trim(),
          }
        }
        if (index === 2) {
          return {
            ...image,
            src:
              heroRightUpload ||
              String(formData.get("heroRightImage") ?? "").trim(),
            alt: String(formData.get("heroRightAlt") ?? "").trim(),
          }
        }
        return image
      }),
    },
    philosophy: {
      ...current.philosophy,
      mobileTitle: String(formData.get("philosophyMobileTitle") ?? "").trim(),
      mobileBody: String(formData.get("philosophyMobileBody") ?? "").trim(),
      desktopTitle: String(formData.get("philosophyDesktopTitle") ?? "").trim(),
      firstImage:
        philosophyFirstUpload ||
        String(formData.get("philosophyFirstImage") ?? "").trim(),
      firstLabel: String(formData.get("philosophyFirstLabel") ?? "").trim(),
      secondImage:
        philosophySecondUpload ||
        String(formData.get("philosophySecondImage") ?? "").trim(),
      secondLabel: String(formData.get("philosophySecondLabel") ?? "").trim(),
      eyebrow: String(formData.get("philosophyEyebrow") ?? "").trim(),
      body: String(formData.get("philosophyBody") ?? "").trim(),
    },
    featured: {
      ...current.featured,
      title: String(formData.get("featuredTitle") ?? "").trim(),
      intro: String(formData.get("featuredIntro") ?? "").trim(),
    },
    technology: {
      ...current.technology,
      eyebrow: String(formData.get("technologyEyebrow") ?? "").trim(),
      title: String(formData.get("technologyTitle") ?? "").trim(),
      body: String(formData.get("technologyBody") ?? "").trim(),
      description: String(formData.get("technologyDescription") ?? "").trim(),
    },
    gallery: {
      ...current.gallery,
      eyebrow: String(formData.get("galleryEyebrow") ?? "").trim(),
      title: String(formData.get("galleryTitle") ?? "").trim(),
    },
    testimonials: {
      ...current.testimonials,
      statement: String(formData.get("testimonialsStatement") ?? "").trim(),
    },
  }

  await saveSiteContent(content)
  revalidatePath("/")
  revalidatePath("/admin/homepage-content")
  redirect("/admin/homepage-content")
}

function parseHeaderLinks(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, href] = line.split("|").map((part) => part.trim())
      return { label, href }
    })
    .filter((item) => item.label && item.href)
}
