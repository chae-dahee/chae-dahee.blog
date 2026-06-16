import Layout from '@/components/common/layout';
import Link from 'next/link';
import { posts } from '@/data/dummyData';

export default function Blog() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-[var(--color-accent)]">Blog</h1>
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id} className="bg-[var(--color-surface)] p-4 hover:bg-[var(--color-muted)] transition">
              <Link href={`/posts/${post.slug}`} className="text-xl font-medium text-[var(--color-accent)] hover:underline">
                {post.title}
              </Link>
              <p className="text-[var(--color-secondary)] mt-2">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
