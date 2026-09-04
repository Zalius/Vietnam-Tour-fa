"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { saveContactSettings } from "@/lib/contact-settings"

async function requireAuth() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("دسترسی غیرمجاز")
}

export async function updateContactSettings(formData: FormData) {
  await requireAuth()

  await saveContactSettings({
    vietnamPhone: String(formData.get("vietnamPhone") ?? "").trim(),
    iranPhone: String(formData.get("iranPhone") ?? "").trim(),
    telegramId: String(formData.get("telegramId") ?? "").trim(),
    contactEmail: String(formData.get("contactEmail") ?? "").trim(),
  })

  revalidatePath("/admin/contact")
  revalidatePath("/booking-terms")
  revalidatePath("/tours")
  revalidatePath("/")
  redirect("/admin/contact")
}
