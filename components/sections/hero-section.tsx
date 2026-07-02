"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { defaultSiteContent, type SiteContent } from "@/lib/site-content-defaults";

export function HeroSection({
  content = defaultSiteContent.hero,
}: {
  content?: SiteContent["hero"];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (window.innerHeight * 2)));
      setScrollProgress(progress);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const textOpacity = Math.max(0, 1 - scrollProgress / 0.2);
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  const centerWidth = isMobile ? 100 - imageProgress * 46 : 100 - imageProgress * 58;
  const centerHeight = isMobile ? 100 - imageProgress * 28 : 100 - imageProgress * 30;
  const sideWidth = isMobile ? imageProgress * 21 : imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + imageProgress * 100;
  const sideTranslateRight = 100 - imageProgress * 100;
  const borderRadius = imageProgress * (isMobile ? 18 : 24);
  const gap = imageProgress * (isMobile ? 10 : 16);
  const sideTranslateY = isMobile ? 0 : -(imageProgress * 15);
  const sideCardHeight = `${26 + imageProgress * 5}vh`;

  return (
    <section ref={sectionRef} className="relative bg-background" dir="ltr">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{
              gap: `${gap}px`,
              padding: `${imageProgress * (isMobile ? 10 : 16)}px`,
              paddingBottom: `${isMobile ? 40 + imageProgress * 24 : 60 + imageProgress * 40}px`,
            }}
          >
            <HeroSideColumn
              images={content.sideImages.filter((img) => img.position === "left")}
              width={sideWidth}
              gap={gap}
              opacity={sideOpacity}
              translateX={sideTranslateLeft}
              translateY={sideTranslateY}
              isMobile={isMobile}
              cardHeight={sideCardHeight}
              borderRadius={borderRadius}
            />

            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src={content.mainImage || "/placeholder.svg"}
                alt="چشم‌انداز ویتنام"
                fill
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-32 w-32 overflow-hidden md:h-40 md:w-40">
                <div className="absolute left-[-48px] top-8 flex h-11 w-52 -rotate-45 items-center justify-center bg-[#f6b15c] text-center font-black uppercase leading-none text-[#3d1d16] shadow-[0_8px_0_rgba(105,45,31,0.32)] ring-1 ring-[#3d1d16]/20 md:left-[-58px] md:top-10 md:h-14 md:w-64">
                  <div className="absolute inset-x-3 top-1 border-t border-[#3d1d16]/50" />
                  <div className="absolute inset-x-3 bottom-1 border-b border-[#3d1d16]/50" />
                  <span className="mx-2 text-[10px] text-[#3d1d16]/90 md:text-xs">★</span>
                  <span className="tracking-[0.12em] [text-shadow:0_1px_0_rgba(255,255,255,0.28)]">
                    <span className="block text-[12px] md:text-[15px]">FREE</span>
                    <span className="block text-[12px] md:text-[15px]">DRINK</span>
                  </span>
                  <span className="mx-2 text-[10px] text-[#3d1d16]/90 md:text-xs">★</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/5" style={{ opacity: textOpacity }} />
            </div>

            <HeroSideColumn
              images={content.sideImages.filter((img) => img.position === "right")}
              width={sideWidth}
              gap={gap}
              opacity={sideOpacity}
              translateX={sideTranslateRight}
              translateY={sideTranslateY}
              isMobile={isMobile}
              cardHeight={sideCardHeight}
              borderRadius={borderRadius}
            />
          </div>
        </div>
      </div>

      <div className="h-[200vh]" />

      <div className="px-6 pt-32 pb-28 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44" dir="rtl">
        <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          {content.tagline.split("\n").map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

function HeroSideColumn({
  images,
  width,
  gap,
  opacity,
  translateX,
  translateY,
  isMobile,
  cardHeight,
  borderRadius,
}: {
  images: SiteContent["hero"]["sideImages"];
  width: number;
  gap: number;
  opacity: number;
  translateX: number;
  translateY: number;
  isMobile: boolean;
  cardHeight: string;
  borderRadius: number;
}) {
  return (
    <div
      className="flex flex-col justify-center will-change-transform"
      style={{
        width: `${width}%`,
        gap: `${gap}px`,
        transform: `translateX(${translateX}%) translateY(${translateY}%)`,
        opacity,
      }}
    >
      {images.map((img, idx) => (
        <div
          key={`${img.src}-${idx}`}
          className="relative overflow-hidden will-change-transform"
          style={{
            flex: isMobile ? "0 0 auto" : 1,
            height: isMobile ? cardHeight : undefined,
            borderRadius: `${borderRadius}px`,
          }}
        >
          <Image
            src={img.src || "/placeholder.svg"}
            alt={img.alt}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
