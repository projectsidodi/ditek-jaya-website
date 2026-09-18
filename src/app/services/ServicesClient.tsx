"use client";

import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import type { Service } from "@/types";

interface Props {
  services: Service[];
}

export function ServicesClient({ services }: Props) {
  const { locale, t } = useLocale();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900 py-20">
        <div className="section-container text-center">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">
            {t("Our Services", "Layanan Kami")}
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {t("Service & Support", "Layanan & Dukungan")}
          </h1>
          <p className="text-secondary-300 max-w-2xl mx-auto text-lg">
            {t(
              "Our certified Shimadzu engineers provide end-to-end support to keep your instruments performing at their best.",
              "Insinyur Shimadzu bersertifikat kami memberikan dukungan menyeluruh untuk menjaga instrumen Anda tetap berkinerja terbaik."
            )}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-surface">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => {
              const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[service.icon] || Icons.Wrench;
              const features = locale === "en" ? service.features : service.featuresId;

              return (
                <div
                  key={service.id}
                  className="card p-8 group hover:border-cta/30 transition-all duration-200"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-200">
                      <IconComponent className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-200" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-xl text-primary mb-3">
                        {locale === "en" ? service.title : service.titleId}
                      </h3>
                      <p className="text-text-secondary mb-5 leading-relaxed">
                        {locale === "en" ? service.description : service.descriptionId}
                      </p>
                      <ul className="space-y-2">
                        {features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">
            {t("Need Service Support?", "Butuh Dukungan Layanan?")}
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mb-8">
            {t(
              "Contact our service team to schedule maintenance, request training, or get technical support.",
              "Hubungi tim layanan kami untuk menjadwalkan pemeliharaan, meminta pelatihan, atau mendapatkan dukungan teknis."
            )}
          </p>
          <Link href="/contact" className="btn-primary gap-2">
            {t("Contact Service Team", "Hubungi Tim Layanan")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
