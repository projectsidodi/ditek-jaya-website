import { getNewsPosts } from "@/lib/data";
import { NewsListClient } from "./NewsListClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "News & Insights | PT. Ditek Jaya",
  description: "Stay updated with the latest news, product launches, and technical insights from PT. Ditek Jaya.",
};

export default function NewsPage() {
  const posts = getNewsPosts();
  return <NewsListClient posts={posts} />;
}
