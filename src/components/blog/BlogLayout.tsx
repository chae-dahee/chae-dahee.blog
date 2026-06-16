import type { ReactNode } from "react";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <main className="flex-1 bg-[var(--color-bg)] border border-[var(--color-surface)] p-8 min-w-0">
      {children}
    </main>
  );
}
