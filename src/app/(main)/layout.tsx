import Sidebar from "@/components/common/Sidebar";
import MobileBar from "@/components/common/MobileBar";
import Footer from "@/components/common/footer";
import { getAllCategories, getAllTags, getAllPosts } from "@/lib/markdown/posts";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = getAllCategories();
  const tags = getAllTags();
  const postCount = getAllPosts().length;

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <Sidebar categories={categories} tags={tags} postCount={postCount} className="hidden md:flex" />
      <MobileBar categories={categories} tags={tags} postCount={postCount} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 pt-20 md:p-10 md:pt-10">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
