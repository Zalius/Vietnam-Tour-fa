"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { FadeImage } from "@/components/fade-image"

export type TourListItem = {
  id: number
  slug: string
  title: string
  region: string
  summary: string
  price: number
  durationDays: number
  startLocation: string
  endLocation: string
  maxGroupSize: number
  difficulty: string
  mainImage: string
  featured: boolean
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 0,
  }).format(price) + " دلار"
}

function formatDifficulty(difficulty: string): string {
  const labels: Record<string, string> = {
    Easy: "آسان",
    Moderate: "متوسط",
    Challenging: "چالش‌برانگیز",
    Strenuous: "سخت",
  }

  return labels[difficulty] ?? difficulty
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "fa"),
  )
}

export function ToursFilteredList({ tours }: { tours: TourListItem[] }) {
  const [query, setQuery] = useState("")
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const maxTourPrice = Math.max(...tours.map((tour) => tour.price), 0)
  const maxTourDuration = Math.max(...tours.map((tour) => tour.durationDays), 1)
  const maxTourGroupSize = Math.max(...tours.map((tour) => tour.maxGroupSize), 1)
  const [maxPrice, setMaxPrice] = useState(maxTourPrice)
  const [maxDuration, setMaxDuration] = useState(maxTourDuration)
  const [maxGroupSize, setMaxGroupSize] = useState(maxTourGroupSize)

  const regions = useMemo(
    () => uniqueSorted(tours.map((tour) => tour.region)),
    [tours],
  )
  const locations = useMemo(
    () =>
      uniqueSorted(
        tours.flatMap((tour) => [
          tour.region,
          tour.startLocation,
          tour.endLocation,
        ]),
      ),
    [tours],
  )
  const difficulties = useMemo(
    () => uniqueSorted(tours.map((tour) => tour.difficulty)),
    [tours],
  )

  const filteredTours = tours.filter((tour) => {
    const normalizedQuery = query.trim().toLowerCase()
    const matchesQuery =
      !normalizedQuery ||
      [tour.title, tour.region, tour.summary, tour.startLocation, tour.endLocation]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)

    const matchesRegion =
      selectedRegions.length === 0 || selectedRegions.includes(tour.region)
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.some((location) =>
        [tour.region, tour.startLocation, tour.endLocation].includes(location),
      )
    const matchesDifficulty =
      selectedDifficulties.length === 0 ||
      selectedDifficulties.includes(tour.difficulty)

    return (
      matchesQuery &&
      matchesRegion &&
      matchesLocation &&
      matchesDifficulty &&
      tour.price <= maxPrice &&
      tour.durationDays <= maxDuration &&
      tour.maxGroupSize <= maxGroupSize
    )
  })

  function toggleValue(
    value: string,
    values: string[],
    setValues: (next: string[]) => void,
  ) {
    setValues(
      values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value],
    )
  }

  function clearFilters() {
    setQuery("")
    setSelectedRegions([])
    setSelectedLocations([])
    setSelectedDifficulties([])
    setMaxPrice(maxTourPrice)
    setMaxDuration(maxTourDuration)
    setMaxGroupSize(maxTourGroupSize)
  }

  const filterContent = (
    <div className="flex flex-col gap-8">
      <div>
        <label htmlFor="tour-search" className="text-sm font-medium text-foreground">
          جستجو
        </label>
        <div className="relative mt-3">
          <Search
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id="tour-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="نام تور، شهر یا منطقه"
            className="w-full rounded-full border border-border bg-input py-2.5 pr-10 pl-4 text-sm outline-none transition focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">بودجه تا</span>
          <span className="text-sm text-muted-foreground">{formatPrice(maxPrice)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={maxTourPrice}
          step={25}
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="mt-4 w-full accent-foreground"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">مدت سفر تا</span>
          <span className="text-sm text-muted-foreground">{maxDuration} روز</span>
        </div>
        <input
          type="range"
          min={1}
          max={maxTourDuration}
          value={maxDuration}
          onChange={(event) => setMaxDuration(Number(event.target.value))}
          className="mt-4 w-full accent-foreground"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">اندازه گروه تا</span>
          <span className="text-sm text-muted-foreground">{maxGroupSize} نفر</span>
        </div>
        <input
          type="range"
          min={1}
          max={maxTourGroupSize}
          value={maxGroupSize}
          onChange={(event) => setMaxGroupSize(Number(event.target.value))}
          className="mt-4 w-full accent-foreground"
        />
      </div>

      <FilterGroup title="منطقه">
        {regions.map((region) => (
          <CheckboxFilter
            key={region}
            label={region}
            checked={selectedRegions.includes(region)}
            onChange={() => toggleValue(region, selectedRegions, setSelectedRegions)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="مکان‌ها">
        {locations.map((location) => (
          <CheckboxFilter
            key={location}
            label={location}
            checked={selectedLocations.includes(location)}
            onChange={() =>
              toggleValue(location, selectedLocations, setSelectedLocations)
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="سطح سفر">
        {difficulties.map((difficulty) => (
          <CheckboxFilter
            key={difficulty}
            label={formatDifficulty(difficulty)}
            checked={selectedDifficulties.includes(difficulty)}
            onChange={() =>
              toggleValue(difficulty, selectedDifficulties, setSelectedDifficulties)
            }
          />
        ))}
      </FilterGroup>

      <button
        type="button"
        onClick={clearFilters}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm text-foreground transition hover:bg-secondary"
      >
        <X size={16} />
        پاک کردن فیلترها
      </button>
    </div>
  )

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-12">
      <aside className="hidden lg:block">
        <div className="sticky top-28 border-l border-border pl-6">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              فیلترها
            </p>
            <h2 className="mt-2 text-xl font-medium text-foreground">
              تور مناسب خود را پیدا کنید
            </h2>
          </div>
          {filterContent}
        </div>
      </aside>

      <div>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredTours.length} تور از {tours.length} تور
          </p>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm text-foreground transition hover:bg-secondary lg:hidden"
          >
            <SlidersHorizontal size={16} />
            فیلترها
          </button>
        </div>

        {filteredTours.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
            <h3 className="text-xl font-medium text-foreground">
              توری با این فیلترها پیدا نشد
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              چند فیلتر را تغییر دهید یا همه را پاک کنید.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTours.map((tour) => (
              <Link
                key={tour.id}
                href={`/tours/${tour.slug}`}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
                  <FadeImage
                    src={tour.mainImage || "/placeholder.svg"}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-105"
                  />
                  {tour.featured && (
                    <span className="absolute right-4 top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                      ویژه
                    </span>
                  )}
                </div>
                <div className="py-5">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {tour.region} &middot; {tour.durationDays} روز
                  </p>
                  <div className="mt-2 flex items-start justify-between gap-4">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {tour.title}
                    </h3>
                    <span className="shrink-0 text-lg font-medium text-foreground">
                      {formatPrice(tour.price)}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {tour.summary}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {tour.startLocation || tour.region} تا{" "}
                    {tour.endLocation || tour.region} ·{" "}
                    {formatDifficulty(tour.difficulty)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 lg:hidden">
          <div className="absolute inset-y-0 right-0 w-[88vw] max-w-sm overflow-y-auto bg-background px-6 py-6 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  فیلترها
                </p>
                <h2 className="mt-2 text-xl font-medium text-foreground">
                  جستجوی تور
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full bg-secondary p-2 text-foreground"
                aria-label="بستن فیلترها"
              >
                <X size={18} />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
    </div>
  )
}

function FilterGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-foreground">{title}</p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

function CheckboxFilter({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground transition hover:text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-border accent-foreground"
      />
      {label}
    </label>
  )
}
