import Layout from '@/components/common/layout';
import Link from 'next/link';
import { tags, posts } from '@/data/dummyData';
import type { GetStaticPaths, GetStaticProps } from 'next';

interface TagPageProps {
  slug: string;
}

export default function TagPage({ slug }: TagPageProps) {
  const tag = tags.find((t) => t.name.toLowerCase() === slug.toLowerCase());
  const filteredPosts = posts.filter((p) => p.tags.map((t) => t.toLowerCase()).includes(slug.toLowerCase()));

  if (!tag) {
    return (
      <Layout>
        <section className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold text-[var(--color-accent)]">Tag not found</h1>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6 text-[var(--color-accent)]">Tag: {tag.name}</h1>
        <ul className="space-y-6">
          {filteredPosts.map((post) => (
            <li key={post.id} className="bg-[var(--color-surface)] rounded-lg p-4 hover:bg-[var(--color-muted)] transition">
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

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: tags.map((t) => ({ params: { slug: t.name.toLowerCase() } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<TagPageProps> = async ({ params }) => ({
  props: { slug: params?.slug as string },
});
