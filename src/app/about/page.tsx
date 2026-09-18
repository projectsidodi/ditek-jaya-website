"use client";

import React from "react";
import { useLocale } from "@/contexts/LocaleContext";
import {
  Calendar,
  Target,
  Eye,
  Award,
  Users,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

const timeline = [
  { year: "1974", en: "PT. Ditek Jaya founded in Jakarta as a scientific instrument distributor.", id: "PT. Ditek Jaya didirikan di Jakarta sebagai distributor instrumen ilmiah." },
  { year: "1980s", en: "Became the sole authorized distributor of Shimadzu Corporation in Indonesia.", id: "Menjadi distributor resmi tunggal Shimadzu Corporation di Indonesia." },
  { year: "1990s", en: "Expanded operations with branch offices in Surabaya and Bandung.", id: "Memperluas operasi dengan kantor cabang di Surabaya dan Bandung." },
  { year: "2000s", en: "Opened offices in Solo and Medan, achieving nationwide coverage.", id: "Membuka kantor di Solo dan Medan, mencapai cakupan nasional." },
  { year: "2010s", en: "Modernized service capabilities with advanced training programs.", id: "Memodernisasi kemampuan layanan dengan program pelatihan canggih." },
  { year: "2024", en: "Celebrating 50 years of scientific excellence in Indonesia.", id: "Merayakan 50 tahun keunggulan ilmiah di Indonesia." },
];

const values = [
  { icon: Lightbulb, titleEn: "Innovation", titleId: "Inovasi", descEn: "Bringing cutting-edge analytical technology to Indonesia.", descId: "Membawa teknologi analitik mutakhir ke Indonesia." },
  { icon: ShieldCheck, titleEn: "Integrity", titleId: "Integritas", descEn: "Honest, transparent partnerships with every client.", descId: "Kemitraan yang jujur dan transparan dengan setiap klien." },
  { icon: Users, titleEn: "Service Excellence", titleId: "Keunggulan Layanan", descEn: "Dedicated support from certified engineers.", descId: "Dukungan berdedikasi dari insinyur bersertifikat." },
  { icon: Award, titleEn: "Quality", titleId: "Kualitas", descEn: "Only the finest instruments and consumables.", descId: "Hanya instrumen dan bahan habis pakai terbaik." },
];

export default function AboutPage() {
  const { locale, t } = useLocale();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900 py-20">
        <div className="section-container text-center">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">
            {t("About Us", "Tentang Kami")}
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {t("Our Story", "Kisah Kami")}
          </h1>
          <p className="text-secondary-300 max-w-2xl mx-auto text-lg">
            {t(
              "For over 50 years, PT. Ditek Jaya has been at the forefront of advancing scientific research and quality control in Indonesia.",
              "Selama lebih dari 50 tahun, PT. Ditek Jaya telah menjadi yang terdepan dalam memajukan penelitian ilmiah dan kontrol kualitas di Indonesia."
            )}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8 border-l-4 border-l-cta">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-primary">
                  {t("Our Mission", "Misi Kami")}
                </h2>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {t(
                  "To empower Indonesian science and industry by providing world-class analytical instruments, comprehensive service support, and expert technical knowledge that enables our clients to achieve accurate, reliable results.",
                  "Memberdayakan sains dan industri Indonesia dengan menyediakan instrumen analitik kelas dunia, dukungan layanan komprehensif, dan pengetahuan teknis ahli yang memungkinkan klien kami mencapai hasil yang akurat dan andal."
                )}
              </p>
            </div>
            <div className="card p-8 border-l-4 border-l-cta">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-primary">
                  {t("Our Vision", "Visi Kami")}
                </h2>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {t(
                  "To be the most trusted and respected scientific instrument partner in Southeast Asia, driving innovation and excellence in every laboratory we serve.",
                  "Menjadi mitra instrumen ilmiah paling terpercaya dan dihormati di Asia Tenggara, mendorong inovasi dan keunggulan di setiap laboratorium yang kami layani."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-surface">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-2">
              {t("Our Journey", "Perjalanan Kami")}
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary">
              {t("History Since 1974", "Sejarah Sejak 1974")}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-surface-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="font-heading font-bold text-primary text-lg">
                    {item.year}
                  </span>
                  <p className="text-text-secondary mt-1">
                    {locale === "en" ? item.en : item.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-2">
              {t("Our Principles", "Prinsip Kami")}
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary">
              {t("Core Values", "Nilai Inti")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <div key={i} className="card p-6 text-center group hover:border-cta/30 transition-all duration-200">
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-200">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-200" />
                  </div>
                  <h3 className="font-heading font-semibold text-primary mb-2">
                    {locale === "en" ? val.titleEn : val.titleId}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {locale === "en" ? val.descEn : val.descId}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
