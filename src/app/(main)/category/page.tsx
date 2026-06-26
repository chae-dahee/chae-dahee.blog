import { categories } from "@/data/dummyData";
import { buildMetadata } from "@/lib/metadata";
import TaxonomyIndexGrid from "@/components/blog/TaxonomyIndexGrid";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Categories",
  url: "/category",
});

export default function CategoryIndex() {
  return (
    <TaxonomyIndexGrid
      title="Categories"
      items={categories.map((cat) => ({
        key: cat.id,
        href: `/category/${cat.slug}`,
        label: `${cat.name} (${cat.count})`,
      }))}
    />
  );
}
