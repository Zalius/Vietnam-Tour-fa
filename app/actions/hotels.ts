"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { createHotelRecord, updateHotelRecord } from "@/lib/hotels"
import type { NewHotel } from "@/lib/db/schema"

async function requireAuth() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("دسترسی غیرمجاز")
}

function parseList(value: FormDataEntryValue | null): string[] {
  if (!value) return []
  return String(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

async function buildHotelData(formData: FormData): Promise<NewHotel> {
  const name = String(formData.get("name") ?? "").trim()
  const city = String(formData.get("city") ?? "").trim()
  if (!name || !city) throw new Error("نام هتل و شهر الزامی است")

  return {
    name,
    city,
    quality: String(formData.get("quality") ?? "4 ستاره").trim(),
    address: String(formData.get("address") ?? "").trim(),
    website: String(formData.get("website") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    gallery: parseList(formData.get("gallery")),
    description: String(formData.get("description") ?? "").trim(),
    amenities: parseList(formData.get("amenities")),
    notes: String(formData.get("notes") ?? "").trim(),
    updatedAt: new Date(),
  }
}

function revalidateHotelPaths(id?: number) {
  revalidatePath("/admin/hotels")
  revalidatePath("/admin/new")
  revalidatePath("/hotels")
  revalidatePath("/")
  if (id) {
    revalidatePath(`/admin/hotels/${id}`)
    revalidatePath(`/hotels/${id}`)
  }
}

export async function createHotel(formData: FormData) {
  await requireAuth()
  const hotel = await createHotelRecord(await buildHotelData(formData))
  revalidateHotelPaths(hotel.id)
  redirect("/admin/hotels")
}

export async function updateHotel(id: number, formData: FormData) {
  await requireAuth()
  const hotel = await updateHotelRecord(id, await buildHotelData(formData))
  revalidateHotelPaths(hotel?.id ?? id)
  redirect("/admin/hotels")
}
