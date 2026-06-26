import { notFound } from "next/navigation";
import { tags, posts } from "@/data/dummyData";
import { buildMetadata } from "@/lib/metadata";
import TaxonomyPostList from "@/components/blog/TaxonomyPostList";
import type { Metadata } from "next";

export function generateStaticParams() {
  return tags.map((t) => ({ slug: t.name.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = tags.find((t) => t.name.toLowerCase() === slug.toLowerCase());
  if (!tag) return buildMetadata();
  return buildMetadata({
    title: `Tag: ${tag.name}`,
    url: `/tag/${slug}`,
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tag = tags.find((t) => t.name.toLowerCase() === slug.toLowerCase());
  if (!tag) notFound();

  const filteredPosts = posts.filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(slug.toLowerCase())
  );

  return <TaxonomyPostList title={`Tag: ${tag.name}`} posts={filteredPosts} />;
}
