import { notFound } from "next/navigation";
import { getAllCategories, getAllPosts } from "@/lib/markdown/posts";
import { buildMetadata } from "@/lib/metadata";
import { decodeSlugParam } from "@/lib/slug";
import TaxonomyPostList from "@/components/blog/TaxonomyPostList";
import type { Metadata } from "next";

type Params = Promise<{ slug: string; sub: string }>;

async function findSubcategory(params: Params) {
  const { slug, sub } = await params;
  const categorySlug = decodeSlugParam(slug);
  const subSlug = decodeSlugParam(sub);
  const category = getAllCategories().find((c) => c.slug === categorySlug);
  const subcategory = category?.children?.find((c) => c.slug === subSlug);

  return category && subcategory ? { category, subcategory } : undefined;
}

export function generateStaticParams() {
  return getAllCategories().flatMap((c) =>
    (c.children ?? []).map((child) => ({ slug: c.slug, sub: child.slug }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const found = await findSubcategory(params);
  if (!found) return buildMetadata();
  const { category, subcategory } = found;
  return buildMetadata({
    title: `${category.name} / ${subcategory.name}`,
    url: `/category/${category.slug}/${subcategory.slug}`,
  });
}

export default async function SubcategoryPage({ params }: { params: Params }) {
  const found = await findSubcategory(params);
  if (!found) notFound();
  const { category, subcategory } = found;

  const filteredPosts = getAllPosts().filter(
    (p) => p.categorySlug === category.slug && p.subcategorySlug === subcategory.slug
  );

  return (
    <TaxonomyPostList title={`${category.name} / ${subcategory.name}`} posts={filteredPosts} />
  );
}
