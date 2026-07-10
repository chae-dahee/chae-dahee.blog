import type { MetadataRoute } from "next";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/markdown/posts";
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

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00+09:00`),
  }));

  const categoryEntries: MetadataRoute.Sitemap = getAllCategories().map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
  }));

  const tagEntries: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${baseUrl}/tag/${tag.name.toLowerCase()}`,
  }));

  return [...staticEntries, ...postEntries, ...categoryEntries, ...tagEntries];
}
