import Link from "next/link";
import { posts } from "@/data/dummyData";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  url: "/blog",
});

export default function Blog() {
  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-[var(--color-accent)]">
        Blog
      </h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              className="flex bg-[var(--color-surface)] border border-[var(--color-muted)] hover:border-[var(--color-accent)] transition-colors overflow-hidden group"
            >
              {/* 이미지 영역 (좌측 ~28%) */}
              <div className="relative w-[28%] sm:w-[25%] flex-shrink-0 bg-[var(--color-bg)] border-r border-[var(--color-muted)] flex items-center justify-center overflow-hidden">
                <span className="text-3xl sm:text-5xl font-bold text-[var(--color-accent)]/20">
                  {post.id}
                </span>
                <span className="absolute top-2 left-2 bg-[var(--color-surface)] border border-[var(--color-accent)] px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold text-[var(--color-accent)]">
                  {post.category}
                </span>
              </div>

              {/* 글 영역 (우측) */}
              <div className="flex-1 min-w-0 p-3 sm:p-4">
                <div className="flex items-center text-[10px] sm:text-xs text-[var(--color-secondary)] mb-1.5 gap-x-3">
                  <span>{post.date}</span>
                  <span>{post.readTime}분 읽기</span>
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-[var(--color-accent)] line-clamp-1 sm:line-clamp-2">
                  {post.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[var(--color-secondary)] line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
