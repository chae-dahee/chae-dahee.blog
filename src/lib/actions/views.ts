"use server";

import { incrementViewCount } from "@/lib/data/posts";

// 클라이언트에서 호출하는 쓰기 진입점. 진입 시 조회수 +1 후 갱신된 값을 돌려준다.
// slug 검증은 incrementViewCount 내부(assertValidPostSlug)에서 수행하므로
// 임의 문자열로 가짜 레코드를 만들 수 없다.
export async function bumpView(slug: string) {
  return incrementViewCount(slug);
}
