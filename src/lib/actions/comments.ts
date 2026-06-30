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

  const { slug, content } = CommentSchema.parse({
    slug: formData.get("slug"),
    content: formData.get("content"),
  });
  assertValidPostSlug(slug); // 임의 slug로 가짜 댓글이 쌓이는 것을 막는다

  await prisma.post.upsert({ where: { slug }, create: { slug }, update: {} }); // 앵커 보장
  await prisma.comment.create({
    data: { postSlug: slug, content, authorId: session.user.id },
  });
  revalidatePath(`/blog/${slug}`); // 목록 즉시 갱신
}

// 댓글 삭제. 본인 댓글만 삭제할 수 있다. 폼의 hidden input으로 id·slug를 받는다.
export async function deleteComment(formData: FormData) {
  const id = String(formData.get("id"));
  const slug = String(formData.get("slug"));

  const session = await auth();
  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) throw new Error("not found");
  if (comment.authorId !== session?.user?.id) throw new Error("forbidden"); // 본인만
  await prisma.comment.delete({ where: { id } });
  revalidatePath(`/blog/${slug}`);
}
