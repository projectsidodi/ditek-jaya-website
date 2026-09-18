"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Tags, Package } from "lucide-react";
import type { Brand, BrandSubCategory, Product } from "@/types";

function t(en: string, id?: string) {
  void id; return en;
}

const countryFlags: Record<string, string> = {
  Japan: "🇯🇵",
  Germany: "🇩🇪",
  China: "🇨🇳",
  "South Korea": "🇰🇷",
  Netherlands: "🇳🇱",
};

interface Props {
  brands: Brand[];
  subCategories: BrandSubCategory[];
  products: Product[];
}

export function BrandPartner({ brands, subCategories, products }: Props) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            {t("Our Brand Partners", "Mitra Merek Kami")}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            {t(
              "We partner with world-leading manufacturers to bring the best analytical and laboratory instruments to Indonesia.",
              "Kami bermitra dengan produsen terkemuka dunia untuk menghadirkan instrumen analitik dan laboratorium terbaik ke Indonesia."
            )}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands
            .filter((b) => b.featured)
            .map((brand) => {
              const flag = countryFlags[brand.country] || "🌍";
              const subCount = subCategories.filter(
                (sc) => sc.brandId === brand.id
              ).length;
              const prodCount = products.filter(
                (p) => p.brandId === brand.id
              ).length;
              return (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  className="group bg-surface rounded-xl border border-surface-border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{flag}</span>
                    <div>
                      <h3 className="font-heading font-bold text-secondary group-hover:text-primary transition-colors duration-200">
                        {brand.name}
                      </h3>
                      <span className="text-xs text-text-muted">
                        {brand.country}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
                    <span className="flex items-center gap-1">
                      <Tags className="w-3.5 h-3.5" />
                      {subCount} {t("sub-categories", "sub-kategori")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-3.5 h-3.5" />
                      {prodCount} {t("products", "produk")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-primary text-sm font-medium">
                    {t("Explore", "Jelajahi")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              );
            })}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 btn-ghost text-sm"
          >
            {t("View All Products", "Lihat Semua Produk")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
