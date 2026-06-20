"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { aboutPage, type AboutValue } from "@/lib/db/schema"
import { uploadImageToMinio } from "@/lib/minio"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

async function requireAuth() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user
}

function parseList(value: FormDataEntryValue | null): string[] {
  if (!value) return []
  return String(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

function parseValues(value: FormDataEntryValue | null): AboutValue[] {
  if (!value) return []
  return String(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...rest] = line.split("::")
      return {
        title: (title ?? "").trim(),
        body: rest.join("::").trim(),
      }
    })
    .filter((item) => item.title && item.body)
}

async function uploadImageToMinioIfPresent(
  value: FormDataEntryValue | null,
): Promise<string | null> {
  if (!(value instanceof File) || value.size === 0) return null
  return uploadImageToMinio(value)
}

export async function updateAboutPage(formData: FormData) {
  await requireAuth()

  const heroImageUpload = await uploadImageToMinioIfPresent(
    formData.get("heroImageFile"),
  )
  const featureImageUpload = await uploadImageToMinioIfPresent(
    formData.get("featureImageFile"),
  )

  const data = {
    slug: "main",
    heroEyebrow: String(formData.get("heroEyebrow") ?? "").trim(),
    heroTitle: String(formData.get("heroTitle") ?? "").trim(),
    heroImage:
      heroImageUpload || String(formData.get("heroImage") ?? "").trim(),
    introEyebrow: String(formData.get("introEyebrow") ?? "").trim(),
    introTitle: String(formData.get("introTitle") ?? "").trim(),
    introBody: parseList(formData.get("introBody")),
    values: parseValues(formData.get("values")),
    featureEyebrow: String(formData.get("featureEyebrow") ?? "").trim(),
    featureTitle: String(formData.get("featureTitle") ?? "").trim(),
    featureBody: String(formData.get("featureBody") ?? "").trim(),
    featureImage:
      featureImageUpload || String(formData.get("featureImage") ?? "").trim(),
    updatedAt: new Date(),
  }

  await db
    .insert(aboutPage)
    .values(data)
    .onConflictDoUpdate({
      target: aboutPage.slug,
      set: data,
    })

  revalidatePath("/about")
  revalidatePath("/admin/about")
  redirect("/admin/about")
}
