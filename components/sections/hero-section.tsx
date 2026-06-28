"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const word = "تور ویتنام";

const sideImages = [
  {
    src: "/images/hero/left1.jpg",
    alt: "ماجراجویی در کوهستان",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero/left2.jpg",
    alt: "معبد در ویتنام",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero/right1.jpg",
    alt: "طبیعت‌گردی در جنگل",
    position: "right",
    span: 1,
  },
  {
    src: "/images/hero/right2.jpg",
    alt: "نمای ساحل",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

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

  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));

  const centerWidth = isMobile
    ? 100 - imageProgress * 46
    : 100 - imageProgress * 58;
  const centerHeight = isMobile
    ? 100 - imageProgress * 28
    : 100 - imageProgress * 30;
  const sideWidth = isMobile ? imageProgress * 21 : imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100);
  const sideTranslateRight = 100 - (imageProgress * 100);
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
            <div
              className="flex flex-col justify-center will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter((img) => img.position === "left").map((img, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: isMobile ? "0 0 auto" : img.span,
                    height: isMobile ? sideCardHeight : undefined,
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
                src="/images/hero-main.png"
                alt="چشم‌انداز کوهستانی ویتنام"
                fill
                className="object-cover"
                priority
              />

              <div
                className="absolute inset-0 flex items-end overflow-hidden"
                style={{ opacity: textOpacity }}
              >
                <h1
                  className="w-full animate-[slideUp_0.8s_ease-out_forwards] px-4 text-right text-[14vw] font-medium leading-[0.86] text-white opacity-0 md:text-[13vw]"
                  dir="rtl"
                >
                  {word}
                </h1>
              </div>
            </div>

            <div
              className="flex flex-col justify-center will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter((img) => img.position === "right").map((img, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: isMobile ? "0 0 auto" : img.span,
                    height: isMobile ? sideCardHeight : undefined,
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
          </div>
        </div>
      </div>

      <div className="h-[200vh]" />

      <div className="px-6 pt-32 pb-28 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44" dir="rtl">
        <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          سفرهای به‌یادماندنی
          <br />
          در سراسر ویتنام.
        </p>
      </div>
    </section>
  );
}
