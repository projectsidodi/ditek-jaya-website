"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const branches = [
  {
    city: "Jakarta (Head Office)",
    address: "Kedoya Elok Plaza, Jl. Panjang No.5, Kedoya Selatan, Jakarta Barat 11520",
    phone: "+62 21 5803388",
    email: "info@ditekjaya.co.id",
    hours: "Mon - Fri: 08:00 - 17:00 WIB",
  },
  {
    city: "Surabaya",
    address: "Jl. Raya Darmo No.23, Surabaya 60265",
    phone: "+62 31 5678901",
    email: "surabaya@ditekjaya.co.id",
    hours: "Mon - Fri: 08:00 - 17:00 WIB",
  },
  {
    city: "Bandung",
    address: "Jl. Asia Afrika No.112, Bandung 40112",
    phone: "+62 22 4567890",
    email: "bandung@ditekjaya.co.id",
    hours: "Mon - Fri: 08:00 - 17:00 WIB",
  },
  {
    city: "Medan",
    address: "Jl. Imam Bonjol No.45, Medan 20112",
    phone: "+62 61 4567890",
    email: "medan@ditekjaya.co.id",
    hours: "Mon - Fri: 08:00 - 17:00 WIB",
  },
];

export default function ContactPage() {
  const { t } = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900 py-20">
        <div className="section-container text-center">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">
            {t("Get In Touch", "Hubungi Kami")}
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {t("Contact Us", "Kontak Kami")}
          </h1>
          <p className="text-secondary-300 max-w-2xl mx-auto text-lg">
            {t(
              "Ready to discuss your laboratory needs? Our team of experts is here to help.",
              "Siap mendiskusikan kebutuhan laboratorium Anda? Tim ahli kami siap membantu."
            )}
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 bg-surface">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card p-8">
                <h2 className="font-heading font-bold text-2xl text-primary mb-2">
                  {t("Send Us a Message", "Kirim Pesan")}
                </h2>
                <p className="text-text-secondary text-sm mb-8">
                  {t(
                    "Fill out the form below and we will get back to you within 1 business day.",
                    "Isi formulir di bawah dan kami akan membalas dalam 1 hari kerja."
                  )}
                </p>

                {status === "success" && (
                  <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <p className="text-sm">{t("Message sent successfully! We will contact you soon.", "Pesan berhasil terkirim! Kami akan segera menghubungi Anda.")}</p>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm">{t("Failed to send message. Please try again.", "Gagal mengirim pesan. Silakan coba lagi.")}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">
                        {t("Full Name", "Nama Lengkap")} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-field"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">
                        {t("Email Address", "Alamat Email")} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-field"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">
                        {t("Phone Number", "Nomor Telepon")}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input-field"
                        placeholder="+62 812 3456 7890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">
                        {t("Company / Institution", "Perusahaan / Institusi")}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="input-field"
                        placeholder={t("Your company name", "Nama perusahaan Anda")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      {t("Subject", "Subjek")} *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="input-field cursor-pointer"
                    >
                      <option value="">{t("Select a subject", "Pilih subjek")}</option>
                      <option value="product-inquiry">{t("Product Inquiry", "Pertanyaan Produk")}</option>
                      <option value="quote-request">{t("Request a Quote", "Permintaan Penawaran")}</option>
                      <option value="service-support">{t("Service & Support", "Layanan & Dukungan")}</option>
                      <option value="training">{t("Training Request", "Permintaan Pelatihan")}</option>
                      <option value="partnership">{t("Partnership", "Kemitraan")}</option>
                      <option value="other">{t("Other", "Lainnya")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      {t("Message", "Pesan")} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-field resize-none"
                      placeholder={t("Tell us about your needs...", "Ceritakan kebutuhan Anda...")}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary gap-2 w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    {status === "sending" ? t("Sending...", "Mengirim...") : t("Send Message", "Kirim Pesan")}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6">
                <h3 className="font-heading font-semibold text-lg text-primary mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  {t("Business Hours", "Jam Kerja")}
                </h3>
                <div className="space-y-2 text-sm text-text-secondary">
                  <div className="flex justify-between">
                    <span>{t("Monday - Friday", "Senin - Jumat")}</span>
                    <span className="font-medium text-text">08:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("Saturday", "Sabtu")}</span>
                    <span className="font-medium text-text">08:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("Sunday", "Minggu")}</span>
                    <span className="font-medium text-red-500">{t("Closed", "Tutup")}</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-heading font-semibold text-lg text-primary mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  {t("Quick Contact", "Kontak Cepat")}
                </h3>
                <div className="space-y-3">
                  <a href="tel:+62215803388" className="flex items-center gap-3 text-sm text-text-secondary hover:text-primary transition-colors duration-200 cursor-pointer">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    +62 21 5803388
                  </a>
                  <a href="mailto:info@ditekjaya.co.id" className="flex items-center gap-3 text-sm text-text-secondary hover:text-primary transition-colors duration-200 cursor-pointer">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    info@ditekjaya.co.id
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-2">
              {t("Our Locations", "Lokasi Kami")}
            </p>
            <h2 className="text-3xl font-heading font-bold text-primary">
              {t("Branch Offices", "Kantor Cabang")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((branch, i) => (
              <div key={i} className="card p-6 hover:border-cta/30 transition-all duration-200">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-primary mb-3">
                  {branch.city}
                </h3>
                <div className="space-y-2 text-sm text-text-secondary">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-text-muted shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-text-muted shrink-0" />
                    <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="hover:text-primary transition-colors duration-200 cursor-pointer">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-text-muted shrink-0" />
                    <a href={`mailto:${branch.email}`} className="hover:text-primary transition-colors duration-200 cursor-pointer">
                      {branch.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
