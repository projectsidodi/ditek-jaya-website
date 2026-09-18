"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Beaker, ChevronDown } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const navLinks = [
  { href: "/", labelEn: "Home", labelId: "Beranda" },
  { href: "/products", labelEn: "Products", labelId: "Produk" },
  { href: "/services", labelEn: "Services", labelId: "Layanan" },
  { href: "/news", labelEn: "News", labelId: "Berita" },
  { href: "/about", labelEn: "About", labelId: "Tentang" },
  { href: "/contact", labelEn: "Contact", labelId: "Kontak" },
];

export function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-surface-border"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Beaker className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-heading font-bold text-secondary text-base">PT. Ditek Jaya</span>
              <span className="hidden sm:block text-[10px] text-text-muted leading-none mt-0.5">
                Scientific Instruments
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive(link.href)
                    ? "text-primary bg-primary-50 font-semibold"
                    : "text-text-secondary hover:text-primary hover:bg-primary-50/50"
                }`}
              >
                {locale === "en" ? link.labelEn : link.labelId}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setLocale(locale === "en" ? "id" : "en")}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary hover:text-primary rounded-lg hover:bg-primary-50/50 transition-all duration-200 cursor-pointer"
            >
              {locale === "en" ? "🇬🇧" : "🇮🇩"}
              <span className="font-medium">{locale === "en" ? "EN" : "ID"}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <Link href="/contact" className="btn-primary text-sm px-5 py-2.5">
              {t("Get a Quote", "Minta Penawaran")}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-surface-muted transition-colors duration-200 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-surface-border shadow-lg">
          <div className="section-container py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive(link.href)
                    ? "text-primary bg-primary-50 font-semibold"
                    : "text-text-secondary hover:text-primary hover:bg-primary-50/50"
                }`}
              >
                {locale === "en" ? link.labelEn : link.labelId}
              </Link>
            ))}
            <div className="flex items-center gap-3 px-4 pt-3 border-t border-surface-border mt-2">
              <button
                onClick={() => setLocale(locale === "en" ? "id" : "en")}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary hover:text-primary rounded-lg hover:bg-surface-muted transition-all duration-200 cursor-pointer"
              >
                {locale === "en" ? "🇬🇧 EN" : "🇮🇩 ID"}
              </button>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary text-sm flex-1 justify-center">
                {t("Get a Quote", "Minta Penawaran")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
