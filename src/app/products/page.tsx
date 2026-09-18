import { getProducts, getSubCategories } from "@/lib/data";
import { ProductsClient } from "./ProductsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Products | PT. Ditek Jaya",
  description: "Browse our comprehensive range of analytical instruments and laboratory equipment.",
};

export default function ProductsPage() {
  const products = getProducts();
  const subCategories = getSubCategories();
  return <ProductsClient products={products} subCategories={subCategories} />;
}
