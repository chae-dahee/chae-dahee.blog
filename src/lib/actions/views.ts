"use server";

import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { incrementViewCount } from "@/lib/data/posts";

function getVisitorHash() {
  const requestHeaders = headers();
  const forwardedFor =
    requestHeaders.get("x-vercel-forwarded-for") ??
    requestHeaders.get("x-forwarded-for") ??
    requestHeaders.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0]?.trim();
  if (!ip) throw new Error("Unable to determine visitor IP");

  const secret = process.env.VIEW_HASH_SECRET;
  if (!secret) throw new Error("VIEW_HASH_SECRET is not configured");

  return createHmac("sha256", secret).update(ip).digest("hex");
}

// 클라이언트에서 호출하는 쓰기 진입점. 동일 IP·글은 1시간에 한 번만 집계하고
// 집계 여부와 무관하게 현재 확정 조회수를 돌려준다.
// slug 검증은 incrementViewCount 내부(assertValidPostSlug)에서 수행하므로
// 임의 문자열로 가짜 레코드를 만들 수 없다.
export async function bumpView(slug: string) {
  return incrementViewCount(slug, getVisitorHash());
}
