import Link from "next/link";

interface TaxonomyIndexItem {
  key: string | number;
  href: string;
  label: string;
}

interface TaxonomyIndexGridProps {
  title: string;
  items: TaxonomyIndexItem[];
}

/**
 * 카테고리·태그 인덱스 그리드.
 * category·tag 인덱스 페이지가 제목과 항목 목록만 달리하여 공유한다.
 * @param title - 페이지 상단 제목 (예: "Categories", "Tags")
 * @param items - 각 항목의 고유 key·링크 href·표시 label
 */
export default function TaxonomyIndexGrid({ title, items }: TaxonomyIndexGridProps) {
  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-[var(--color-accent)]">{title}</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <li
            key={item.key}
            className="bg-[var(--color-surface)] rounded-lg p-4 hover:bg-[var(--color-muted)] transition"
          >
            <Link
              href={item.href}
              className="text-xl font-medium text-[var(--color-accent)] hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
