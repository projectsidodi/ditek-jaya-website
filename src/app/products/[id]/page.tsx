import { getProduct, getProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./ProductDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  const product = getProduct(params.id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | PT. Ditek Jaya`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProduct(params.id);
  if (!product) notFound();

  const related = getProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return <ProductDetailClient product={product} relatedProducts={related} />;
}
