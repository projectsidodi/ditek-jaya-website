"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export function HeroSection() {
  const { t } = useLocale();

  return (
    <section className="relative pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900" />

      {/* Accent pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative section-container py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {t("Authorized Shimadzu Distributor in Indonesia", "Distributor Resmi Shimadzu di Indonesia")}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
            {t("Precision Instruments for", "Instrumen Presisi untuk")}{" "}
            <span className="text-primary">
              {t("Scientific Excellence", "Keunggulan Ilmiah")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-secondary-300 leading-relaxed mb-10 max-w-2xl">
            {t(
              "PT. Ditek Jaya is Indonesia's leading provider of analytical and scientific instruments, serving pharmaceutical, chemical, food, and research industries with world-class solutions.",
              "PT. Ditek Jaya adalah penyedia instrumen analitik dan ilmiah terkemuka di Indonesia, melayani industri farmasi, kimia, makanan, dan penelitian dengan solusi kelas dunia."
            )}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="btn-primary text-base px-8 py-4">
              {t("Browse Products", "Lihat Produk")}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/contact" className="btn-secondary !border-white/20 !text-white hover:!bg-white/10 text-base px-8 py-4">
              {t("Contact Sales", "Hubungi Sales")}
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
            <div>
              <p className="text-2xl md:text-3xl font-heading font-bold text-white">25+</p>
              <p className="text-sm text-secondary-400">{t("Years Experience", "Tahun Pengalaman")}</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-heading font-bold text-white">7</p>
              <p className="text-sm text-secondary-400">{t("Brand Partners", "Mitra Merek")}</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-heading font-bold text-white">1000+</p>
              <p className="text-sm text-secondary-400">{t("Clients Served", "Klien Dilayani")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-primary" />
    </section>
  );
}
