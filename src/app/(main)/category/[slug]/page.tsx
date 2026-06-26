import { notFound } from "next/navigation";
import { categories, posts } from "@/data/dummyData";
import { buildMetadata } from "@/lib/metadata";
import TaxonomyPostList from "@/components/blog/TaxonomyPostList";
import type { Metadata } from "next";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return buildMetadata();
  return buildMetadata({
    title: category.name,
    url: `/category/${slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const filteredPosts = posts.filter((p) => p.categorySlug === slug);

  return <TaxonomyPostList title={category.name} posts={filteredPosts} />;
}
