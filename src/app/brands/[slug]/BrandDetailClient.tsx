"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Globe,
  MapPin,
  ExternalLink,
  Package,
  Tags,
} from "lucide-react";
import type { Brand, Product, BrandSubCategory } from "@/types";

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
  brand: Brand;
  products: Product[];
  subCategories: BrandSubCategory[];
}

export function BrandDetailClient({ brand, products, subCategories }: Props) {
  const flag = countryFlags[brand.country] || "🌍";

  // Group products by sub-category
  const grouped: { sub: BrandSubCategory | null; products: Product[] }[] = [];
  const usedProductIds = new Set<string>();

  subCategories.forEach((sc) => {
    const scProducts = products.filter((p) => p.subCategoryId === sc.id);
    if (scProducts.length > 0) {
      grouped.push({ sub: sc, products: scProducts });
      scProducts.forEach((p) => usedProductIds.add(p.id));
    }
  });

  // Any products without a matching sub-category
  const ungrouped = products.filter((p) => !usedProductIds.has(p.id));
  if (ungrouped.length > 0) {
    grouped.push({ sub: null, products: ungrouped });
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-secondary to-neutral-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-5xl shadow-lg">
              {flag}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
                {brand.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/70">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {brand.country}
                </span>
                <span className="flex items-center gap-1.5">
                  <Package className="w-4 h-4" />
                  {products.length}{" "}
                  {t("products", "produk")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tags className="w-4 h-4" />
                  {subCategories.length}{" "}
                  {t("sub-categories", "sub-kategori")}
                </span>
                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    {t("Website", "Situs Web")}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-text leading-relaxed text-center">
            {brand.description}
          </p>
        </div>
      </section>

      {/* Sub-categories overview pills */}
      {subCategories.length > 0 && (
        <section className="py-8 bg-surface">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {subCategories.map((sc) => {
                const count = products.filter((p) => p.subCategoryId === sc.id).length;
                return (
                  <a
                    key={sc.id}
                    href={`#sub-${sc.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-surface-border hover:border-primary/40 hover:shadow-sm transition-all duration-200"
                  >
                    <span className="text-primary font-medium text-sm">{sc.name}</span>
                    <span className="text-xs text-text-muted bg-surface-muted px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Products grouped by sub-category */}
      <section className="py-12 bg-surface">
        <div className="container mx-auto px-4">
          {grouped.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-muted text-lg">
                {t("No products listed for this brand yet.", "Belum ada produk untuk merek ini.")}
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {grouped.map((group, idx) => (
                <div key={group.sub?.id || `ungrouped-${idx}`} id={group.sub ? `sub-${group.sub.id}` : undefined}>
                  {/* Section heading */}
                  <div className="flex items-center gap-3 mb-6">
                    {group.sub ? (
                      <>
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <Tags className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="text-xl font-heading font-bold text-secondary">
                            {group.sub.name}
                          </h2>
                          <p className="text-sm text-text-muted">
                            {group.sub.description}
                          </p>
                        </div>
                        <span className="ml-auto text-sm text-text-muted bg-white px-3 py-1 rounded-full border border-surface-border">
                          {group.products.length} {group.products.length === 1 ? "product" : "products"}
                        </span>
                      </>
                    ) : (
                      <h2 className="text-xl font-heading font-bold text-secondary">
                        {t("Other Products", "Produk Lainnya")}
                      </h2>
                    )}
                  </div>

                  {/* Products grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group bg-white rounded-xl border border-surface-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <div className="aspect-[4/3] bg-surface-muted relative overflow-hidden">
                          <Image
                            src={product.image || "/images/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-0.5 bg-primary/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                              {product.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-heading font-bold text-secondary text-lg mb-2 group-hover:text-primary transition-colors duration-200">
                            {product.name}
                          </h3>
                          <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center gap-1.5 text-primary font-medium text-sm mt-4">
                            {t("View Details", "Lihat Detail")}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center bg-secondary rounded-2xl p-10">
            <h3 className="text-2xl font-heading font-bold text-white mb-3">
              {t("Need Help Choosing?", "Butuh Bantuan Memilih?")}
            </h3>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">
              {t(
                "Our team of experts can recommend the best solution for your specific needs.",
                "Tim ahli kami dapat merekomendasikan solusi terbaik untuk kebutuhan spesifik Anda."
              )}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200"
            >
              {t("Contact Us", "Hubungi Kami")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
