import { NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/data";
import type { Product } from "@/types";

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const products = getProducts();
    const newProduct: Product = {
      id: Date.now().toString(),
      name: body.name || "",
      nameId: body.nameId || "",
      category: body.category || "",
      brandId: body.brandId || "",
      brandName: body.brandName || "",
      description: body.description || "",
      descriptionId: body.descriptionId || "",
      image: body.image || "",
      features: body.features || [],
      featuresId: body.featuresId || [],
      specifications: body.specifications || {},
      subCategoryId: body.subCategoryId || "",
      subCategoryName: body.subCategoryName || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    products.push(newProduct);
    saveProducts(products);
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const products = getProducts();
    const idx = products.findIndex((p) => p.id === body.id);
    if (idx === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    products[idx] = { ...products[idx], ...body, updatedAt: new Date().toISOString() };
    saveProducts(products);
    return NextResponse.json(products[idx]);
  } catch {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    let products = getProducts();
    products = products.filter((p) => p.id !== id);
    saveProducts(products);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
