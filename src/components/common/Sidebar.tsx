"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { sitemap, blogInfo } from "@/data/dummyData";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useTypewriter } from "@/hooks/useTypewriter";
import { GitHubIcon, TwitterIcon, LinkedInIcon, EmailIcon } from "@/components/common/icons";
import type { Category, SocialIcon, Tag } from "@/types";

const SOCIAL_ICON_MAP: Record<SocialIcon, ComponentType<{ className?: string }>> = {
  github: GitHubIcon,
  twitter: TwitterIcon,
  linkedin: LinkedInIcon,
  email: EmailIcon,
};

export default function Sidebar({
  categories,
  tags,
  className,
  hideLogo,
}: {
  categories: Category[];
  tags: Tag[];
  className?: string;
  hideLogo?: boolean;
}) {
  const typedName = useTypewriter(blogInfo.author.name);

  return (
    <aside className={`flex flex-col w-72 bg-[var(--color-bg)] border-r border-[var(--color-surface)] sticky top-0 h-screen overflow-y-auto p-6 ${className ?? ''}`}>

      {/* Logo + Site name */}
      {!hideLogo && (
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold text-[var(--color-accent)]">닿망징창의 터미널</h1>
          <ThemeToggle />
        </div>
      )}

      {/* Profile */}
      <div className="mb-8 text-center">
        <Image src={blogInfo.author.avatar} alt={blogInfo.author.name} width={80} height={80} className="rounded-full mx-auto" />
        <h3 className="text-xl font-bold text-[var(--color-accent)] mb-1 mx-auto flex items-center justify-center">
          {typedName}
          <span className="w-2 h-5 bg-[var(--color-accent)] animate-pulse ml-1"></span>
        </h3>
        <p className="text-sm text-[var(--color-secondary)]">{blogInfo.author.role}</p>
        <p className="text-xs text-[var(--color-secondary)] mt-1">{blogInfo.author.bio}</p>
      </div>

      {/* Navigation (Home, About, Blog) */}
      <nav className="mb-8">
        <ul className="space-y-2">
          {sitemap.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className="terminal-hover block px-3 py-2 text-[var(--color-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface)] transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Categories */}
      <section className="mb-8">
        <h3 className="text-lg font-bold text-[var(--color-accent)] mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
          카테고리
        </h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link href={`/category/${cat.slug}`} className="terminal-hover flex items-center justify-between px-3 py-2 text-[var(--color-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface)] transition-colors">
                <span>{cat.name}</span>
                <span className="text-xs bg-[var(--color-surface)] text-[var(--color-accent)] px-2 py-1">{cat.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Tags */}
      <section className="mb-8">
        <h3 className="text-lg font-bold text-[var(--color-accent)] mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
          태그
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag.id} href={`/tag/${tag.name.toLowerCase()}`} className="inline-flex items-center px-3 py-1 text-xs font-medium text-[var(--color-secondary)] bg-[var(--color-surface)] hover:bg-[var(--color-muted)] hover:text-[var(--color-accent)] border border-[var(--color-muted)]">
              #{tag.name} <span className="ml-1 text-[var(--color-accent)]">({tag.count})</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Social */}
      <section className="mb-8">
        <h3 className="text-lg font-bold text-[var(--color-accent)] mb-4">Connect</h3>
        <div className="grid grid-cols-4 gap-2">
          {blogInfo.social.map((social) => {
            const Icon = SOCIAL_ICON_MAP[social.icon];
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 text-[var(--color-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface)] transition-colors"
                aria-label={social.name}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="mt-8 bg-[var(--color-surface)] p-4">
        <h3 className="text-lg font-bold text-[var(--color-accent)] mb-4">Blog Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-center text-[var(--color-secondary)]">
          <div><div className="text-2xl font-bold text-[var(--color-accent)]">8</div><div className="text-xs">Posts</div></div>
          <div><div className="text-2xl font-bold text-[var(--color-accent)]">5</div><div className="text-xs">Categories</div></div>
          <div><div className="text-2xl font-bold text-[var(--color-accent)]">10</div><div className="text-xs">Tags</div></div>
          <div><div className="text-2xl font-bold text-[var(--color-accent)]">2.5K</div><div className="text-xs">Views</div></div>
        </div>
      </section>
    </aside>
  );
}
