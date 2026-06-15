import Layout from '@/components/common/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { categories, posts } from '@/data/dummyData';

export default function CategoryPage() {
  const { slug } = useRouter().query as { slug: string };
  const category = categories.find((c) => c.slug === slug);
  const filteredPosts = posts.filter((p) => p.categorySlug === slug);

  if (!category) {
    return (
      <Layout>
        <section className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold text-white">Category not found</h1>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6 text-white">{category.name}</h1>
        <ul className="space-y-6">
          {filteredPosts.map((post) => (
            <li key={post.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition">
              <Link href={`/blog/${post.slug}`} className="text-xl font-medium text-green-400 hover:underline">
                {post.title}
              </Link>
              <p className="text-gray-300 mt-2">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
