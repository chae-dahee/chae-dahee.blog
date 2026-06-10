import type { GetServerSideProps } from "next";
import { posts } from "@/data/dummyData";
import { siteConfig } from "@/config/seo.config";

function generateRssFeed(): string {
  const baseUrl = siteConfig.siteUrl;
  const buildDate = new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.title}</title>
    <link>${baseUrl}</link>
    <description>${siteConfig.description}</description>
    <language>ko</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    
    ${posts
      .map((post) => {
        const postUrl = `${baseUrl}/posts/${post.slug}`;
        const pubDate = new Date(post.date).toUTCString();

        return `<item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${siteConfig.author.email} (${siteConfig.author.name})</author>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`;
      })
      .join("\n    ")}
  </channel>
</rss>`;
}

function RssFeed() {
  // getServerSideProps가 처리하므로 컴포넌트는 null 반환
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = generateRssFeed();

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  res.write(feed);
  res.end();

  return {
    props: {},
  };
};

export default RssFeed;
