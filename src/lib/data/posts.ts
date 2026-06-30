import { posts } from "@/data/dummyData";
import { prisma } from "@/lib/prisma";

// 실제 존재하는 글의 slug인지 검증한다. 임의 문자열로 가짜 레코드(조회수·댓글)가
// 쌓이는 것을 막기 위한 공용 가드.
export function assertValidPostSlug(slug: string) {
  if (!posts.some((post) => post.slug === slug)) {
    throw new Error(`Invalid post slug: ${slug}`);
  }
}

// 글의 현재 조회수를 읽는다. 아직 레코드가 없으면 0.
export async function getViewCount(slug: string) {
  assertValidPostSlug(slug);

  const post = await prisma.post.findUnique({ where: { slug } });
  return post?.viewCount ?? 0;
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
