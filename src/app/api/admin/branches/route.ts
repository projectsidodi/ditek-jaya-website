import { NextResponse } from "next/server";
import { getBranches, saveBranches } from "@/lib/data";
import type { Branch } from "@/types";

export async function GET() {
  return NextResponse.json(getBranches());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const branches = getBranches();
    const newBranch: Branch = {
      id: Date.now().toString(),
      city: body.city || "",
      address: body.address || "",
      phone: body.phone || "",
      email: body.email || "",
      mapUrl: body.mapUrl || "",
      isHeadOffice: body.isHeadOffice || false,
    };
    branches.push(newBranch);
    saveBranches(branches);
    return NextResponse.json(newBranch, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create branch" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const branches = getBranches();
    const idx = branches.findIndex((b) => b.id === body.id);
    if (idx === -1) return NextResponse.json({ error: "Branch not found" }, { status: 404 });
    branches[idx] = { ...branches[idx], ...body };
    saveBranches(branches);
    return NextResponse.json(branches[idx]);
  } catch {
    return NextResponse.json({ error: "Failed to update branch" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    let branches = getBranches();
    branches = branches.filter((b) => b.id !== id);
    saveBranches(branches);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete branch" }, { status: 500 });
  }
}
