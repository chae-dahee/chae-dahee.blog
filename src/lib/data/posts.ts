import { prisma } from "@/lib/prisma";

// 글의 현재 조회수를 읽는다. 아직 레코드가 없으면 0.
export async function getViewCount(slug: string) {
  const post = await prisma.post.findUnique({ where: { slug } });
  return post?.viewCount ?? 0;
}

// 조회수를 1 올린다. 레코드가 없으면 생성하면서 1로 시작.
export async function incrementViewCount(slug: string) {
  const post = await prisma.post.upsert({
    where: { slug },
    create: { slug, viewCount: 1 }, // 글 앵커가 없으면 생성
    update: { viewCount: { increment: 1 } }, // increment = 원자적 +1
  });
  return post.viewCount;
}
