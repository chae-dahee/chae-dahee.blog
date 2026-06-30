"use client";

import { useEffect, useRef, useState } from "react";
import { bumpView } from "@/lib/actions/views";

// 본문은 정적(SSG)으로 두고, 조회수만 클라이언트 마운트 시 +1 후 갱신값을 표시한다.
// 값이 도착하기 전에는 "—"를 보여준다(본문·SEO에는 영향 없음).
export default function ViewCounter({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);
  // StrictMode(개발)에서 effect가 두 번 실행돼 중복 증가하는 것을 막는다.
  const bumpedSlug = useRef<string | null>(null);

  useEffect(() => {
    if (bumpedSlug.current === slug) return;
    bumpedSlug.current = slug;
    bumpView(slug)
      .then(setCount)
      .catch(() => {});
  }, [slug]);

  return <>{count === null ? "—" : count.toLocaleString()} views</>;
}
