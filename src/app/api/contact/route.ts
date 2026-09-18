import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Store submissions in a JSON file
    const filepath = path.join(DATA_DIR, "contact-submissions.json");
    let submissions: unknown[] = [];
    if (fs.existsSync(filepath)) {
      submissions = JSON.parse(fs.readFileSync(filepath, "utf-8"));
    }

    submissions.push({
      id: Date.now().toString(),
      name,
      email,
      phone: phone || "",
      company: company || "",
      subject,
      message,
      submittedAt: new Date().toISOString(),
      read: false,
    });

    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(filepath, JSON.stringify(submissions, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
