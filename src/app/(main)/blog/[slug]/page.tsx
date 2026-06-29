import { notFound } from "next/navigation";
import PostDetail from "@/components/blog/PostDetail";
import { posts } from "@/data/dummyData";
import { incrementViewCount } from "@/lib/data/posts";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

  const viewCount = await incrementViewCount(slug);

  return <PostDetail post={post} viewCount={viewCount} />;
}
