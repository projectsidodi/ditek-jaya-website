"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Beaker,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export function Footer() {
  const pathname = usePathname();
  const { t } = useLocale();

  if (pathname?.startsWith("/admin")) return null;

  const quickLinks = [
    { href: "/about", label: t("About Us", "Tentang Kami") },
    { href: "/products", label: t("Products", "Produk") },
    { href: "/services", label: t("Services", "Layanan") },
    { href: "/news", label: t("News", "Berita") },
    { href: "/contact", label: t("Contact", "Kontak") },
  ];

  const productLinks = [
    { href: "/products?cat=Chromatography", label: t("Chromatography", "Kromatografi") },
    { href: "/products?cat=Mass Spectrometry", label: t("Mass Spectrometry", "Spektrometri Massa") },
    { href: "/products?cat=Spectroscopy", label: t("Spectroscopy", "Spektroskopi") },
    { href: "/products?cat=Life Science", label: t("Life Science", "Ilmu Hayati") },
    { href: "/products?cat=Balances", label: t("Balances & Scales", "Timbangan & Neraca") },
  ];

  return (
    <footer className="bg-secondary text-white" role="contentinfo">
      {/* CTA Banner */}
      <div className="bg-primary">
        <div className="section-container py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-2xl font-bold text-white">
              {t(
                "Ready to elevate your laboratory?",
                "Siap meningkatkan laboratorium Anda?"
              )}
            </h3>
            <p className="text-white/90 mt-1">
              {t(
                "Contact our team for expert consultation and product demonstrations.",
                "Hubungi tim kami untuk konsultasi ahli dan demonstrasi produk."
              )}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-heading font-bold rounded-lg hover:bg-surface-muted transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            {t("Get in Touch", "Hubungi Kami")}
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Beaker className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-lg">PT. Ditek Jaya</span>
            </Link>
            <p className="mt-4 text-secondary-400 text-sm leading-relaxed">
              {t(
                "Indonesia's largest supplier of analytical and measuring instruments. Sole Shimadzu distributor since 1974.",
                "Pemasok terbesar instrumen analitik dan pengukuran di Indonesia. Distributor tunggal Shimadzu sejak 1974."
              )}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="px-3 py-1.5 bg-white/10 rounded-md text-xs font-medium">
                Shimadzu Authorized
              </div>
              <div className="px-3 py-1.5 bg-white/10 rounded-md text-xs font-medium">
                {t("Est. 1974", "Berdiri 1974")}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-6">
              {t("Quick Links", "Tautan Cepat")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-6">
              {t("Products", "Produk")}
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-6">
              {t("Head Office", "Kantor Pusat")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-secondary-400 text-sm">
                  Kedoya Elok Plaza, Jl. Panjang No.5, Jakarta Barat 11520
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:+62215803388"
                  className="text-secondary-400 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                >
                  +62 21 5803388
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:info@ditekjaya.co.id"
                  className="text-secondary-400 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                >
                  info@ditekjaya.co.id
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="section-container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-secondary-500 text-sm">
            &copy; {new Date().getFullYear()} PT. Ditek Jaya. {t("All rights reserved.", "Hak cipta dilindungi.")}
          </p>
          <div className="flex items-center gap-6 text-secondary-500 text-sm">
            <Link href="/admin" className="hover:text-white transition-colors duration-200 cursor-pointer">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
