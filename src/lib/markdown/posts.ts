import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { defaultSchema } from "hast-util-sanitize";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { visit } from "unist-util-visit";
import type { Heading, PhrasingContent, Root } from "mdast";
import type { Category, Post, PostSummary, Tag, TocItem } from "@/types";

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

type RenderedPost = {
  html: string;
  toc: TocItem[];
  inlineTocId?: string;
};

const postsDirectory = path.join(process.cwd(), "content/posts");
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const markdownSanitizeSchema = {
  ...defaultSchema,
  clobberPrefix: "",
};
let postSourceCache: PostSource[] | null = null;
let postSlugCache: ReadonlySet<string> | null = null;
const renderedPostCache = new Map<string, RenderedPost>();

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isTags(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString);
}

function assertField<T>(
  value: unknown,
  fieldName: keyof PostFrontmatter,
  fileName: string,
  isValid: (candidate: unknown) => candidate is T
): T {
  if (!isValid(value)) {
    throw new Error(
      `Invalid post frontmatter: ${fileName} missing or invalid ${fieldName}`
    );
  }

  return value;
}

function parseFrontmatter(data: Record<string, unknown>, fileName: string): PostFrontmatter {
  const date = assertField(data.date, "date", fileName, isNonEmptyString);

  if (!datePattern.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00+09:00`))) {
    throw new Error(`Invalid post frontmatter: ${fileName} has invalid date`);
  }

  return {
    title: assertField(data.title, "title", fileName, isNonEmptyString),
    slug: assertField(data.slug, "slug", fileName, isNonEmptyString),
    excerpt: assertField(data.excerpt, "excerpt", fileName, isNonEmptyString),
    category: assertField(data.category, "category", fileName, isNonEmptyString),
    categorySlug: assertField(data.categorySlug, "categorySlug", fileName, isNonEmptyString),
    tags: assertField(data.tags, "tags", fileName, isTags),
    date,
    readTime: assertField(data.readTime, "readTime", fileName, isFiniteNumber),
    image: assertField(data.image, "image", fileName, isNonEmptyString),
    published: assertField(data.published, "published", fileName, isBoolean),
  };
}

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

function getUniqueHeadingId(baseId: string, usedIds: Set<string>): string {
  const fallbackId = baseId || "section";
  let id = fallbackId;
  let suffix = 1;

  while (usedIds.has(id)) {
    suffix += 1;
    id = `${fallbackId}-${suffix}`;
  }

  usedIds.add(id);

  return id;
}

function getMarkdownText(node: PhrasingContent): string {
  if ("value" in node && typeof node.value === "string") {
    return node.value;
  }

  if ("alt" in node && typeof node.alt === "string") {
    return node.alt;
  }

  if ("children" in node) {
    return node.children.map(getMarkdownText).join("");
  }

  return "";
}

function getRenderedPost(source: PostSource): RenderedPost {
  const cached = renderedPostCache.get(source.fileName);

  if (cached !== undefined) {
    return cached;
  }

  const toc: TocItem[] = [];
  const usedIds = new Set<string>();
  let inlineTocId: string | undefined;

  const collectHeadings = () => (tree: Root) => {
    visit(tree, "heading", (node: Heading) => {
      if (node.depth < 2 || node.depth > 4) {
        return;
      }

      const title = node.children.map(getMarkdownText).join("").trim();
      const id = getUniqueHeadingId(slugifyHeading(title), usedIds);

      node.data = {
        ...node.data,
        hProperties: {
          ...node.data?.hProperties,
          id,
        },
      };

      if (title === "목차") {
        inlineTocId = id;
      } else {
        toc.push({ id, title, level: node.depth });
      }
    });
  };

  const html = String(
    remark()
      .use(remarkGfm)
      .use(collectHeadings)
      .use(remarkHtml, { sanitize: markdownSanitizeSchema })
      .processSync(source.content)
  );
  const renderedPost = { html, toc, inlineTocId };
  renderedPostCache.set(source.fileName, renderedPost);

  return renderedPost;
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
  ensureConsistentCategoryNames(sources);
  postSourceCache = sources;

  return postSourceCache;
}

function getPublishedPostSources(): PostSource[] {
  return getPostSources()
    .filter(({ frontmatter }) => frontmatter.published)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

function buildPostFromSource(source: PostSource, id: number): Post {
  const { frontmatter } = source;
  const renderedPost = getRenderedPost(source);

  return {
    id,
    title: frontmatter.title,
    slug: frontmatter.slug,
    excerpt: frontmatter.excerpt,
    content: renderedPost.html,
    toc: renderedPost.toc,
    inlineTocId: renderedPost.inlineTocId,
    category: frontmatter.category,
    categorySlug: frontmatter.categorySlug,
    tags: frontmatter.tags,
    date: frontmatter.date,
    readTime: frontmatter.readTime,
    image: frontmatter.image,
  };
}

function buildPostSummary(source: PostSource): PostSummary {
  return {
    title: source.frontmatter.title,
    slug: source.frontmatter.slug,
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

function ensureConsistentCategoryNames(sources: PostSource[]) {
  const namesBySlug = new Map<string, string>();

  for (const { fileName, frontmatter } of sources) {
    const existingName = namesBySlug.get(frontmatter.categorySlug);

    if (existingName !== undefined && existingName !== frontmatter.category) {
      throw new Error(
        `Inconsistent category name for slug "${frontmatter.categorySlug}": "${existingName}" vs "${frontmatter.category}" (${fileName})`
      );
    }

    namesBySlug.set(frontmatter.categorySlug, frontmatter.category);
  }
}

export function getAllPosts(): Post[] {
  return getPublishedPostSources().map((source, index) =>
    buildPostFromSource(source, index + 1)
  );
}

// slug 존재 여부 검증용. Post 변환(Markdown→HTML)을 거치지 않아 런타임 API에서도 가볍고,
// 배포 단위로 콘텐츠가 불변이므로 인스턴스당 1회만 생성한다.
export function getPostSlugSet(): ReadonlySet<string> {
  if (!postSlugCache) {
    postSlugCache = new Set(
      getPublishedPostSources().map(({ frontmatter }) => frontmatter.slug)
    );
  }

  return postSlugCache;
}

export function getPostBySlug(slug: string): Post | undefined {
  const sources = getPublishedPostSources();
  const postIndex = sources.findIndex(({ frontmatter }) => frontmatter.slug === slug);

  if (postIndex === -1) {
    return undefined;
  }

  return buildPostFromSource(sources[postIndex], postIndex + 1);
}

export function getAdjacentPosts(slug: string): {
  previousPost?: PostSummary;
  nextPost?: PostSummary;
} {
  const sources = getPublishedPostSources();
  const postIndex = sources.findIndex(({ frontmatter }) => frontmatter.slug === slug);

  if (postIndex === -1) {
    return {};
  }

  return {
    previousPost: sources[postIndex + 1]
      ? buildPostSummary(sources[postIndex + 1])
      : undefined,
    nextPost: sources[postIndex - 1]
      ? buildPostSummary(sources[postIndex - 1])
      : undefined,
  };
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
