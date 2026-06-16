import Sidebar from "@/components/common/Sidebar";
import MobileBar from "@/components/common/MobileBar";
import Footer from "@/components/common/footer";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Mobile Top Bar */}
      <MobileBar />

      {/* Main Content + Footer */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8 md:p-10">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
