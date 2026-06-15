import Link from "next/link";
import { categories, tags, sitemap } from "@/data/dummyData";

export default function LeftSidebar() {
  return (
    <aside className="w-64 bg-gray-900 border border-gray-800 p-6 overflow-y-auto sticky top-8 h-[calc(100vh-4rem)]">
      {/* 카테고리(시리즈) */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-green-500 mb-4 flex items-center">
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
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          카테고리
        </h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/category/${category.slug}`}
                className="flex items-center justify-between text-gray-300 hover:text-green-500 hover:bg-gray-800 px-3 py-2 transition-colors border border-transparent hover:border-gray-700 terminal-hover"
              >
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs bg-gray-800 text-green-400 px-2 py-1 border border-gray-700">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 태그 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-green-500 mb-4 flex items-center">
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
              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
            />
          </svg>
          태그
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tag/${tag.name.toLowerCase()}`}
              className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-green-500 border border-gray-700 transition-colors"
            >
              #{tag.name}
              <span className="ml-1 text-green-600">({tag.count})</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 사이트맵 */}
      <div>
        <h3 className="text-lg font-bold text-green-500 mb-4 flex items-center">
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
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          사이트맵
        </h3>
        <ul className="space-y-2">
          {sitemap.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className="block text-sm text-gray-300 hover:text-green-500 hover:bg-gray-800 px-3 py-2 border border-transparent hover:border-gray-700 transition-colors terminal-hover"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
