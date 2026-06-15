import Layout from '@/components/common/layout';
import Link from 'next/link';
import { tags } from '@/data/dummyData';

export default function TagIndex() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-white">Tags</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tags.map((tag) => (
            <li key={tag.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition">
              <Link href={`/tag/${tag.name.toLowerCase()}`} className="text-xl font-medium text-green-400 hover:underline">
                {tag.name} ({tag.count})
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
