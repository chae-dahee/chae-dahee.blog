import Link from "next/link";
import type { Post } from "@/types";

interface Props {
  posts: Post[];
}

export default function LatestPosts({ posts }: Props) {
  return (
    <div className="min-h-24 flex flex-col max-w-md w-full md:max-w-none">
      <div className="bg-white/55 backdrop-blur-sm border border-gray-200 p-4 md:p-8 h-full overflow-hidden flex flex-col">
        <h2 className="text-sm font-bold text-green-700 mb-3 md:mb-4 flex items-center gap-2 flex-shrink-0">
          <span className="text-gray-700 select-none">{"//"}</span>
          LATEST POSTS
        </h2>
        <ul className="space-y-3 flex-1 overflow-y-auto min-h-0 overscroll-contain">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm text-gray-700 group-hover:text-green-700 transition-colors leading-snug line-clamp-1">
                    {post.title}
                  </span>
                  <time
                    dateTime={post.date}
                    className="text-xs text-gray-500 whitespace-nowrap mt-0.5 flex-shrink-0"
                  >
                    {post.date.slice(5)}
                  </time>
                </div>
                <span className="text-xs text-green-700 opacity-70">
                  {post.category}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-3 border-t border-gray-200 flex-shrink-0">
          <Link
            href="/blog"
            className="text-xs text-gray-700 hover:text-green-700 transition-colors"
          >
            모든 글 보기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
