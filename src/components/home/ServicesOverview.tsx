"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import type { Service } from "@/types";

interface Props {
  services: Service[];
}

const iconMap: Record<string, string> = {
  "wrench": "🔧",
  "shield": "🛡️",
  "graduation-cap": "🎓",
  "flask": "🧪",
  "microscope": "🔬",
  "cog": "⚙️",
};

export function ServicesOverview({ services }: Props) {
  const { locale, t } = useLocale();

  return (
    <section className="py-20 bg-surface">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-2">
            {t("What We Offer", "Apa Yang Kami Tawarkan")}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary">
            {t("Our Services", "Layanan Kami")}
          </h2>
          <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
            {t(
              "Comprehensive support from installation to maintenance, ensuring your instruments perform at their best.",
              "Dukungan komprehensif dari instalasi hingga perawatan, memastikan instrumen Anda berkinerja terbaik."
            )}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="card p-6 hover:border-primary/30 transition-all duration-200">
              <div className="text-3xl mb-4">{iconMap[service.icon] || "⚙️"}</div>
              <h3 className="font-heading font-semibold text-secondary mb-2">
                {locale === "en" ? service.title : service.titleId}
              </h3>
              <p className="text-text-secondary text-sm line-clamp-3">
                {locale === "en" ? service.description : service.descriptionId}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/services" className="btn-primary">
            {t("View All Services", "Lihat Semua Layanan")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
