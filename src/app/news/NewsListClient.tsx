"use client";

import React from "react";
import Link from "next/link";
import { Calendar, User, ArrowUpRight, Tag } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import type { NewsPost } from "@/types";

interface Props {
  posts: NewsPost[];
}

export function NewsListClient({ posts }: Props) {
  const { locale, t } = useLocale();

  return (
    <>
      <section className="bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900 py-20">
        <div className="section-container text-center">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">
            {t("Stay Updated", "Tetap Terkini")}
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {t("News & Insights", "Berita & Wawasan")}
          </h1>
          <p className="text-secondary-300 max-w-2xl mx-auto text-lg">
            {t(
              "Latest product launches, technical guides, and company updates.",
              "Peluncuran produk terbaru, panduan teknis, dan pembaruan perusahaan."
            )}
          </p>
        </div>
      </section>

      <section className="py-12 bg-surface">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="card group overflow-hidden flex flex-col cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-cta/5 to-surface-muted flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Tag className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.publishedAt).toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                  </div>
                  <span className="inline-block px-2.5 py-0.5 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-3 self-start">
                    {post.category}
                  </span>
                  <h2 className="font-heading font-semibold text-lg text-primary group-hover:text-primary transition-colors duration-200 mb-2">
                    {locale === "en" ? post.title : post.titleId}
                  </h2>
                  <p className="text-text-secondary text-sm line-clamp-3 flex-1">
                    {locale === "en" ? post.excerpt : post.excerptId}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all duration-200">
                    {t("Read More", "Baca Selengkapnya")}
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-muted text-lg">
                {t("No news posts yet.", "Belum ada berita.")}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
