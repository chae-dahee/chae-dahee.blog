import { prisma } from "@/lib/prisma";

/** 댓글 도배 방지 정책(authorId 단위). 간격 미달·버스트 초과 중 하나만 걸려도 차단한다. */
const COMMENT_MIN_INTERVAL_SEC = 15;
const COMMENT_BURST_LIMIT = 5;
const COMMENT_BURST_WINDOW_SEC = 300;

// 글의 최상위 댓글 목록을 최신순으로 조회한다(작성자 정보 포함).
// 각 댓글의 대댓글(replies)은 작성자 정보와 함께 오래된 순으로 붙여 온다. 중첩은 1단계로 제한한다.
export async function getComments(slug: string) {
  return prisma.comment.findMany({
    where: { postSlug: slug, parentId: null },
    include: {
      author: true,
      replies: {
        include: { author: true },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

// 최상위 댓글(대댓글 목록 포함)과 대댓글 1건의 타입.
export type CommentWithAuthor = Awaited<ReturnType<typeof getComments>>[number];
export type ReplyWithAuthor = CommentWithAuthor["replies"][number];

export type RateLimitStatus = { ok: true } | { ok: false; retryAfterSec: number };

/**
 * 댓글 도배 방지 판정. 최신 댓글 조회 한 번으로
 * 최소 간격과 버스트 상한을 함께 검사한다.
 */
export async function getCommentRateLimitStatus(authorId: string): Promise<RateLimitStatus> {
  const now = Date.now();
  // 두 정책 중 긴 창 기준으로 조회해, 상수를 조정해도 간격 검사가 누락되지 않게 한다
  const windowSec = Math.max(COMMENT_MIN_INTERVAL_SEC, COMMENT_BURST_WINDOW_SEC);
  const recent = await prisma.comment.findMany({
    where: { authorId, createdAt: { gte: new Date(now - windowSec * 1000) } },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
    take: COMMENT_BURST_LIMIT, // 판정에는 최신 LIMIT건이면 충분
  });

  let retryAfterSec = 0;

  if (recent.length > 0) {
    const sinceLastSec = (now - recent[0].createdAt.getTime()) / 1000;
    if (sinceLastSec < COMMENT_MIN_INTERVAL_SEC) {
      retryAfterSec = Math.ceil(COMMENT_MIN_INTERVAL_SEC - sinceLastSec);
    }
  }

  // LIMIT번째로 최신인 댓글이 버스트 창을 벗어나야 상한 아래로 내려간다
  if (recent.length >= COMMENT_BURST_LIMIT) {
    const pivotMs = recent[COMMENT_BURST_LIMIT - 1].createdAt.getTime();
    const waitSec = Math.ceil((pivotMs + COMMENT_BURST_WINDOW_SEC * 1000 - now) / 1000);
    if (waitSec > 0) retryAfterSec = Math.max(retryAfterSec, waitSec);
  }

  return retryAfterSec > 0 ? { ok: false, retryAfterSec } : { ok: true };
}
