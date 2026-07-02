import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { ToursSection } from "@/components/sections/tours-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FooterSection } from "@/components/sections/footer-section";
import { getSiteContent } from "@/lib/site-content";

export default async function Home() {
  const content = await getSiteContent()

  return (
    <main className="min-h-screen bg-background">
      <Header links={content.headerLinks} />
      <HeroSection content={content.hero} />
      <PhilosophySection content={content.philosophy} />
      <FeaturedProductsSection />
      <TechnologySection />
      <GallerySection />
      <ToursSection />
      <EditorialSection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
