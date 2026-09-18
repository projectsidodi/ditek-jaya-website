import { NextResponse } from "next/server";
import {
  getSubCategories,
  getSubCategoriesByBrand,
  saveSubCategories,
} from "@/lib/data";
import type { BrandSubCategory } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brandId = searchParams.get("brandId");
  const subs = brandId ? getSubCategoriesByBrand(brandId) : getSubCategories();
  return NextResponse.json(subs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const subs = getSubCategories();
    const now = new Date().toISOString();
    const newSub: BrandSubCategory = {
      id: Date.now().toString(),
      brandId: body.brandId || "",
      brandName: body.brandName || "",
      name: body.name || "",
      nameId: body.nameId || "",
      description: body.description || "",
      descriptionId: body.descriptionId || "",
      icon: body.icon || "Box",
      order: body.order ?? subs.filter((s) => s.brandId === body.brandId).length + 1,
      createdAt: now,
      updatedAt: now,
    };
    subs.push(newSub);
    saveSubCategories(subs);
    return NextResponse.json(newSub, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create sub-category" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const subs = getSubCategories();
    const idx = subs.findIndex((s) => s.id === body.id);
    if (idx === -1) {
      return NextResponse.json({ error: "Sub-category not found" }, { status: 404 });
    }
    subs[idx] = { ...subs[idx], ...body, updatedAt: new Date().toISOString() };
    saveSubCategories(subs);
    return NextResponse.json(subs[idx]);
  } catch {
    return NextResponse.json({ error: "Failed to update sub-category" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    let subs = getSubCategories();
    subs = subs.filter((s) => s.id !== id);
    saveSubCategories(subs);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete sub-category" }, { status: 500 });
  }
}
