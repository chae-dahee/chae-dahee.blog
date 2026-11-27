import Image from "next/image";
import PostLink from "@/components/common/PostLink";
import { formatPostDay, toPostDateTimeAttr } from "@/lib/postDate";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <PostLink
      href={`/blog/${post.slug}`}
      className="flex bg-[var(--color-surface)] border border-[var(--color-muted)] hover:border-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] transition-colors overflow-hidden group"
    >
      {/* 이미지 영역 (좌측 ~28%) */}
      <div
        className={`relative w-[28%] sm:w-[25%] flex-shrink-0 border-r border-[var(--color-muted)] overflow-hidden ${
          post.image ? "bg-[var(--color-bg)]" : "bg-[var(--color-muted)]"
        }`}
      >
        {post.image && (
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 896px) 224px, (min-width: 640px) 25vw, 28vw"
            className="object-cover"
          />
        )}
      </div>

      {/* 글 영역 (우측) */}
      <div className="flex-1 min-w-0 p-3 sm:p-4">
        <div className="flex items-center text-[10px] sm:text-xs text-[var(--color-secondary)] mb-1.5 gap-x-3">
          <time dateTime={toPostDateTimeAttr(post.date)}>{formatPostDay(post.date)}</time>
          <span>{post.category}</span>
        </div>
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-[var(--color-accent)] line-clamp-1 sm:line-clamp-2">
          {post.title}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[var(--color-secondary)] line-clamp-2">
          {post.excerpt}
        </p>
        <div className="hidden sm:flex flex-wrap gap-2 mt-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-0.5 text-xs font-medium text-[var(--color-accent)] bg-[var(--color-bg)] border border-[var(--color-accent)]/30"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </PostLink>
  );
}
