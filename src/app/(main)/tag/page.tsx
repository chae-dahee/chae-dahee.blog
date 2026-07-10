import { getAllTags } from "@/lib/markdown/posts";
import { buildMetadata } from "@/lib/metadata";
import TaxonomyIndexGrid from "@/components/blog/TaxonomyIndexGrid";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Tags",
  url: "/tag",
});

export default function TagIndex() {
  const tags = getAllTags();

  return (
    <TaxonomyIndexGrid
      title="Tags"
      items={tags.map((tag) => ({
        key: tag.id,
        href: `/tag/${tag.name.toLowerCase()}`,
        label: `${tag.name} (${tag.count})`,
      }))}
    />
  );
}
