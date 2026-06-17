import { notFound } from "next/navigation";
import BlogLayout from "@/components/blog/BlogLayout";
import PostDetail from "@/components/blog/PostDetail";
import { posts } from "@/data/dummyData";
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
    url: `/posts/${post.slug}`,
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

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <BlogLayout>
        <PostDetail post={post} />
      </BlogLayout>
    </div>
  );
}
