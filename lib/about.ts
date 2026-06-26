import { db } from "@/lib/db"
import { aboutPage, type AboutPage, type AboutValue } from "@/lib/db/schema"
import { getMinioImageUrl } from "@/lib/minio"
import { eq } from "drizzle-orm"

const defaultIntroBody = [
  "تور ویتنام سفرهای اختصاصی و گروهی کوچک را در سراسر کشور طراحی می‌کند؛ از خلیج ها لونگ و نین بین تا ساپا، هوی آن، هوئه، دا نانگ، شهر هوشی‌مین و دلتای مکونگ.",
  "کار ما ساده است: بفهمیم چه نوع سفری می‌خواهید، مسیر و راهنمای مناسب را برایتان انتخاب کنیم و جزئیات را پیش از رسیدن شما روشن و دقیق نگه داریم. نتیجه باید روان، شخصی و ریشه‌دار در همان جاهایی باشد که برای دیدنشان آمده‌اید.",
]

const defaultValues: AboutValue[] = [
  {
    title: "شناخت محلی",
    body: "مسیرها با کمک راهنماهایی شکل می‌گیرند که ریتم هر منطقه را می‌شناسند؛ از ساعت‌های خلوت بازارها تا چشم‌اندازهای آرام پس از رفتن جمعیت.",
  },
  {
    title: "سفرهای منعطف",
    body: "هر تور می‌تواند با سرعت حرکت، علایق، تاریخ سفر و نوع تجربه‌ای که از ویتنام می‌خواهید هماهنگ شود.",
  },
  {
    title: "سفر مسئولانه",
    body: "هرجا که کیفیت سفر را واقعی‌تر کند، با همکاران محلی، اقامتگاه‌های خانوادگی و تجربه‌های جامعه‌محور کار می‌کنیم.",
  },
]

const defaultAboutPage: AboutPage = {
  id: 0,
  slug: "main",
  heroEyebrow: "درباره ما",
  heroTitle: "سفرهایی فکرشده، ساخته‌شده توسط کسانی که ویتنام را می‌شناسند.",
  heroImage: "/images/Vietnam/Ha_Long_Bay_2.jpg",
  introEyebrow: "تور ویتنام",
  introTitle: "ما تورها را بر اساس مکان‌های واقعی، زمان‌بندی درست و مراقبت محلی می‌سازیم.",
  introBody: defaultIntroBody,
  values: defaultValues,
  featureEyebrow: "شیوه کار ما",
  featureTitle: "برنامه‌های روشن، راهنماهای محلی و فضای کافی برای اتفاق‌های خوب.",
  featureBody:
    "ما بخش‌های ضروری سفر را دقیق برنامه‌ریزی می‌کنیم و در عین حال برای لحظه‌هایی که ویتنام را ماندگار می‌کنند جا می‌گذاریم: ناهاری آرام‌تر، توقفی در بازار، غروبی بهتر یا تغییر مسیر وقتی هوا چنین می‌خواهد.",
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
