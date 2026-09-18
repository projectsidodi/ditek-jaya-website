import { NextResponse } from "next/server";
import { getBrands, saveBrands } from "@/lib/data";
import type { Brand } from "@/types";

export async function GET() {
  const brands = getBrands();
  return NextResponse.json(brands);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const brands = getBrands();
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const newBrand: Brand = {
      id: Date.now().toString(),
      name: body.name || "",
      slug,
      logo: body.logo || "",
      website: body.website || "",
      country: body.country || "",
      description: body.description || "",
      featured: body.featured ?? true,
      createdAt: new Date().toISOString(),
    };
    brands.push(newBrand);
    saveBrands(brands);
    return NextResponse.json(newBrand, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create brand" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const brands = getBrands();
    const idx = brands.findIndex((b) => b.id === body.id);
    if (idx === -1) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }
    brands[idx] = { ...brands[idx], ...body };
    saveBrands(brands);
    return NextResponse.json(brands[idx]);
  } catch {
    return NextResponse.json({ error: "Failed to update brand" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    let brands = getBrands();
    brands = brands.filter((b) => b.id !== id);
    saveBrands(brands);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 });
  }
}
