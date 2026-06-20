import { db } from "@/lib/db"
import { aboutPage, type AboutPage, type AboutValue } from "@/lib/db/schema"
import { getMinioImageUrl } from "@/lib/minio"
import { eq } from "drizzle-orm"

const defaultIntroBody = [
  "Tour Vietnam creates private and small-group journeys across the country, from Ha Long Bay and Ninh Binh to Sapa, Hoi An, Hue, Da Nang, Ho Chi Minh City, and the Mekong Delta.",
  "Our work is simple: understand what kind of trip you want, match it with the right route and guides, and keep the details clear before you arrive. The result should feel smooth, personal, and grounded in the places you came to see.",
]

const defaultValues: AboutValue[] = [
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

const defaultAboutPage: AboutPage = {
  id: 0,
  slug: "main",
  heroEyebrow: "About Us",
  heroTitle: "Thoughtful journeys, made by people who know Vietnam.",
  heroImage: "/images/Vietnam/Ha_Long_Bay_2.jpg",
  introEyebrow: "Tour Vietnam",
  introTitle: "We build tours around real places, real timing, and real local care.",
  introBody: defaultIntroBody,
  values: defaultValues,
  featureEyebrow: "How we work",
  featureTitle: "Clear plans, local guides, room for the unexpected.",
  featureBody:
    "We plan the essentials carefully, then leave enough space for the moments that make Vietnam memorable: a slower lunch, a market stop, a better sunset, or a route change when the weather asks for it.",
  featureImage:
    "/images/Vietnam/lanterns-hoi-an-danang-vietnam-travel-solo-main-image-hd-op.jpg",
  updatedAt: new Date(),
}

function withDisplayImageUrls(page: AboutPage): AboutPage {
  return {
    ...page,
    heroImage: getMinioImageUrl(page.heroImage),
    featureImage: getMinioImageUrl(page.featureImage),
  }
}

export function getDefaultAboutPage(): AboutPage {
  return withDisplayImageUrls(defaultAboutPage)
}

export async function getAboutPage(): Promise<AboutPage> {
  const rows = await db
    .select()
    .from(aboutPage)
    .where(eq(aboutPage.slug, "main"))
    .limit(1)

  return rows[0] ? withDisplayImageUrls(rows[0]) : getDefaultAboutPage()
}
