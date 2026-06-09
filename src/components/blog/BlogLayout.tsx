import type { ReactNode } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 좌측 사이드바 */}
      <LeftSidebar />

      {/* 중앙 콘텐츠 */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>

      {/* 우측 사이드바 */}
      <RightSidebar />
    </div>
  );
}
