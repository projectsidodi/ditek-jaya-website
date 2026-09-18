import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filepath = path.join(process.cwd(), "data", "contact-submissions.json");

export async function GET() {
  try {
    if (!fs.existsSync(filepath)) return NextResponse.json([]);
    const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
