import { getProducts, getServices, getBranches, getBrands, getSubCategories } from "@/lib/data";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { BrandPartner } from "@/components/home/BrandPartner";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { BranchOffices } from "@/components/home/BranchOffices";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const products = getProducts();
  const services = getServices();
  const branches = getBranches();
  const brands = getBrands();
  const subCategories = getSubCategories();

  return (
    <>
      <HeroSection />
      <StatsSection />
      <BrandPartner brands={brands} subCategories={subCategories} products={products} />
      <FeaturedProducts products={products} />
      <ServicesOverview services={services} />
      <BranchOffices branches={branches} />
    </>
  );
}
