import Sidebar from "@/components/common/Sidebar";
import MobileBar from "@/components/common/MobileBar";
import Footer from "@/components/common/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <Sidebar className="hidden md:flex" />
      <MobileBar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 pt-20 md:p-10 md:pt-10">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
