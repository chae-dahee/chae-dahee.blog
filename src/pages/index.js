import BlogLayout from "@/components/blog/BlogLayout";
import PostList from "@/components/blog/PostList";
import SEO from "@/components/common/SEO";
import { posts } from "@/data/dummyData";

export default function Home() {
  return (
    <>
      <SEO
        title="홈"
        description="프론트엔드 개발과 기술에 대한 블로그. React, Next.js, TypeScript, 웹 성능 최적화 등 다양한 주제를 다룹니다."
        url="/"
      />
      <BlogLayout>
        <PostList posts={posts} />
      </BlogLayout>
    </>
  );
}
