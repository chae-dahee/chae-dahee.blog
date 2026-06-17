import type { MetadataRoute } from "next";
import { posts } from "@/data/dummyData";
import { siteConfig } from "@/config/seo.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00+09:00`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...postEntries,
  ];
}
