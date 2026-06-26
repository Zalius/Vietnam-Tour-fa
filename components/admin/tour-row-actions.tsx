"use client"

import { useTransition } from "react"
import Link from "next/link"
import { deleteTour, togglePublished } from "@/app/actions/tours"

export function TourRowActions({
  id,
  viewHref,
  published,
}: {
  id: number
  viewHref: string
  published: boolean
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex items-center gap-3 text-sm">
      <Link
        href={viewHref}
        target="_blank"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        مشاهده
      </Link>
      <Link
        href={`/admin/${id}`}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        ویرایش
      </Link>
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(() => {
            togglePublished(id, !published)
          })
        }
        className="text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
      >
        {published ? "لغو انتشار" : "انتشار"}
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          if (confirm("این تور حذف شود؟ این کار قابل بازگشت نیست.")) {
            startTransition(() => {
              deleteTour(id)
            })
          }
        }}
        className="text-destructive transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        حذف
      </button>
    </div>
  )
}
