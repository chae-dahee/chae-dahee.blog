import Link from "next/link";
import { tags } from "@/data/dummyData";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Tags",
  url: "/tag",
});

export default function TagIndex() {
  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-[var(--color-accent)]">Tags</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tags.map((tag) => (
          <li
            key={tag.id}
            className="bg-[var(--color-surface)] rounded-lg p-4 hover:bg-[var(--color-muted)] transition"
          >
            <Link
              href={`/tag/${tag.name.toLowerCase()}`}
              className="text-xl font-medium text-[var(--color-accent)] hover:underline"
            >
              {tag.name} ({tag.count})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
