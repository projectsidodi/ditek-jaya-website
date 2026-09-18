"use client";

import React from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { Award, Users, Building2, Calendar } from "lucide-react";

export function StatsSection() {
  const { t } = useLocale();

  const stats = [
    {
      icon: Calendar,
      value: "1974",
      label: t("Established", "Didirikan"),
      desc: t("Over 50 years of excellence", "Lebih dari 50 tahun keunggulan"),
    },
    {
      icon: Award,
      value: "7+",
      label: t("Brand Partners", "Mitra Merek"),
      desc: t("World-class manufacturers", "Produsen kelas dunia"),
    },
    {
      icon: Users,
      value: "1000+",
      label: t("Clients", "Klien"),
      desc: t("Across Indonesia", "Di seluruh Indonesia"),
    },
    {
      icon: Building2,
      value: "5",
      label: t("Branch Offices", "Kantor Cabang"),
      desc: t("Nationwide support", "Dukungan nasional"),
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-surface-border">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-3xl font-heading font-bold text-secondary">{stat.value}</p>
                <p className="text-sm font-medium text-text mt-1">{stat.label}</p>
                <p className="text-xs text-text-muted mt-0.5">{stat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
