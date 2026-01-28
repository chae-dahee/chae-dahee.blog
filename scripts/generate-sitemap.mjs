import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 더미 데이터에서 포스트 목록 가져오기
const posts = [
  { slug: "react-18-concurrent-rendering", date: "2026-01-20" },
  { slug: "nextjs-14-app-router-guide", date: "2026-01-18" },
  { slug: "core-web-vitals-optimization", date: "2026-01-15" },
  { slug: "css-grid-flexbox-master", date: "2026-01-12" },
  { slug: "typescript-generics-patterns", date: "2026-01-10" },
  { slug: "react-custom-hooks-patterns", date: "2026-01-08" },
  { slug: "nextjs-image-optimization", date: "2026-01-05" },
  { slug: "modern-javascript-async-await", date: "2026-01-03" },
];

const baseUrl = "https://chae-dahee.github.io";
const currentDate = new Date().toISOString();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 홈페이지 -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
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

// public 폴더에 sitemap.xml 생성
const publicPath = path.join(__dirname, "..", "public");
fs.writeFileSync(path.join(publicPath, "sitemap.xml"), sitemap);

console.log("✅ sitemap.xml 생성 완료!");
