import Layout from '@/components/common/layout';
import Link from 'next/link';
import { dummyPosts } from '@/data/dummyData';

export default function Blog() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-white">Blog</h1>
        <ul className="space-y-6">
          {dummyPosts.map((post) => (
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
