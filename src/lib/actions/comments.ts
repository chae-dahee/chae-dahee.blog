"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { CommentSchema } from "@/lib/schemas";
import { assertValidPostSlug } from "@/lib/data/posts";
import { getCommentRateLimitStatus } from "@/lib/data/comments";

export type CreateCommentResult =
  | { ok: true }
  | { ok: false; error: "rate_limited"; retryAfterSec: number };

/**
 * 댓글 작성. 로그인 사용자만 가능하며, 실제 글 slug만 허용한다.
 *
 * 도배 방지(rate_limited)는 예상된 거부라 반환값으로 알리고,
 * 그 외 실패(인증·검증)는 예외로 던진다.
 */
export async function createComment(formData: FormData): Promise<CreateCommentResult> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("unauthorized"); // 서버단 1차 방어
  const authorId = session.user.id;

  const { slug, content, parentId } = CommentSchema.parse({
    slug: formData.get("slug"),
    content: formData.get("content"),
    parentId: formData.get("parentId") || undefined,
  });
  assertValidPostSlug(slug); // 임의 slug로 가짜 댓글이 쌓이는 것을 막는다

  // 도배 판정과 생성을 같은 트랜잭션에서 작성자 단위로 직렬화한다.
  // 잠금이 없으면 병렬 요청이 판정을 동시에 통과해 15초/5분 제한이 뚫린다.
  const result = await prisma.$transaction(async (tx): Promise<CreateCommentResult> => {
    // 작성자 키 잠금(트랜잭션 종료 시 자동 해제). 같은 작성자의 다른 요청은 여기서 대기한다.
    // 반환 타입이 void라 $queryRaw는 역직렬화에 실패하므로 $executeRaw를 쓴다.
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${authorId}))`;

    const rateLimit = await getCommentRateLimitStatus(authorId, tx);
    if (!rateLimit.ok) {
      return { ok: false, error: "rate_limited", retryAfterSec: rateLimit.retryAfterSec };
    }

    if (parentId) {
      // 부모가 같은 글의 '최상위' 댓글인지 검증(위조·타 글·2단계 이상 중첩 차단).
      // FOR UPDATE로 잠가, 검증 직후 부모가 삭제되어 FK 위반으로 실패하는 경합을 없앤다.
      const [parent] = await tx.$queryRaw<
        { postSlug: string; parentId: string | null }[]
      >`SELECT "postSlug", "parentId" FROM "Comment" WHERE "id" = ${parentId} FOR UPDATE`;
      if (!parent || parent.postSlug !== slug || parent.parentId !== null) {
        throw new Error("invalid parent");
      }
    }

    await tx.post.upsert({ where: { slug }, create: { slug }, update: {} }); // 앵커 보장
    await tx.comment.create({
      data: { postSlug: slug, content, parentId, authorId },
    });
    return { ok: true };
  });

  if (result.ok) revalidatePath(`/blog/${slug}`); // 목록 즉시 갱신
  return result;
}

// 댓글 삭제. 본인 댓글만 삭제할 수 있다. 폼의 hidden input으로 id만 받는다.
export async function deleteComment(formData: FormData) {
  const id = String(formData.get("id"));

  const session = await auth();
  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) throw new Error("not found");
  if (comment.authorId !== session?.user?.id) throw new Error("forbidden"); // 본인만
  await prisma.comment.delete({ where: { id } });
  // 재검증 대상 slug는 클라이언트 입력이 아니라 서버가 조회한 레코드에서 가져온다.
  // (클라이언트가 slug를 위조하면 엉뚱한 글 캐시만 비워질 수 있으므로)
  revalidatePath(`/blog/${comment.postSlug}`);
}
