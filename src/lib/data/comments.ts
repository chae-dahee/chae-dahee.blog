import { prisma } from "@/lib/prisma";

// 글의 최상위 댓글 목록을 최신순으로 조회한다(작성자 정보 포함).
// 대댓글(replies)은 스키마상 준비돼 있으나 작성 UI는 후속 단계에서 다룬다.
export async function getComments(slug: string) {
  return prisma.comment.findMany({
    where: { postSlug: slug, parentId: null },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });
}

export type CommentWithAuthor = Awaited<ReturnType<typeof getComments>>[number];
