import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, posts } from "@/data/dummyData";
import { buildMetadata } from "@/lib/metadata";
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

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-[var(--color-accent)]">
        {category.name}
      </h1>
      <ul className="space-y-6">
        {filteredPosts.map((post) => (
          <li
            key={post.id}
            className="bg-[var(--color-surface)] rounded-lg p-4 hover:bg-[var(--color-muted)] transition"
          >
            <Link
              href={`/posts/${post.slug}`}
              className="text-xl font-medium text-[var(--color-accent)] hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-[var(--color-secondary)] mt-2">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
