"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { CommentSchema } from "@/lib/schemas";
import { assertValidPostSlug } from "@/lib/data/posts";

// 댓글 작성. 로그인 사용자만 가능하며, 실제 글 slug만 허용한다.
export async function createComment(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("unauthorized"); // 서버단 1차 방어

  const { slug, content, parentId } = CommentSchema.parse({
    slug: formData.get("slug"),
    content: formData.get("content"),
    parentId: formData.get("parentId") || undefined,
  });
  assertValidPostSlug(slug); // 임의 slug로 가짜 댓글이 쌓이는 것을 막는다

  // 대댓글이면 부모가 같은 글의 '최상위' 댓글인지 검증한다.
  // 위조된 parentId, 다른 글의 댓글, 대댓글에 다시 다는 2단계 이상 중첩을 막는다.
  if (parentId) {
    const parent = await prisma.comment.findUnique({ where: { id: parentId } });
    if (!parent || parent.postSlug !== slug || parent.parentId !== null) {
      throw new Error("invalid parent");
    }
  }

  await prisma.post.upsert({ where: { slug }, create: { slug }, update: {} }); // 앵커 보장
  await prisma.comment.create({
    data: { postSlug: slug, content, parentId, authorId: session.user.id },
  });
  revalidatePath(`/blog/${slug}`); // 목록 즉시 갱신
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
