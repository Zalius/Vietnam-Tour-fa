import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { uploadImageToMinio } from "@/lib/minio"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const folder = String(formData.get("folder") ?? "tours").trim() || "tours"
    const files = formData
      .getAll("files")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0)

    if (files.length === 0) {
      return NextResponse.json({ urls: [] })
    }

    const urls = (
      await Promise.all(files.map((file) => uploadImageToMinio(file, folder)))
    ).filter((url): url is string => Boolean(url))

    return NextResponse.json({ urls })
  } catch (error) {
    console.error("Image upload failed", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Image upload failed" },
      { status: 500 },
    )
  }
}
