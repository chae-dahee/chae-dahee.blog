import Link from "next/link";
import type { Post } from "@/types";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="max-w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-accent)] mb-2">최근 포스트</h1>
        <p className="text-[var(--color-secondary)]">
          프론트엔드 개발과 관련된 다양한 주제를 다룹니다
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-[var(--color-surface)] border border-[var(--color-muted)] hover:border-[var(--color-accent)] transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              {/* 이미지 영역 */}
              <div className="relative h-48 bg-[var(--color-bg)] border-b border-[var(--color-muted)] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-[var(--color-accent)]/20 text-6xl font-bold">
                  {post.id}
                </div>
                <div className="absolute top-4 right-4 bg-[var(--color-surface)] border border-[var(--color-accent)] px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
                  {post.category}
                </div>
              </div>

              {/* 콘텐츠 영역 */}
              <div className="p-6">
                <div className="flex items-center text-xs text-[var(--color-secondary)] mb-3 space-x-4">
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {post.readTime}분
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[var(--color-accent)] mb-3 group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-[var(--color-secondary)] text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* 태그 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs font-medium text-[var(--color-accent)] bg-[var(--color-bg)] border border-[var(--color-accent)]/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-[var(--color-accent)] font-medium text-sm group-hover:translate-x-2 transition-transform">
                  자세히 보기
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* 모든 포스트 보기 버튼 */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 text-base font-medium text-[var(--color-accent)] bg-[var(--color-surface)] border border-[var(--color-accent)] hover:bg-[var(--color-muted)] transition-all shadow-sm"
        >
          모든 포스트 보기
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
