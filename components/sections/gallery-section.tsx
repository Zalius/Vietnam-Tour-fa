"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

export function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState("100vh");
  const [translateX, setTranslateX] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastScrollRef = useRef(0);

  const images = [
    { src: "/images/krisztian-tabori-9r2yeRccyls-unsplash.jpg", alt: "Thermal bottle on bike" },
    { src: "/images/jet-dela-cruz-8zEwT3vLtbE-unsplash.jpg", alt: "Thermal bottle by lake" },
    { src: "/images/ha-link-XbLH0Szpj6k-unsplash.jpg", alt: "Thermal bottle at canyon" },
    { src: "/images/norbert-braun-FKeo_AXNpKs-unsplash.jpg", alt: "Thermal bottle in water" },
    { src: "/images/georgios-domouchtsidis-UtbUQWxElVs-unsplash.jpg", alt: "Thermal bottle by stream" },
    { src: "/images/andrew-svk-yk3APr19I5E-unsplash.jpg", alt: "Thermal bottle by fire" },
    { src: "/images/ruslan-bardash-8MhejqEghLk-unsplash.jpg", alt: "Thermal bottle in snow" },
    { src: "/images/quang-huy-nguy-n-0IWdZYHRQ6U-unsplash.jpg", alt: "Thermal bottle on mountain" },
    
  ];

  // Calculate section height based on content width
  useEffect(() => {
    const calculateHeight = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      // Height = viewport height + the extra scroll needed to reveal all content
      const totalHeight = viewportHeight + (containerWidth - viewportWidth);
      setSectionHeight(`${totalHeight}px`);
    };

    // Small delay to ensure container is rendered
    const timer = setTimeout(calculateHeight, 100);
    window.addEventListener("resize", calculateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  const updateTransform = useCallback(() => {
    if (!galleryRef.current || !containerRef.current) return;
    
    const rect = galleryRef.current.getBoundingClientRect();
    const containerWidth = containerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    // Total scroll distance needed to reveal all images
    const totalScrollDistance = containerWidth - viewportWidth;
    
    // Current scroll position within this section
    const scrolled = Math.max(0, -rect.top);
    
    // Progress from 0 to 1
    const progress = Math.min(1, scrolled / totalScrollDistance);
    
    // Calculate new translateX
    const newTranslateX = progress * -totalScrollDistance;
    
    setTranslateX(newTranslateX);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(updateTransform);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransform]);

  return (
    <div id="gallery">
      <section className="bg-background py-16 md:hidden">
        <div className="mb-8 px-6">
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            Gallery
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-foreground">
            Moments from across Vietnam
          </h2>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-[62vh] w-[78vw] flex-shrink-0 snap-center overflow-hidden rounded-2xl bg-secondary"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index < 2}
              />
            </div>
          ))}
        </div>
      </section>

      <section 
        ref={galleryRef}
        className="relative hidden bg-background md:block"
        style={{ height: sectionHeight }}
      >
        {/* Sticky container */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="flex h-full items-center">
            {/* Horizontal scrolling container */}
            <div 
              ref={containerRef}
              className="flex gap-6 px-6"
              style={{
                transform: `translate3d(${translateX}px, 0, 0)`,
                WebkitTransform: `translate3d(${translateX}px, 0, 0)`,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                perspective: 1000,
                WebkitPerspective: 1000,
                touchAction: 'pan-y',
              }}
            >
              {images.map((image, index) => (
              <div
                key={index}
                className="relative h-[70vh] w-[85vw] flex-shrink-0 overflow-hidden rounded-2xl md:w-[60vw] lg:w-[45vw]"
                style={{
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index < 3}
                />
              </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
