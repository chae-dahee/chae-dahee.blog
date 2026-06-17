import PostList from "@/components/blog/PostList";
import { posts } from "@/data/dummyData";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  description:
    "프론트엔드 개발과 기술에 대한 블로그. React, Next.js, TypeScript, 웹 성능 최적화 등 다양한 주제를 다룹니다.",
  url: "/",
});

export default function Home() {
  return <PostList posts={posts} />;
}
