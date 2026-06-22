import Link from "next/link";
import type { Post } from "@/types";
import PostCard from "@/components/blog/PostCard";

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

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
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
