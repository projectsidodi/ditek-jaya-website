import { getNewsPost, getNewsPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import { NewsDetailClient } from "./NewsDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const post = getNewsPost(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | PT. Ditek Jaya`,
    description: post.excerpt,
  };
}

export default function NewsDetailPage({ params }: Props) {
  const post = getNewsPost(params.slug);
  if (!post) notFound();

  const related = getNewsPosts()
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return <NewsDetailClient post={post} related={related} />;
}
