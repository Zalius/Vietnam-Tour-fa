export type HeaderLink = {
  label: string;
  href: string;
};

export type SiteContent = {
  headerLinks: HeaderLink[];
  footerCommerceLabel: string;
  hero: {
    mainImage: string;
    sideImages: { src: string; alt: string; position: "left" | "right" }[];
    tagline: string;
  };
  philosophy: {
    mobileTitle: string;
    mobileBody: string;
    desktopTitle: string;
    firstImage: string;
    firstLabel: string;
    secondImage: string;
    secondLabel: string;
    eyebrow: string;
    body: string;
  };
  featured: {
    title: string;
    intro: string;
    items: { title: string; description: string; image: string }[];
  };
  technology: {
    eyebrow: string;
    title: string;
    body: string;
    words: string[];
    description: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    images: { src: string; alt: string }[];
  };
  editorial: {
    specs: { label: string; value: string }[];
    video: string;
  };
  testimonials: {
    statement: string;
    image: string;
    imageAlt: string;
  };
};

export const defaultSiteContent: SiteContent = {
  headerLinks: [
    { label: "تورها", href: "/tours" },
    { label: "تجربه سفر", href: "/#technology" },
    { label: "گالری", href: "/#gallery" },
    { label: "درباره ما", href: "/about" },
  ],
  footerCommerceLabel: "بازرگانی",
  hero: {
    mainImage: "/images/hero-main.png",
    sideImages: [
      { src: "/images/hero/left1.jpg", alt: "ماجراجویی در کوهستان", position: "left" },
      { src: "/images/hero/left2.jpg", alt: "معبد در ویتنام", position: "left" },
      { src: "/images/hero/right1.jpg", alt: "طبیعت‌گردی در جنگل", position: "right" },
      { src: "/images/hero/right2.jpg", alt: "نمای ساحل", position: "right" },
    ],
    tagline: "سفرهای به‌یادماندنی\nدر سراسر ویتنام.",
  },
  philosophy: {
    mobileTitle: "ویتنام، با ریتمی آرام و حساب‌شده.",
    mobileBody:
      "هر مسیر را با زمان‌بندی طبیعی، شناخت محلی و مکث‌هایی می‌سازیم که یک تور را به خاطره‌ای واقعی تبدیل می‌کنند.",
    desktopTitle: "آرام‌تر سفر کنید. بیشتر ببینید.",
    firstImage: "/images/Vietnam/Ha_Long_Bay_2.jpg",
    firstLabel: "خلیج ها لونگ",
    secondImage: "/images/Vietnam/lanterns-hoi-an-danang-vietnam-travel-solo-main-image-hd-op.jpg",
    secondLabel: "شب‌های هوی آن",
    eyebrow: "نگاه ما به سفر",
    body:
      "سفر خوب فقط مقصد نیست؛ زمان رسیدن، راهنمایی که همراه شماست، و فضایی است که روز برای اتفاق‌های پیش‌بینی‌نشده باقی می‌گذارد.",
  },
  featured: {
    title: "سفر را بر اساس سبک\nدلخواه شما می‌سازیم.",
    intro:
      "برنامه‌ریزی دقیق، جزئیات محلی و انعطاف کافی برای اینکه بهترین بخش‌های ویتنام طبیعی و بی‌دردسر پیش برود.",
    items: [
      {
        title: "مسیرهای اختصاصی متناسب با شما",
        description: "برنامه‌ریزی شخصی",
        image: "/images/Vietnam/photo-1528127269322-539801943592.jpg",
      },
      {
        title: "راهنماهایی که زمان درست را می‌شناسند",
        description: "شناخت محلی",
        image: "/images/Vietnam/Ha_Long_Bay_1.jpg",
      },
      {
        title: "جابجایی روان بین شهرها و مناطق",
        description: "هماهنگی سفر",
        image: "/images/Vietnam/jb-3VK6Urf2vE8-unsplash.jpg",
      },
    ],
  },
  technology: {
    eyebrow: "تجربه سفر",
    title: "مسیرهای محلی، روزهای منعطف.",
    body:
      "تور شما باید روان، شخصی و متصل به همان جاهایی باشد که برای دیدنشان آمده‌اید.",
    words: ["ماجراجویی", "در کنار", "اصالت."],
    description:
      "ویتنام را با مسیرهایی تجربه کنید که بر پایه شناخت محلی، ریتم منعطف و تعادل میان دیدنی‌های مشهور و لحظه‌های خلوت‌تر طراحی شده‌اند.",
  },
  gallery: {
    eyebrow: "گالری",
    title: "لحظه‌هایی از سراسر ویتنام",
    images: [
      { src: "/images/krisztian-tabori-9r2yeRccyls-unsplash.jpg", alt: "منظره سفر در ویتنام" },
      { src: "/images/jet-dela-cruz-8zEwT3vLtbE-unsplash.jpg", alt: "طبیعت کنار دریاچه" },
    ],
  },
  editorial: {
    specs: [
      { label: "مدت سفر", value: "۲ تا ۱۲ روز" },
      { label: "اندازه گروه", value: "۴ تا ۱۶ نفر" },
      { label: "ریتم سفر", value: "آرام تا فعال" },
      { label: "محدوده سفر", value: "شمال تا جنوب ویتنام" },
    ],
    video:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bcdafadc-cb7e-4cb7-9cbf-edcbaf2360a5_1-cNBCz5fomcLRmm1cTXSBOKCq10VP91.mp4",
  },
  testimonials: {
    statement:
      "از آب‌های زمردی ها لونگ تا مسیرهای پنهان ساپا، شناخت محلی را با آسایش دقیق ترکیب می‌کنیم.",
    image: "/images/3d4046a0-b072-4b07-941f-9141ee3ed4a7.png",
    imageAlt: "قله‌های کوهستان در سپیده‌دم",
  },
};
