"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post, TocItem } from "@/types";

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  // 목차 생성 (간단한 버전)
  const tableOfContents: TocItem[] = [
    { id: "intro", title: "소개", level: 1 },
    { id: "section1", title: "주요 개념", level: 1 },
    { id: "section2", title: "실전 예제", level: 1 },
    { id: "section3", title: "베스트 프랙티스", level: 1 },
    { id: "conclusion", title: "마무리", level: 1 },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* 헤더 */}
      <header className="mb-8 pb-8 border-b border-[var(--color-muted)]">
        <div className="mb-4">
          <Link
            href={`/category/${post.categorySlug}`}
            className="inline-block px-3 py-1 text-sm font-semibold text-[var(--color-accent)] bg-[var(--color-surface)] border border-[var(--color-accent)]/30 hover:bg-[var(--color-muted)] transition-colors"
          >
            {post.category}
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-accent)] mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center text-[var(--color-secondary)] space-x-6">
          <span className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
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
              className="w-5 h-5 mr-2"
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
            {post.readTime}분 읽기
          </span>
          <span className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            1,234 views
          </span>
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag, index) => (
            <Link
              key={index}
              href={`/tag/${tag.toLowerCase()}`}
              className="inline-block px-3 py-1 text-sm font-medium text-[var(--color-accent)] bg-[var(--color-bg)] border border-[var(--color-accent)]/30 hover:bg-[var(--color-surface)] transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      <div className="flex gap-8">
        {/* 콘텐츠 */}
        <article className="flex-1">
          <div className="bg-[var(--color-bg)] border-l-4 border-[var(--color-accent)] p-4 mb-6">
            <p className="text-[var(--color-secondary)] italic">{post.excerpt}</p>
          </div>

          <div
            className="post-content text-[var(--color-secondary)] leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, "<br />"),
            }}
          />

          {/* 공유 버튼 */}
          <div className="mt-12 pt-8 border-t border-[var(--color-muted)]">
            <h3 className="text-xl font-bold text-[var(--color-accent)] mb-4">
              이 글이 도움이 되셨나요?
            </h3>
            <div className="flex gap-4">
              <button className="flex items-center px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-muted)] transition-colors">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                좋아요
              </button>
              <button className="flex items-center px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-muted)] text-[var(--color-secondary)] hover:bg-[var(--color-muted)] transition-colors">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                공유하기
              </button>
            </div>
          </div>
        </article>

        {/* 목차 (우측 고정) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <div className="bg-[var(--color-bg)] border border-[var(--color-surface)] p-5">
              <h3 className="text-lg font-bold text-[var(--color-accent)] mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
                목차
              </h3>
              <nav>
                <ul className="space-y-2">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block text-sm py-1 px-2 transition-colors ${
                          activeSection === item.id
                            ? "text-[var(--color-accent)] font-semibold border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)]"
                            : "text-[var(--color-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface)] border-l-2 border-transparent"
                        }`}
                        style={{ paddingLeft: `${item.level * 0.75}rem` }}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* 스크롤 진행률 */}
              <div className="mt-6 pt-4 border-t border-[var(--color-muted)]">
                <div className="flex justify-between text-xs text-[var(--color-secondary)] mb-2">
                  <span>읽기 진행률</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-[var(--color-surface)] border border-[var(--color-muted)] h-2">
                  <div
                    className="bg-[var(--color-accent)] h-2"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* 이전/다음 포스트 네비게이션 */}
      <div className="mt-16 pt-8 border-t border-[var(--color-muted)]">
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/posts/prev"
            className="flex items-center p-4 bg-[var(--color-surface)] border border-[var(--color-muted)] hover:border-[var(--color-accent)] transition-colors group"
          >
            <svg
              className="w-6 h-6 mr-3 text-[var(--color-secondary)] group-hover:text-[var(--color-accent)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <div>
              <div className="text-xs text-[var(--color-secondary)] mb-1">이전 글</div>
              <div className="font-semibold text-[var(--color-accent)]">
                이전 포스트 제목
              </div>
            </div>
          </Link>
          <Link
            href="/posts/next"
            className="flex items-center justify-end p-4 bg-[var(--color-surface)] border border-[var(--color-muted)] hover:border-[var(--color-accent)] transition-colors group"
          >
            <div className="text-right">
              <div className="text-xs text-[var(--color-secondary)] mb-1">다음 글</div>
              <div className="font-semibold text-[var(--color-accent)]">
                다음 포스트 제목
              </div>
            </div>
            <svg
              className="w-6 h-6 ml-3 text-[var(--color-secondary)] group-hover:text-[var(--color-accent)]"
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
          </Link>
        </div>
      </div>
    </div>
  );
}
