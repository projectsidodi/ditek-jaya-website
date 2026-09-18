"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Filter, Tag } from "lucide-react";
import type { Product, BrandSubCategory } from "@/types";

function t(en: string, id?: string) {
  void id; return en;
}

interface Props {
  products: Product[];
  subCategories: BrandSubCategory[];
}

export function ProductsClient({ products, subCategories }: Props) {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Derive options
  const brandOptions = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      if (p.brandId && p.brandName) map.set(p.brandId, p.brandName);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [products]);

  const subCategoryOptions = useMemo(() => {
    if (!selectedBrand) return [];
    return subCategories
      .filter((sc) => sc.brandId === selectedBrand)
      .sort((a, b) => a.order - b.order);
  }, [selectedBrand, subCategories]);

  const categoryOptions = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats).sort();
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = !selectedBrand || p.brandId === selectedBrand;
      const matchesSubCategory =
        !selectedSubCategory || p.subCategoryId === selectedSubCategory;
      const matchesCategory =
        !selectedCategory || p.category === selectedCategory;
      return matchesSearch && matchesBrand && matchesSubCategory && matchesCategory;
    });
  }, [products, search, selectedBrand, selectedSubCategory, selectedCategory]);

  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId);
    setSelectedSubCategory(""); // Reset sub-category when brand changes
  };

  const clearAll = () => {
    setSearch("");
    setSelectedBrand("");
    setSelectedSubCategory("");
    setSelectedCategory("");
  };

  const hasAnyFilter = search || selectedBrand || selectedSubCategory || selectedCategory;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-secondary to-neutral-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {t("Our Products", "Produk Kami")}
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {t(
              "Explore our comprehensive range of analytical instruments, laboratory equipment, and scientific solutions.",
              "Jelajahi rangkaian lengkap instrumen analitik, peralatan laboratorium, dan solusi ilmiah kami."
            )}
          </p>
        </div>
      </section>

      <section className="py-12 bg-surface">
        <div className="container mx-auto px-4">
          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border border-surface-border text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
              placeholder={t("Search products, brands...", "Cari produk, merek...")}
            />
          </div>

          {/* Brand filter pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                !selectedBrand
                  ? "bg-primary text-white shadow"
                  : "bg-white text-text border border-surface-border hover:bg-surface-muted"
              }`}
              onClick={() => handleBrandChange("")}
            >
              <Filter className="w-4 h-4 inline mr-1.5" />
              {t("All Brands", "Semua Merek")}
            </button>
            {brandOptions.map((b) => (
              <button
                key={b.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedBrand === b.id
                    ? "bg-primary text-white shadow"
                    : "bg-white text-text border border-surface-border hover:bg-surface-muted"
                }`}
                onClick={() => handleBrandChange(b.id)}
              >
                {b.name}
              </button>
            ))}
          </div>

          {/* Sub-category filter pills (shown when brand selected) */}
          {selectedBrand && subCategoryOptions.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <button
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                  !selectedSubCategory
                    ? "bg-secondary text-white shadow"
                    : "bg-white text-text border border-surface-border hover:bg-surface-muted"
                }`}
                onClick={() => setSelectedSubCategory("")}
              >
                <Tag className="w-3.5 h-3.5 inline mr-1" />
                {t("All Sub-Categories", "Semua Sub-Kategori")}
              </button>
              {subCategoryOptions.map((sc) => (
                <button
                  key={sc.id}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                    selectedSubCategory === sc.id
                      ? "bg-secondary text-white shadow"
                      : "bg-white text-text border border-surface-border hover:bg-surface-muted"
                  }`}
                  onClick={() => setSelectedSubCategory(sc.id)}
                >
                  {sc.name}
                </button>
              ))}
            </div>
          )}

          {/* Category filter pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                !selectedCategory
                  ? "bg-secondary/80 text-white shadow"
                  : "bg-white text-text border border-surface-border hover:bg-surface-muted"
              }`}
              onClick={() => setSelectedCategory("")}
            >
              All Categories
            </button>
            {categoryOptions.map((cat) => (
              <button
                key={cat}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-secondary/80 text-white shadow"
                    : "bg-white text-text border border-surface-border hover:bg-surface-muted"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Active filters summary */}
          {hasAnyFilter && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-sm text-text-muted">
                Showing {filtered.length} of {products.length} products
              </span>
              <button
                onClick={clearAll}
                className="text-xs text-primary hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
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
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                      {product.brandName && (
                        <span className="px-2.5 py-0.5 bg-secondary/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                          {product.brandName}
                        </span>
                      )}
                      {product.subCategoryName && (
                        <span className="px-2.5 py-0.5 bg-primary/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                          {product.subCategoryName}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-medium text-primary mb-1.5">
                      {product.category}
                    </div>
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
          ) : (
            <div className="text-center py-16">
              <p className="text-text-muted text-lg">
                {t("No products found matching your criteria.", "Tidak ada produk yang cocok dengan kriteria Anda.")}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
