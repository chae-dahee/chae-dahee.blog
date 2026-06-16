import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[var(--color-bg)] border-b border-[var(--color-accent)] shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/chae-dahee.png"
              alt="chae-dahee"
              width={40}
              height={40}
              className=""
            />
            <div>
              <h1 
                className="text-xl font-bold text-[var(--color-accent)]"
                style={{ 
                  display: 'inline-block', 
                  overflow: 'hidden', 
                  whiteSpace: 'nowrap', 
                  borderRight: '0.15em solid var(--color-accent)', 
                  width: `9ch`, 
                  animation: `typing 1.5s steps(9, end), blink-caret 0.75s step-end infinite` 
                }}
              >닿망징창의 터미널</h1>
              <p className="text-xs text-[var(--color-accent)] mt-1">Tech Blog</p>
            </div>
          </Link>

          {/* 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-[var(--color-secondary)] hover:text-[var(--color-accent)] font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/category"
              className="text-[var(--color-secondary)] hover:text-[var(--color-accent)] font-medium transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/tag"
              className="text-[var(--color-secondary)] hover:text-[var(--color-accent)] font-medium transition-colors"
            >
              Tags
            </Link>
            <Link
              href="/about"
              className="text-[var(--color-secondary)] hover:text-[var(--color-accent)] font-medium transition-colors"
            >
              About
            </Link>
          </nav>

          {/* 검색 버튼 */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-surface)] hover:bg-[var(--color-muted)] border border-[var(--color-muted)] transition-colors">
            <svg
              className="w-5 h-5 text-[var(--color-accent)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-sm text-[var(--color-secondary)] hidden md:inline">검색</span>
          </button>
        </div>
      </div>
    </header>
  );
}
