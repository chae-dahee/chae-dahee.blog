import Link from "next/link";
import { categories } from "@/data/dummyData";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Categories",
  url: "/category",
});

export default function CategoryIndex() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-[var(--color-accent)]">Categories</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="bg-[var(--color-surface)] rounded-lg p-4 hover:bg-[var(--color-muted)] transition"
          >
            <Link
              href={`/category/${cat.slug}`}
              className="text-xl font-medium text-[var(--color-accent)] hover:underline"
            >
              {cat.name} ({cat.count})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
