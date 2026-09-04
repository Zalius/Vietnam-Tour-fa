"use client"

import Link from "next/link"
import { useTransition } from "react"
import { deleteTour, togglePublished } from "@/app/actions/tours"

export function TourRowActions({
  id,
  viewHref,
  published,
  compact = false,
}: {
  id: number
  viewHref: string
  published: boolean
  compact?: boolean
}) {
  const [isPending, startTransition] = useTransition()

  const actionClass = compact
    ? "inline-flex flex-1 items-center justify-center rounded-full border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    : "text-muted-foreground transition-colors hover:text-foreground"

  return (
    <div
      className={
        compact
          ? "grid grid-cols-2 gap-2 text-sm"
          : "flex items-center gap-3 text-sm"
      }
    >
      <Link href={viewHref} target="_blank" className={actionClass}>
        مشاهده
      </Link>
      <Link href={`/admin/${id}`} className={actionClass}>
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
        className={`${actionClass} disabled:opacity-50`}
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
        className={
          compact
            ? "inline-flex flex-1 items-center justify-center rounded-full border border-destructive/30 px-3 py-2 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
            : "text-destructive transition-opacity hover:opacity-80 disabled:opacity-50"
        }
      >
        حذف
      </button>
    </div>
  )
}
