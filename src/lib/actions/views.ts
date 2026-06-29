"use server";

import { incrementViewCount } from "@/lib/data/posts";

// 클라이언트에서 호출하는 쓰기 진입점. 진입 시 조회수 +1.
export async function bumpView(slug: string) {
  return incrementViewCount(slug);
}
