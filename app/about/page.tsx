import Image from "next/image"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"

export const metadata: Metadata = {
  title: "About Us | Tour Vietnam",
  description:
    "Meet Tour Vietnam, a local team creating thoughtful private and small-group journeys across Vietnam.",
}

const values = [
  {
    title: "Local knowledge",
    body: "Routes are shaped with guides who know the rhythm of each region, from early market hours to quiet viewpoints after the crowds leave.",
  },
  {
    title: "Flexible journeys",
    body: "Each tour can be adjusted around your pace, interests, travel dates, and the kind of Vietnam you want to experience.",
  },
  {
    title: "Responsible travel",
    body: "We work with local partners, family-run stays, and community-led experiences wherever they genuinely improve the journey.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative flex min-h-[78vh] items-end overflow-hidden">
        <Image
          src="/images/Vietnam/Ha_Long_Bay_2.jpg"
          alt="Boats among limestone karsts in Vietnam"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/20" />
        <div className="relative z-10 px-6 pb-16 pt-36 md:px-12 lg:px-20">
          <p className="mb-4 text-xs uppercase tracking-widest text-white/75">
            About Us
          </p>
          <h1 className="max-w-4xl text-5xl font-medium leading-tight text-white md:text-7xl">
            Thoughtful journeys, made by people who know Vietnam.
          </h1>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Tour Vietnam
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight text-foreground md:text-5xl">
              We build tours around real places, real timing, and real local care.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Tour Vietnam creates private and small-group journeys across the
              country, from Ha Long Bay and Ninh Binh to Sapa, Hoi An, Hue, Da
              Nang, Ho Chi Minh City, and the Mekong Delta.
            </p>
            <p>
              Our work is simple: understand what kind of trip you want, match it
              with the right route and guides, and keep the details clear before
              you arrive. The result should feel smooth, personal, and grounded
              in the places you came to see.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border px-6 py-14 md:px-12 lg:px-20">
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title}>
              <h3 className="text-lg font-medium text-foreground">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-0 lg:grid-cols-2">
        <div className="relative min-h-[360px] lg:min-h-[560px]">
          <Image
            src="/images/Vietnam/lanterns-hoi-an-danang-vietnam-travel-solo-main-image-hd-op.jpg"
            alt="Lanterns in Hoi An, Vietnam"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex items-center px-6 py-16 md:px-12 lg:px-20">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              How we work
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight text-foreground md:text-5xl">
              Clear plans, local guides, room for the unexpected.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              We plan the essentials carefully, then leave enough space for the
              moments that make Vietnam memorable: a slower lunch, a market stop,
              a better sunset, or a route change when the weather asks for it.
            </p>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
