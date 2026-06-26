"use client";

import { FadeImage } from "@/components/fade-image";

const features = [
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
  {
    title: "غذا، بازارها و زندگی روزمره",
    description: "ویتنام واقعی",
    image: "/images/Vietnam/photo-1559592413-7cec4d0cae2b.jpg",
  },
  {
    title: "طبیعت‌گردی فراتر از کارت‌پستال‌ها",
    description: "فرار به طبیعت",
    image: "/images/Vietnam/te.jpg",
  },
  {
    title: "پشتیبانی منعطف پیش از رسیدن شما",
    description: "همراهی سفر",
    image: "/images/Vietnam/lanterns-hoi-an-danang-vietnam-travel-solo-main-image-hd-op.jpg",
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="technology" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          سفر را بر اساس سبک
          <br />
          دلخواه شما می‌سازیم.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
          برنامه‌ریزی دقیق، جزئیات محلی و انعطاف کافی برای اینکه بهترین بخش‌های
          ویتنام طبیعی و بی‌دردسر پیش برود.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-4 px-6 pb-20 md:grid-cols-3 md:px-12 lg:px-20">
        {features.map((feature) => (
          <div key={feature.title} className="group">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <FadeImage
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="py-6">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                {feature.description}
              </p>
              <h3 className="text-foreground text-xl font-semibold">
                {feature.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Link */}
      <div className="flex justify-center px-6 pb-28 md:px-12 lg:px-20">
        
      </div>
    </section>
  );
}
