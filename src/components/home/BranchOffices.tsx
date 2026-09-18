"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import type { Branch } from "@/types";

interface Props {
  branches: Branch[];
}

export function BranchOffices({ branches }: Props) {
  const { t } = useLocale();

  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-2">
            {t("Our Locations", "Lokasi Kami")}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary">
            {t("Branch Offices", "Kantor Cabang")}
          </h2>
          <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
            {t(
              "With offices across Indonesia, we're always close to our customers.",
              "Dengan kantor di seluruh Indonesia, kami selalu dekat dengan pelanggan."
            )}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className={`card p-6 ${branch.isHeadOffice ? "border-primary/30 ring-1 ring-primary/10" : ""}`}
            >
              {branch.isHeadOffice && (
                <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-3">
                  {t("Head Office", "Kantor Pusat")}
                </span>
              )}
              <h3 className="font-heading font-semibold text-secondary mb-3">{branch.city}</h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {branch.address}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  {branch.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  {branch.email}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/contact" className="btn-secondary">
            {t("Contact Us", "Hubungi Kami")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
