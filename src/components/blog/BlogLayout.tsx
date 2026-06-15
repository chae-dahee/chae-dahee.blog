import type { ReactNode } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-8 flex justify-center">
      <div className="flex w-full max-w-[1800px] gap-8 items-start">
        {/* 좌측 사이드바 */}
        <div className="hidden lg:block">
          <LeftSidebar />
        </div>

        {/* 중앙 콘텐츠 */}
        <main className="flex-1 bg-gray-900 border border-gray-800 p-8 min-w-0">
          {children}
        </main>

        {/* 우측 사이드바 */}
        <div className="hidden xl:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
