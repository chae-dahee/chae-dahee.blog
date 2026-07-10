import { getPostSlugSet } from "@/lib/markdown/posts";
import { prisma } from "@/lib/prisma";

// 실제 존재하는 글의 slug인지 검증한다. 임의 문자열로 가짜 레코드(조회수·댓글)가
// 쌓이는 것을 막기 위한 공용 가드.
export function assertValidPostSlug(slug: string) {
  if (!getPostSlugSet().has(slug)) {
    throw new Error(`Invalid post slug: ${slug}`);
  }
}

// 동일 방문자(IP HMAC 해시)·글 조합은 마지막 집계 후 1시간이 지나야 다시 집계한다.
// ViewLog 조건부 upsert와 조회수 증가는 한 트랜잭션에서 처리해 동시 요청의 중복 증가를 막는다.
export async function incrementViewCount(slug: string, visitorHash: string) {
  assertValidPostSlug(slug);

  return prisma.$transaction(async (tx) => {
    await tx.post.upsert({
      where: { slug },
      create: { slug },
      update: {},
    });

    const accepted = await tx.$queryRaw<{ accepted: number }[]>`
      INSERT INTO "ViewLog" ("postSlug", "visitorHash", "lastViewedAt")
      VALUES (${slug}, ${visitorHash}, NOW())
      ON CONFLICT ("postSlug", "visitorHash")
      DO UPDATE SET "lastViewedAt" = EXCLUDED."lastViewedAt"
      WHERE "ViewLog"."lastViewedAt" <= NOW() - INTERVAL '1 hour'
      RETURNING 1 AS "accepted"
    `;

    if (accepted.length > 0) {
      const post = await tx.post.update({
        where: { slug },
        data: { viewCount: { increment: 1 } },
        select: { viewCount: true },
      });
      return post.viewCount;
    }

    const post = await tx.post.findUniqueOrThrow({
      where: { slug },
      select: { viewCount: true },
    });
    return post.viewCount;
  });
}
