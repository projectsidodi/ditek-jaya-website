import { NextResponse } from "next/server";
import { getSubCategories, getSubCategoriesByBrand } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brandId = searchParams.get("brandId");
  const subs = brandId ? getSubCategoriesByBrand(brandId) : getSubCategories();
  return NextResponse.json(subs);
}
