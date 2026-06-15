import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="w-full bg-gray-900 min-h-screen">{children}</div>
    </>
  );
}
