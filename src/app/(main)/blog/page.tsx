import { getAllPosts } from "@/lib/markdown/posts";
import PostCard from "@/components/blog/PostCard";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  url: "/blog",
});

export default function Blog() {
  const posts = getAllPosts();

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-[var(--color-accent)]">
        Blog
      </h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
