import type { ReactNode } from "react";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <main className="flex-1 bg-gray-900 border border-gray-800 p-8 min-w-0">
      {children}
    </main>
  );
}
