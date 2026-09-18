"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Building2,
  Tag,
} from "lucide-react";
import type { Product } from "@/types";

function t(en: string, id?: string) {
  void id; return en;
}

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: Props) {
  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-surface-muted border-b border-surface-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-primary transition-colors">
              {t("Home", "Beranda")}
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-primary transition-colors"
            >
              {t("Products", "Produk")}
            </Link>
            <span>/</span>
            <span className="text-secondary font-medium">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-8 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Products", "Kembali ke Produk")}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="aspect-[4/3] bg-surface-muted rounded-2xl relative overflow-hidden">
              <Image
                src={product.image || "/images/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div>
              <div className="text-sm font-medium text-primary mb-2">
                {product.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
                {product.name}
              </h1>

              {/* Brand & Sub-category badges */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {product.brandName && (
                  <Link
                    href={`/brands/${product.brandId}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-lg hover:bg-secondary/20 transition-colors"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    {product.brandName}
                  </Link>
                )}
                {product.subCategoryName && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-lg">
                    <Tag className="w-3.5 h-3.5" />
                    {product.subCategoryName}
                  </span>
                )}
              </div>

              <p className="text-text leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-heading font-bold text-secondary text-lg mb-3">
                    {t("Key Features", "Fitur Utama")}
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-text">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {product.specifications &&
                Object.keys(product.specifications).length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-heading font-bold text-secondary text-lg mb-3">
                      {t("Specifications", "Spesifikasi")}
                    </h3>
                    <div className="bg-surface-muted rounded-xl overflow-hidden">
                      {Object.entries(product.specifications).map(
                        ([key, val], i) => (
                          <div
                            key={key}
                            className={`flex items-center px-4 py-3 ${
                              i % 2 === 0 ? "bg-white" : "bg-surface-muted"
                            }`}
                          >
                            <span className="font-medium text-secondary w-1/3 text-sm">
                              {key}
                            </span>
                            <span className="text-text text-sm">{val}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="btn-primary px-8 py-3 gap-2"
                >
                  {t("Request Quote", "Minta Penawaran")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-ghost px-8 py-3"
                >
                  {t("Ask a Question", "Ajukan Pertanyaan")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-surface">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-heading font-bold text-secondary mb-8">
              {t("Related Products", "Produk Terkait")}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((rp) => (
                <Link
                  key={rp.id}
                  href={`/products/${rp.id}`}
                  className="group bg-white rounded-xl border border-surface-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="aspect-[4/3] bg-surface-muted relative overflow-hidden">
                    <Image
                      src={rp.image || "/images/placeholder.svg"}
                      alt={rp.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {rp.brandName && (
                        <span className="px-2.5 py-0.5 bg-secondary/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                          {rp.brandName}
                        </span>
                      )}
                      {rp.subCategoryName && (
                        <span className="px-2.5 py-0.5 bg-primary/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                          {rp.subCategoryName}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-medium text-primary mb-1">
                      {rp.category}
                    </div>
                    <h3 className="font-heading font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-200">
                      {rp.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-primary font-medium text-sm">
                      {t("View Details", "Lihat Detail")}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
