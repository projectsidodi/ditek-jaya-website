import { NextResponse } from "next/server";
import { getServices, saveServices } from "@/lib/data";
import type { Service } from "@/types";

export async function GET() {
  return NextResponse.json(getServices());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const services = getServices();
    const newService: Service = {
      id: Date.now().toString(),
      title: body.title || "",
      titleId: body.titleId || "",
      description: body.description || "",
      descriptionId: body.descriptionId || "",
      icon: body.icon || "Wrench",
      features: body.features || [],
      featuresId: body.featuresId || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    services.push(newService);
    saveServices(services);
    return NextResponse.json(newService, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const services = getServices();
    const idx = services.findIndex((s) => s.id === body.id);
    if (idx === -1) return NextResponse.json({ error: "Service not found" }, { status: 404 });
    services[idx] = { ...services[idx], ...body, updatedAt: new Date().toISOString() };
    saveServices(services);
    return NextResponse.json(services[idx]);
  } catch {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    let services = getServices();
    services = services.filter((s) => s.id !== id);
    saveServices(services);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
