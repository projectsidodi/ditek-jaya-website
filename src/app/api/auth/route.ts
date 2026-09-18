import { NextResponse } from "next/server";

const ADMIN_USER = "admin";
const ADMIN_PASS = "ditekjaya2024";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64");
      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
