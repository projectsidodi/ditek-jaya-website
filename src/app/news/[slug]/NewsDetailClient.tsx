"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, ArrowUpRight } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import type { NewsPost } from "@/types";

interface Props {
  post: NewsPost;
  related: NewsPost[];
}

export function NewsDetailClient({ post, related }: Props) {
  const { locale, t } = useLocale();

  const title = locale === "en" ? post.title : post.titleId;
  const content = locale === "en" ? post.content : post.contentId;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-surface-border">
        <div className="section-container py-4">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link
              href="/news"
              className="hover:text-primary transition-colors duration-200 cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("News", "Berita")}
            </Link>
            <span>/</span>
            <span className="text-text font-medium truncate max-w-[300px]">{title}</span>
          </div>
        </div>
      </div>

      <article className="py-12 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 leading-tight">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-8 pb-8 border-b border-surface-border">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString(
                  locale === "en" ? "en-US" : "id-ID",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                {post.category}
              </span>
            </div>

            {/* Featured Image Placeholder */}
            <div className="w-full h-64 md:h-80 bg-gradient-to-br from-cta/5 to-surface-muted rounded-xl flex items-center justify-center mb-10">
              <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center">
                <Tag className="w-10 h-10 text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed">
              {content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-surface">
          <div className="section-container">
            <h2 className="text-2xl font-heading font-bold text-primary mb-8">
              {t("Related Articles", "Artikel Terkait")}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/news/${p.slug}`}
                  className="card p-6 group cursor-pointer"
                >
                  <span className="inline-block px-2.5 py-0.5 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-3">
                    {p.category}
                  </span>
                  <h3 className="font-heading font-semibold text-primary group-hover:text-primary transition-colors duration-200">
                    {locale === "en" ? p.title : p.titleId}
                  </h3>
                  <p className="text-text-secondary text-sm mt-2 line-clamp-2">
                    {locale === "en" ? p.excerpt : p.excerptId}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-primary text-sm font-medium">
                    {t("Read More", "Baca Selengkapnya")}
                    <ArrowUpRight className="w-4 h-4" />
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
