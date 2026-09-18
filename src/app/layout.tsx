import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LocaleProvider } from "@/contexts/LocaleContext";

export const metadata: Metadata = {
  title: "PT. Ditek Jaya | Indonesia's Premier Scientific Instrument Distributor",
  description:
    "PT. Ditek Jaya is Indonesia's largest supplier of analytical and measuring instruments. Sole Shimadzu distributor since 1974. Chromatography, spectroscopy, mass spectrometry, and more.",
  keywords: [
    "scientific instruments Indonesia",
    "Shimadzu Indonesia",
    "analytical instruments",
    "chromatography",
    "spectroscopy",
    "mass spectrometry",
    "PT Ditek Jaya",
    "laboratory equipment",
  ],
  openGraph: {
    title: "PT. Ditek Jaya | Scientific Instruments Indonesia",
    description:
      "Indonesia's largest supplier of analytical & measuring instruments. Sole Shimadzu distributor since 1974.",
    url: "https://ditekjaya.co.id",
    siteName: "PT. Ditek Jaya",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PT. Ditek Jaya",
              url: "https://ditekjaya.co.id",
              logo: "https://ditekjaya.co.id/images/logo.png",
              foundingDate: "1974",
              description:
                "Indonesia's largest supplier of analytical and measuring instruments. Sole Shimadzu distributor.",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Kedoya Elok Plaza, Jl. Panjang No.5, Kedoya Selatan",
                addressLocality: "Jakarta Barat",
                postalCode: "11520",
                addressCountry: "ID",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+62-21-5803388",
                contactType: "sales",
                areaServed: "ID",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <LocaleProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
