import type { MetadataRoute } from "next";
import { posts, categories, tags } from "@/data/dummyData";
import { siteConfig } from "@/config/seo.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;

  const staticEntries: MetadataRoute.Sitemap = [
    { url: baseUrl },
    { url: `${baseUrl}/about` },
    { url: `${baseUrl}/blog` },
    { url: `${baseUrl}/category` },
    { url: `${baseUrl}/tag` },
  ];

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00+09:00`),
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
  }));

  const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tag/${tag.name.toLowerCase()}`,
  }));

  return [...staticEntries, ...postEntries, ...categoryEntries, ...tagEntries];
}
