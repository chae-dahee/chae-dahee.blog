import { getAllCategories } from "@/lib/markdown/posts";
import { buildMetadata } from "@/lib/metadata";
import TaxonomyIndexGrid from "@/components/blog/TaxonomyIndexGrid";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Categories",
  url: "/category",
});

export default function CategoryIndex() {
  const categories = getAllCategories();

  return (
    <TaxonomyIndexGrid
      title="Categories"
      items={categories.flatMap((cat) => [
        {
          key: cat.slug,
          href: `/category/${cat.slug}`,
          label: `${cat.name} (${cat.count})`,
        },
        ...(cat.children ?? []).map((child) => ({
          key: `${cat.slug}/${child.slug}`,
          href: `/category/${cat.slug}/${child.slug}`,
          label: `${cat.name} / ${child.name} (${child.count})`,
        })),
      ])}
    />
  );
}
