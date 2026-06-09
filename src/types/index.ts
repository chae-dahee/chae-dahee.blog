// ─── Post ────────────────────────────────────────────────────────────────────

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  tags: string[];
  date: string;
  readTime: number;
  image: string;
}

// ─── Category ────────────────────────────────────────────────────────────────

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// ─── Tag ─────────────────────────────────────────────────────────────────────

export interface Tag {
  id: number;
  name: string;
  count: number;
}

// ─── Sitemap ──────────────────────────────────────────────────────────────────

export interface SitemapItem {
  label: string;
  path: string;
}

// ─── Social ──────────────────────────────────────────────────────────────────

export type SocialIcon = "github" | "linkedin" | "twitter" | "email";

export interface Social {
  name: string;
  url: string;
  icon: SocialIcon;
}

// ─── BlogInfo ────────────────────────────────────────────────────────────────

export interface BlogAuthor {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email: string;
}

export interface BlogInfo {
  title: string;
  subtitle: string;
  author: BlogAuthor;
  social: Social[];
}

// ─── SiteConfig ──────────────────────────────────────────────────────────────

export interface SiteConfigAuthor {
  name: string;
  email: string;
  twitter: string;
}

export interface SiteConfigSocial {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  siteUrl: string;
  author: SiteConfigAuthor;
  social: SiteConfigSocial;
  keywords: string[];
  defaultImage: string;
  locale: string;
  type: string;
}

// ─── TableOfContents ─────────────────────────────────────────────────────────

export interface TocItem {
  id: string;
  title: string;
  level: number;
}
