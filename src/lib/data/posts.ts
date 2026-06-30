import { posts } from "@/data/dummyData";
import { prisma } from "@/lib/prisma";

function assertValidPostSlug(slug: string) {
  if (!posts.some((post) => post.slug === slug)) {
    throw new Error(`Invalid post slug: ${slug}`);
  }
}

// 조회수를 1 올린다. 레코드가 없으면 생성하면서 1로 시작.
export async function incrementViewCount(slug: string) {
  assertValidPostSlug(slug);

  const post = await prisma.post.upsert({
    where: { slug },
    create: { slug, viewCount: 1 }, // 글 앵커가 없으면 생성
    update: { viewCount: { increment: 1 } }, // increment = 원자적 +1
  });
  return post.viewCount;
}
