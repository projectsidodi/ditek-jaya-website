import { getBrandBySlug, getProductsByBrand, getSubCategoriesByBrand } from "@/lib/data";
import { notFound } from "next/navigation";
import { BrandDetailClient } from "./BrandDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) return {};
  return {
    title: `${brand.name} | PT. Ditek Jaya`,
    description: brand.description,
  };
}

export default function BrandDetailPage({ params }: Props) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) notFound();
  const products = getProductsByBrand(brand.id);
  const subCategories = getSubCategoriesByBrand(brand.id);
  return <BrandDetailClient brand={brand} products={products} subCategories={subCategories} />;
}
