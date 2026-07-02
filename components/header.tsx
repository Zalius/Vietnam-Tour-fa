"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { HeaderLink } from "@/lib/site-content-defaults";

const defaultLinks: HeaderLink[] = [
  { label: "تورها", href: "/tours" },
  { label: "تجربه سفر", href: "/#technology" },
  { label: "گالری", href: "/#gallery" },
  { label: "درباره ما", href: "/about" },
];

export function Header({ links = defaultLinks }: { links?: HeaderLink[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textClass = isScrolled
    ? "text-muted-foreground hover:text-foreground"
    : "text-white/75 hover:text-white";

  return (
    <header
      className={`fixed left-1/2 top-4 z-50 w-[90%] max-w-3xl -translate-x-1/2 transition-all duration-300 ${
        isScrolled ? "rounded-full bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
      style={{
        boxShadow: isScrolled
          ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"
          : "none",
      }}
    >
      <div className="flex items-center justify-between px-2 py-2 pl-5 transition-all duration-300">
        <Link
          href="/"
          className="flex h-11 items-center rounded-full px-3 transition-transform hover:scale-[1.02]"
          aria-label="تور ویتنام"
        >
          <Image
            src="/images/logo.png"
            alt="Tour Vietnam"
            width={132}
            height={40}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              className={`text-sm transition-colors ${textClass}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/tours"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isScrolled
                ? "bg-foreground text-background hover:opacity-80"
                : "bg-white text-foreground hover:bg-white/90"
            }`}
          >
            مشاهده تورها
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          className={`transition-colors md:hidden ${
            isScrolled ? "text-foreground" : "text-white"
          }`}
          aria-label="باز و بسته کردن منو"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="rounded-b-2xl border-t border-border bg-background px-6 py-8 md:hidden">
          <nav className="flex flex-col gap-6">
            {links.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="text-lg text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/tours"
              className="mt-4 rounded-full bg-foreground px-5 py-3 text-center text-sm font-medium text-background"
              onClick={() => setIsMenuOpen(false)}
            >
              مشاهده تورها
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
