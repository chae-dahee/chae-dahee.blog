import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { siteConfig } from "@/config/seo.config";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name }],
  openGraph: {
    type: "website",
    siteName: siteConfig.title,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
  verification: {
    google: "QVszARVjzcRPs2sXSQCSDREFyQZ3pnWHJ3U2ge3aM70",
  },
  icons: { icon: "/chae-dahee.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          // 페인트 전에 테마를 적용해 깜빡임(FOUC) 방지
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':!window.matchMedia('(prefers-color-scheme: light)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
