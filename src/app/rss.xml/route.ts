import { getAllPosts } from "@/lib/markdown/posts";
import { siteConfig } from "@/config/seo.config";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// 값에 "]]>"가 포함되면 CDATA 섹션을 분할해 조기 종료를 막는다.
function cdata(value: string): string {
  return `<![CDATA[${value.replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

function generateRssFeed(): string {
  const posts = getAllPosts();
  const baseUrl = siteConfig.siteUrl;
  const buildDate = new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${escapeXml(baseUrl)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ko</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${escapeXml(`${baseUrl}/rss.xml`)}" rel="self" type="application/rss+xml"/>

    ${posts
      .map((post) => {
        const postUrl = `${baseUrl}/blog/${post.slug}`;
        const pubDate = new Date(post.date).toUTCString();
        return `<item>
      <title>${cdata(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <description>${cdata(post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(`${siteConfig.author.email} (${siteConfig.author.name})`)}</author>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`;
      })
      .join("\n    ")}
  </channel>
</rss>`;
}

export async function GET() {
  const feed = generateRssFeed();
  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
