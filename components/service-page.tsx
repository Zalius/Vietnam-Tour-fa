import Image from "next/image";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import type { ReactNode } from "react";

export function ServicePage({
  eyebrow,
  title,
  intro,
  heroImage,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage?: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="relative flex min-h-[62vh] items-end overflow-hidden px-6 pb-14 pt-36 text-white md:px-12 md:pb-20 lg:px-20">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-widest text-white/70">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-white/80 md:text-lg">
            {intro}
          </p>
        </div>
      </section>
      <section className="px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto max-w-5xl">{children}</div>
      </section>
      <FooterSection />
    </main>
  );
}

export function InfoGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>;
}

export function InfoCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="text-xl font-medium text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
