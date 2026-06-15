import Layout from '@/components/common/layout';
import Link from 'next/link';
import { categories } from '@/data/dummyData';

export default function CategoryIndex() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-white">Categories</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <li key={cat.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition">
              <Link href={`/category/${cat.slug}`} className="text-xl font-medium text-green-400 hover:underline">
                {cat.name} ({cat.count})
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
