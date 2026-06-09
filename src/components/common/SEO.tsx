import Head from "next/head";
import { siteConfig } from "@/config/seo.config";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  tags?: string[];
}

export default function SEO({
  title,
  description,
  url,
  image,
  type = "website",
  author,
  publishedTime,
  tags = [],
}: SEOProps) {
  // 기본값 설정
  const pageTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageUrl = url ? `${siteConfig.siteUrl}${url}` : siteConfig.siteUrl;
  const pageImage = image
    ? `${siteConfig.siteUrl}${image}`
    : `${siteConfig.siteUrl}${siteConfig.defaultImage}`;
  const pageType = type || siteConfig.type;
  const pageKeywords = [...siteConfig.keywords, ...tags].join(", ");

  return (
    <Head>
      {/* 기본 메타태그 */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={author || siteConfig.author.name} />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* Google Search Console */}
      <meta
        name="google-site-verification"
        content="QVszARVjzcRPs2sXSQCSDREFyQZ3pnWHJ3U2ge3aM70"
      />

      {/* RSS Feed */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${siteConfig.title} RSS Feed`}
        href={`${siteConfig.siteUrl}/rss.xml`}
      />

      {/* Open Graph */}
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content={siteConfig.title} />
      <meta property="og:locale" content={siteConfig.locale} />

      {/* Open Graph - Article (블로그 포스트인 경우) */}
      {type === "article" && (
        <>
          <meta
            property="article:author"
            content={author || siteConfig.author.name}
          />
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.author.twitter} />
      <meta name="twitter:creator" content={siteConfig.author.twitter} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {/* 기타 */}
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Language" content="ko" />
      <link rel="icon" href="/chae-dahee.png" />
    </Head>
  );
}
