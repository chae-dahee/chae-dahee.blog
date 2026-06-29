import { notFound } from "next/navigation";
import PostDetail from "@/components/blog/PostDetail";
import { posts } from "@/data/dummyData";
import { getViewCount } from "@/lib/data/posts";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return buildMetadata();
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    url: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: `${post.date}T00:00:00+09:00`,
    tags: post.tags,
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  // 읽기는 Server Component에서 DB를 직접 조회 (API·fetch 불필요)
  const viewCount = await getViewCount(slug);

  return <PostDetail post={post} viewCount={viewCount} />;
}
