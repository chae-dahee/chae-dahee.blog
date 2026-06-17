import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)]">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-[var(--color-accent)] mb-4">
          잘못된 경로입니다.
        </h1>
        <p className="text-[var(--color-secondary)] mb-8">
          요청하신 페이지가 존재하지 않습니다.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[var(--color-surface)] border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-muted)] transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
