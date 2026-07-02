import { pool } from "@/lib/db";

export type ServiceContent = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  heroImage: string;
  body: string;
  cards: { title: string; body: string }[];
};

export const defaultServiceContents: Record<string, ServiceContent> = {
  commerce: {
    slug: "commerce",
    title: "بازرگانی",
    eyebrow: "بازرگانی در ویتنام",
    intro: "سفر کاری شما، با پشتیبانی محلی و برنامه‌ای روشن.",
    heroImage: "/images/Vietnam/photo-1528127269322-539801943592.jpg",
    body: "اگر هدف شما بررسی بازار، دیدار با تامین‌کننده، حضور در نمایشگاه یا ترکیب سفر کاری با چند روز گردش است، تیم تور ویتنام می‌تواند بخش‌های محلی و اجرایی سفر را هماهنگ کند.",
    cards: [
      {
        title: "هماهنگی بازدیدهای کاری",
        body: "برنامه‌ریزی بازدید از بازارها، تامین‌کنندگان، نمایشگاه‌ها و شهرهای صنعتی با زمان‌بندی دقیق و همراه محلی.",
      },
      {
        title: "پشتیبانی ارتباط محلی",
        body: "کمک در هماهنگی جلسات، رفت‌وآمد شهری، آماده‌سازی اطلاعات و ترجمه مقدماتی بر اساس نیاز سفر.",
      },
      {
        title: "ترکیب کار و گردش",
        body: "طراحی برنامه‌ای که کنار اهداف کاری، زمان کافی برای شناخت ویتنام، غذا، فرهنگ و طبیعت هم داشته باشد.",
      },
    ],
  },
  "travel-insurance": {
    slug: "travel-insurance",
    title: "بیمه سفر",
    eyebrow: "آمادگی سفر",
    intro: "برای سفر به ویتنام، داشتن بیمه سفر معتبر خیال شما را آسوده‌تر می‌کند.",
    heroImage: "/images/Vietnam/Ha_Long_Bay_2.jpg",
    body: "بیمه مناسب می‌تواند بخشی از ریسک‌های درمان، تاخیر پرواز، گم شدن بار یا لغو سفر را پوشش دهد. پیش از خرید بیمه، مسیر و فعالیت‌های تور را با دقت بررسی کنید.",
    cards: [
      {
        title: "پوشش پیشنهادی",
        body: "درمان خارج از کشور، حوادث، انتقال پزشکی، لغو سفر، تاخیر پرواز و گم شدن بار از پوشش‌های مهم هستند.",
      },
      {
        title: "فعالیت‌های خاص",
        body: "اگر تور شما شامل غارنوردی، ترکینگ، قایق‌سواری یا فعالیت‌های ماجراجویانه است، مطمئن شوید بیمه آن‌ها را مستثنا نکرده باشد.",
      },
      {
        title: "مسئولیت مسافر",
        body: "تهیه بیمه مناسب بر عهده مسافر است، اما تیم ما می‌تواند پیش از سفر درباره نوع پوشش‌های مورد نیاز راهنمایی کلی ارائه کند.",
      },
    ],
  },
  cancellation: {
    slug: "cancellation",
    title: "لغو سفر",
    eyebrow: "تغییر برنامه",
    intro: "اگر مجبور به لغو یا تغییر تاریخ سفر شدید، هرچه زودتر با ادمین‌ها هماهنگ کنید.",
    heroImage: "/images/Vietnam/jb-3VK6Urf2vE8-unsplash.jpg",
    body: "شرایط لغو به زمان اعلام، خدمات رزرو شده و قوانین تامین‌کنندگان محلی بستگی دارد. تاریخ و ساعت دریافت پیام لغو، مبنای بررسی شرایط خواهد بود.",
    cards: [
      {
        title: "درخواست لغو",
        body: "لغو سفر باید از همان کانالی اعلام شود که رزرو از طریق آن هماهنگ شده است.",
      },
      {
        title: "هزینه‌های غیرقابل بازگشت",
        body: "برخی هتل‌ها، بلیت‌ها، کشتی‌ها، مجوزها یا خدمات از پیش پرداخت‌شده ممکن است قابل بازگشت نباشند.",
      },
      {
        title: "تغییر تاریخ",
        body: "در بسیاری از موارد تغییر تاریخ بهتر از لغو کامل است و به ظرفیت تامین‌کنندگان محلی و فصل سفر بستگی دارد.",
      },
    ],
  },
  "booking-terms": {
    slug: "booking-terms",
    title: "شرایط رزرو",
    eyebrow: "قبل از رزرو",
    intro: "رزرو نهایی هیچ توری بدون صحبت مستقیم با ادمین‌ها انجام نمی‌شود.",
    heroImage: "/images/Vietnam/lanterns-hoi-an-danang-vietnam-travel-solo-main-image-hd-op.jpg",
    body: "قبل از هر پرداختی باید تاریخ، ظرفیت، مسیر، قیمت نهایی و شرایط پرداخت با شما هماهنگ شود. پرداخت فقط پس از تایید مستقیم ادمین معتبر است.",
    cards: [
      {
        title: "مراحل رزرو",
        body: "تور یا مسیر دلخواه را انتخاب می‌کنید، با ادمین هماهنگ می‌کنید، برنامه و قیمت نهایی را دریافت می‌کنید و سپس پرداخت طبق توافق انجام می‌شود.",
      },
      {
        title: "اطلاعات لازم",
        body: "تاریخ سفر، تعداد نفرات، شهر ورود و خروج، سطح هتل دلخواه، محدودیت غذایی و نوع تجربه مورد نظر را آماده کنید.",
      },
      {
        title: "تایید نهایی",
        body: "فقط پیام تایید نهایی ادمین و رسید پرداخت معتبر، رزرو شما را قطعی می‌کند.",
      },
    ],
  },
  faq: {
    slug: "faq",
    title: "پرسش‌های رایج",
    eyebrow: "راهنمای سریع",
    intro: "پاسخ کوتاه به سوالاتی که معمولا پیش از انتخاب و رزرو تورهای ویتنام پرسیده می‌شود.",
    heroImage: "/images/Vietnam/te.jpg",
    body: "در این بخش می‌توانید پاسخ سوال‌های رایج درباره رزرو، برنامه سفر، پرداخت، راهنماها و خدمات تور ویتنام را ببینید.",
    cards: [
      {
        title: "تورهای شما خصوصی هستند یا گروهی؟",
        body: "بیشتر برنامه‌ها به صورت خصوصی یا گروه‌های کوچک اجرا می‌شوند. هنگام رزرو، نوع سفر و تعداد نفرات بررسی می‌شود.",
      },
      {
        title: "آیا مسیر سفر قابل تغییر است؟",
        body: "بله. بسیاری از مسیرها بر اساس تاریخ سفر، بودجه، علایق، شهر ورود و خروج و سطح فعالیت شما قابل تغییر هستند.",
      },
      {
        title: "برای رزرو باید آنلاین پرداخت کنم؟",
        body: "قبل از هر پرداختی باید با ادمین‌ها صحبت کنید تا ظرفیت، تاریخ، مسیر و هزینه نهایی تایید شود.",
      },
      {
        title: "راهنمای فارسی‌زبان دارید؟",
        body: "امکان هماهنگی راهنمای فارسی‌زبان یا راهنمای محلی انگلیسی‌زبان بسته به شهر، تاریخ و نوع برنامه بررسی می‌شود.",
      },
    ],
  },
};

export async function ensureServiceContentTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS service_content (
      slug text PRIMARY KEY,
      content jsonb NOT NULL,
      updated_at timestamp DEFAULT now() NOT NULL
    )
  `);
}

export async function getServiceContent(slug: string): Promise<ServiceContent> {
  const fallback = defaultServiceContents[slug] ?? defaultServiceContents.faq;
  try {
    await ensureServiceContentTable();
    const result = await pool.query(
      "SELECT content FROM service_content WHERE slug = $1 LIMIT 1",
      [slug],
    );
    return result.rows[0]?.content
      ? { ...fallback, ...result.rows[0].content }
      : fallback;
  } catch {
    return fallback;
  }
}

export async function saveServiceContent(content: ServiceContent) {
  await ensureServiceContentTable();
  await pool.query(
    `
      INSERT INTO service_content (slug, content, updated_at)
      VALUES ($1, $2::jsonb, now())
      ON CONFLICT (slug) DO UPDATE SET content = EXCLUDED.content, updated_at = now()
    `,
    [content.slug, JSON.stringify(content)],
  );
}
