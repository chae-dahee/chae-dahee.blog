import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const prefix =
    process.env.NODE_ENV === "production"
      ? "https://chae-dahee.github.io/"
      : "";

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src={`${prefix}/chae-dahee.png`}
              alt="chae-dahee"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Chae Dahee</h1>
              <p className="text-xs text-gray-500">Tech Blog</p>
            </div>
          </Link>

          {/* 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#categories"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/#tags"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Tags
            </Link>
            <Link
              href="/#about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
          </nav>

          {/* 검색 버튼 */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <svg
              className="w-5 h-5 text-gray-600"
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
            <span className="text-sm text-gray-700 hidden md:inline">검색</span>
          </button>
        </div>
      </div>
    </header>
  );
}
