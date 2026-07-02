"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { defaultSiteContent, type SiteContent } from "@/lib/site-content-defaults";

export function PhilosophySection({
  content = defaultSiteContent.philosophy,
}: {
  content?: SiteContent["philosophy"];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollableRange = Math.max(1, sectionRef.current.offsetHeight - window.innerHeight);
    setProgress(Math.max(0, Math.min(1, -rect.top / scrollableRange)));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress]);

  const alpineTranslateX = (1 - progress) * -100;
  const forestTranslateX = (1 - progress) * 100;
  const titleOpacity = 1 - progress;

  return (
    <section id="products" className="overflow-x-clip bg-background">
      <div className="px-6 py-16 md:hidden">
        <h2 className="text-4xl font-medium leading-tight text-foreground">
          {content.mobileTitle}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          {content.mobileBody}
        </p>
        <div className="mt-8 grid gap-4">
          <ImageCard src={content.firstImage} alt={content.firstLabel} />
          <ImageCard src={content.secondImage} alt={content.secondLabel} />
        </div>
      </div>

      <div ref={sectionRef} className="relative hidden overflow-x-clip md:block" style={{ height: "200vh" }} dir="ltr">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-x-clip">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center" style={{ opacity: titleOpacity }}>
              <h2 className="px-6 text-center text-[12vw] font-medium leading-[0.95] tracking-tighter text-foreground md:text-[10vw] lg:text-[8vw]" dir="rtl">
                {content.desktopTitle}
              </h2>
            </div>

            <div className="relative z-10 grid grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-12 lg:px-20">
              <AnimatedImage src={content.firstImage} alt={content.firstLabel} label={content.firstLabel} translateX={alpineTranslateX} />
              <AnimatedImage src={content.secondImage} alt={content.secondLabel} label={content.secondLabel} translateX={forestTranslateX} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-12 md:px-12 md:py-28 lg:px-20 lg:py-36 lg:pb-14">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {content.eyebrow}
          </p>
          <p className="mt-6 text-center text-xl leading-relaxed text-muted-foreground md:mt-8 md:text-3xl">
            {content.body}
          </p>
        </div>
      </div>
    </section>
  );
}

function ImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
      <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
    </div>
  )
}

function AnimatedImage({ src, alt, label, translateX }: { src: string; alt: string; label: string; translateX: number }) {
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-2xl will-change-transform"
      style={{
        transform: `translate3d(${translateX}%, 0, 0)`,
        WebkitTransform: `translate3d(${translateX}%, 0, 0)`,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        contain: "paint",
      }}
    >
      <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
      <div className="absolute bottom-6 left-6">
        <span className="rounded-full bg-[rgba(255,255,255,0.2)] px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
          {label}
        </span>
      </div>
    </div>
  )
}
