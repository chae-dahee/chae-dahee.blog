import type { Metadata } from "next";
import { siteConfig } from "@/config/seo.config";

interface MetadataOptions {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}

export function buildMetadata(opts: MetadataOptions = {}): Metadata {
  const pageTitle = opts.title ?? siteConfig.title;
  const description = opts.description ?? siteConfig.description;
  const url = opts.url ? `${siteConfig.siteUrl}${opts.url}` : siteConfig.siteUrl;
  const image = opts.image ?? siteConfig.defaultImage;
  const keywords = [...siteConfig.keywords, ...(opts.tags ?? [])];

  return {
    title: pageTitle,
    description,
    keywords,
    authors: [{ name: siteConfig.author.name }],
    openGraph: {
      type: opts.type ?? "website",
      url,
      title: pageTitle,
      description,
      images: [{ url: image }],
      siteName: siteConfig.title,
      locale: siteConfig.locale,
      ...(opts.type === "article" && opts.publishedTime
        ? { publishedTime: opts.publishedTime }
        : {}),
      ...(opts.tags?.length ? { tags: opts.tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.author.twitter,
      creator: siteConfig.author.twitter,
      title: pageTitle,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
    },
  };
}
