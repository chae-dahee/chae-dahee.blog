"use client";

import { useEffect } from "react";
import { bumpView } from "@/lib/actions/views";

// 화면엔 아무것도 그리지 않고, 글 진입 시 조회수 +1만 트리거한다.
export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    bumpView(slug);
  }, [slug]);

  return null;
}
