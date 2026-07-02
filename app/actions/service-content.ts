"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getServiceContent, saveServiceContent } from "@/lib/service-content";
import { uploadImageToMinio } from "@/lib/minio";

async function requireAuth() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("دسترسی غیرمجاز");
}

async function uploadIfPresent(value: FormDataEntryValue | null) {
  if (!(value instanceof File) || value.size === 0) return null;
  return uploadImageToMinio(value, "pages");
}

export async function updateServiceContent(slug: string, formData: FormData) {
  await requireAuth();
  const current = await getServiceContent(slug);
  const heroUpload = await uploadIfPresent(formData.get("heroImageFile"));
  const content = {
    ...current,
    title: String(formData.get("title") ?? "").trim(),
    eyebrow: String(formData.get("eyebrow") ?? "").trim(),
    intro: String(formData.get("intro") ?? "").trim(),
    heroImage: heroUpload || String(formData.get("heroImage") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    cards: parseCards(String(formData.get("cards") ?? "")),
  };

  await saveServiceContent(content);
  revalidatePath(`/${slug}`);
  revalidatePath(`/admin/service-pages/${slug}`);
  redirect(`/admin/service-pages/${slug}`);
}

function parseCards(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...rest] = line.split("::");
      return { title: title.trim(), body: rest.join("::").trim() };
    })
    .filter((item) => item.title && item.body);
}
