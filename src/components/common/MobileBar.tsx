import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MobileBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pageName = router.pathname === "/" ? "Home" : router.pathname.replace("/", "").replace(/[-_]/g, " ").toUpperCase();

  return (
    <>
      {/* Top Bar - visible on md and below */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-[var(--color-bg)] border-b border-[var(--color-surface)] z-40 flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/chae-dahee.png" alt="logo" width={32} height={32} />
          <span className="text-sm font-medium text-[var(--color-accent)]">닿망징창의 터미널</span>
        </Link>
        <span className="text-sm text-[var(--color-secondary)]">{pageName}</span>
        <button onClick={() => setOpen(true)} className="text-[var(--color-secondary)] hover:text-[var(--color-accent)] focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </header>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0" style={{ backgroundColor: "var(--color-bg)", opacity: 0.7 }} onClick={() => setOpen(false)} />
          <aside className="fixed top-0 left-0 w-72 h-full bg-[var(--color-bg)] shadow-lg overflow-y-auto">
            <button onClick={() => setOpen(false)} className="absolute top-2 right-2 text-[var(--color-secondary)] hover:text-[var(--color-accent)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <Sidebar className="block md:hidden" />
          </aside>
        </div>
      )}
    </>
  );
}
