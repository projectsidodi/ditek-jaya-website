import { NextResponse } from "next/server";
import { getNewsPosts, saveNewsPosts } from "@/lib/data";
import type { NewsPost } from "@/types";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function GET() {
  return NextResponse.json(getNewsPosts());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const posts = getNewsPosts();
    const newPost: NewsPost = {
      slug: body.slug || slugify(body.title || "untitled"),
      title: body.title || "",
      titleId: body.titleId || "",
      excerpt: body.excerpt || "",
      excerptId: body.excerptId || "",
      content: body.content || "",
      contentId: body.contentId || "",
      image: body.image || "",
      author: body.author || "Admin",
      category: body.category || "General",
      publishedAt: body.publishedAt || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    posts.push(newPost);
    saveNewsPosts(posts);
    return NextResponse.json(newPost, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const posts = getNewsPosts();
    const idx = posts.findIndex((p) => p.slug === body.slug);
    if (idx === -1) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    posts[idx] = { ...posts[idx], ...body, updatedAt: new Date().toISOString() };
    saveNewsPosts(posts);
    return NextResponse.json(posts[idx]);
  } catch {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });
    let posts = getNewsPosts();
    posts = posts.filter((p) => p.slug !== slug);
    saveNewsPosts(posts);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
