import type { GetServerSideProps } from "next";
import { posts } from "@/data/dummyData";
import { siteConfig } from "@/config/seo.config";

function generateSiteMap(): string {
  const baseUrl = siteConfig.siteUrl;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 홈페이지 -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- 블로그 포스트 -->
  ${posts
    .map((post) => {
      return `<url>
    <loc>${baseUrl}/posts/${post.slug}</loc>
    <lastmod>${post.date}T00:00:00+09:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("\n  ")}
</urlset>`;
}

function SiteMap() {
  // getServerSideProps가 처리하므로 컴포넌트는 null 반환
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
