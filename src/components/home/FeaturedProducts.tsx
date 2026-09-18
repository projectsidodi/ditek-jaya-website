"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import type { Product } from "@/types";

interface Props {
  products: Product[];
}

export function FeaturedProducts({ products }: Props) {
  const { locale, t } = useLocale();

  return (
    <section className="py-20 bg-surface">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-2">
            {t("Our Products", "Produk Kami")}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary">
            {t("Featured Instruments", "Instrumen Unggulan")}
          </h2>
          <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
            {t(
              "Discover our most popular analytical instruments trusted by laboratories across Indonesia.",
              "Temukan instrumen analitik terpopuler kami yang dipercaya oleh laboratorium di seluruh Indonesia."
            )}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="card p-6 group cursor-pointer hover:border-primary/30 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-xs font-semibold rounded-full">
                  {product.category}
                </span>
                {product.brandName && (
                  <span className="inline-block px-3 py-1 bg-secondary-50 text-secondary text-xs font-semibold rounded-full">
                    {product.brandName}
                  </span>
                )}
              </div>
              <h3 className="font-heading font-semibold text-secondary group-hover:text-primary transition-colors duration-200 mb-2">
                {locale === "en" ? product.name : product.nameId}
              </h3>
              <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                {locale === "en" ? product.description : product.descriptionId}
              </p>
              <div className="flex items-center gap-1 text-primary text-sm font-medium">
                {t("View Details", "Lihat Detail")}
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="btn-primary">
            {t("Browse All Products", "Lihat Semua Produk")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
