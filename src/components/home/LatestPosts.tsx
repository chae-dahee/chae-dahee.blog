import Link from "next/link";
import type { Post } from "@/types";

interface Props {
  posts: Post[];
}

export default function LatestPosts({ posts }: Props) {
  return (
    <div className="flex-1 max-w-md w-full">
      <div className="bg-black/55 backdrop-blur-sm border border-[var(--color-surface)] p-6 md:p-8">
        <h2 className="text-sm font-bold text-[var(--color-accent)] mb-4 flex items-center gap-2">
          <span className="text-[var(--color-secondary)] select-none">{"//"}</span>
          LATEST POSTS
        </h2>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm text-[var(--color-secondary)] group-hover:text-[var(--color-accent)] transition-colors leading-snug line-clamp-1">
                    {post.title}
                  </span>
                  <time
                    dateTime={post.date}
                    className="text-xs text-[var(--color-muted)] whitespace-nowrap mt-0.5 flex-shrink-0"
                  >
                    {post.date.slice(5)}
                  </time>
                </div>
                <span className="text-xs text-[var(--color-accent)] opacity-70">
                  {post.category}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-5 pt-4 border-t border-[var(--color-surface)]">
          <Link
            href="/blog"
            className="text-xs text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors"
          >
            모든 글 보기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
