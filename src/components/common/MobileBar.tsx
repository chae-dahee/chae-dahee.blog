"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/common/Sidebar";
import ThemeToggle from "@/components/common/ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category, Tag } from "@/types";

export default function MobileBar({
  categories,
  tags,
}: {
  categories: Category[];
  tags: Tag[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const pageName = (() => {
    if (pathname === "/") return "Home";
    return pathname
      .replace(/^\//, "")
      .replace(/\//g, " / ")
      .replace(/[-_]/g, " ")
      .toUpperCase();
  })();

  return (
    <>
      {/* Top Bar - visible on md and below */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)] border-b border-[var(--color-surface)] flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/chae-dahee.png" alt="logo" width={32} height={32} />
          <span className="text-sm font-medium text-[var(--color-accent)]">
            닿망징창
          </span>
        </Link>
        <span className="text-sm text-[var(--color-secondary)]">
          {pageName}
        </span>
        <div className="flex items-center space-x-2">
          <ThemeToggle className="w-6 h-6 flex items-center justify-center" />
          <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          className="text-[var(--color-secondary)] hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded relative w-6 h-6"
        >
          <svg
            className={`w-6 h-6 absolute inset-0 transition-all duration-200 ${open ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            className={`w-6 h-6 absolute inset-0 transition-all duration-200 ${open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          </button>
        </div>
      </header>

      {/* Backdrop — covers content area below topbar only */}
      <div
        className={`md:hidden fixed top-12 inset-x-0 bottom-0 z-40 bg-neutral-950 transition-opacity duration-300 ${open ? "opacity-50 pointer-events-auto touch-none" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer Panel — slides in from right, below topbar */}
      <aside
        id="mobile-drawer"
        className={`md:hidden fixed top-12 right-0 z-40 w-64 h-[calc(100vh-3rem)] bg-[var(--color-bg)] border-l border-[var(--color-surface)] shadow-lg overflow-y-auto overflow-x-hidden transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <Sidebar
          categories={categories}
          tags={tags}
          className="flex border-r-0 !h-auto !w-full !p-4 text-sm"
          hideLogo
        />
      </aside>
    </>
  );
}
