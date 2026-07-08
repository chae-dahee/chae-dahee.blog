import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { Category, Post, Tag } from "@/types";

type PostFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  tags: string[];
  date: string;
  readTime: number;
  image: string;
  published: boolean;
};

type PostSource = {
  fileName: string;
  frontmatter: PostFrontmatter;
  content: string;
};

const postsDirectory = path.join(process.cwd(), "content/posts");
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
let postSourceCache: PostSource[] | null = null;

function assertStringField(
  value: unknown,
  fieldName: keyof PostFrontmatter,
  fileName: string
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid post frontmatter: ${fileName} missing ${fieldName}`);
  }

  return value;
}

function assertNumberField(
  value: unknown,
  fieldName: keyof PostFrontmatter,
  fileName: string
): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Invalid post frontmatter: ${fileName} missing ${fieldName}`);
  }

  return value;
}

function assertBooleanField(
  value: unknown,
  fieldName: keyof PostFrontmatter,
  fileName: string
): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`Invalid post frontmatter: ${fileName} missing ${fieldName}`);
  }

  return value;
}

function assertTags(value: unknown, fileName: string): string[] {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((tag) => typeof tag !== "string" || tag.trim().length === 0)
  ) {
    throw new Error(`Invalid post frontmatter: ${fileName} missing tags`);
  }

  return value;
}

function parseFrontmatter(data: Record<string, unknown>, fileName: string): PostFrontmatter {
  const date = assertStringField(data.date, "date", fileName);

  if (!datePattern.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00+09:00`))) {
    throw new Error(`Invalid post frontmatter: ${fileName} has invalid date`);
  }

  return {
    title: assertStringField(data.title, "title", fileName),
    slug: assertStringField(data.slug, "slug", fileName),
    excerpt: assertStringField(data.excerpt, "excerpt", fileName),
    category: assertStringField(data.category, "category", fileName),
    categorySlug: assertStringField(data.categorySlug, "categorySlug", fileName),
    tags: assertTags(data.tags, fileName),
    date,
    readTime: assertNumberField(data.readTime, "readTime", fileName),
    image: assertStringField(data.image, "image", fileName),
    published: assertBooleanField(data.published, "published", fileName),
  };
}

function markdownToHtml(markdown: string): string {
  return String(remark().use(remarkGfm).use(remarkHtml).processSync(markdown));
}

function readPostSource(fileName: string): PostSource {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    fileName,
    frontmatter: parseFrontmatter(data, fileName),
    content,
  };
}

function getPostSources(): PostSource[] {
  if (postSourceCache) {
    return postSourceCache;
  }

  if (!fs.existsSync(postsDirectory)) {
    postSourceCache = [];
    return postSourceCache;
  }

  const sources = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(readPostSource);

  ensureUniqueSlugs(sources.map(({ frontmatter }) => frontmatter.slug));
  postSourceCache = sources;

  return postSourceCache;
}

function getPublishedPostSources(): PostSource[] {
  return getPostSources()
    .filter(({ frontmatter }) => frontmatter.published)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

function buildPostFromSource(source: PostSource, id: number): Post {
  const { content, frontmatter } = source;

  return {
    id,
    title: frontmatter.title,
    slug: frontmatter.slug,
    excerpt: frontmatter.excerpt,
    content: markdownToHtml(content),
    category: frontmatter.category,
    categorySlug: frontmatter.categorySlug,
    tags: frontmatter.tags,
    date: frontmatter.date,
    readTime: frontmatter.readTime,
    image: frontmatter.image,
  };
}

function ensureUniqueSlugs(slugs: string[]) {
  const seen = new Set<string>();

  for (const slug of slugs) {
    if (seen.has(slug)) {
      throw new Error(`Duplicate post slug: ${slug}`);
    }

    seen.add(slug);
  }
}

export function getAllPosts(): Post[] {
  return getPublishedPostSources().map((source, index) =>
    buildPostFromSource(source, index + 1)
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  const sources = getPublishedPostSources();
  const postIndex = sources.findIndex(({ frontmatter }) => frontmatter.slug === slug);

  if (postIndex === -1) {
    return undefined;
  }

  return buildPostFromSource(sources[postIndex], postIndex + 1);
}

export function getAllCategories(): Category[] {
  const categories = new Map<string, Omit<Category, "id">>();

  for (const { frontmatter } of getPublishedPostSources()) {
    const category = categories.get(frontmatter.categorySlug);

    if (category) {
      category.count += 1;
      continue;
    }

    categories.set(frontmatter.categorySlug, {
      name: frontmatter.category,
      slug: frontmatter.categorySlug,
      count: 1,
    });
  }

  return Array.from(categories.values()).map((category, index) => ({
    id: index + 1,
    ...category,
  }));
}

export function getAllTags(): Tag[] {
  const tags = new Map<string, Omit<Tag, "id">>();

  for (const { frontmatter } of getPublishedPostSources()) {
    for (const tagName of frontmatter.tags) {
      const tagSlug = tagName.toLowerCase();
      const tag = tags.get(tagSlug);

      if (tag) {
        tag.count += 1;
        continue;
      }

      tags.set(tagSlug, {
        name: tagName,
        count: 1,
      });
    }
  }

  return Array.from(tags.values()).map((tag, index) => ({
    id: index + 1,
    ...tag,
  }));
}
