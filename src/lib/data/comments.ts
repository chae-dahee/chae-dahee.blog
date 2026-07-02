import { prisma } from "@/lib/prisma";

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
