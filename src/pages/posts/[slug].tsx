import BlogLayout from "@/components/blog/BlogLayout";
import PostDetail from "@/components/blog/PostDetail";
import SEO from "@/components/common/SEO";
import { posts } from "@/data/dummyData";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import type { Post } from "@/types";

interface PostPageProps {
  slug: string;
}

export default function PostPage({ slug }: PostPageProps) {

  // 슬러그로 포스트 찾기
  const post: Post | undefined = posts.find((p) => p.slug === slug);

  // 포스트가 없는 경우
  if (!post) {
    return (
      <BlogLayout>
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            포스트를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-8">
            요청하신 포스트가 존재하지 않습니다.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </BlogLayout>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        url={`/posts/${post.slug}`}
        image={post.image}
        type="article"
        publishedTime={`${post.date}T00:00:00+09:00`}
        tags={post.tags}
      />
      <BlogLayout>
        <PostDetail post={post} />
      </BlogLayout>
    </>
  );
}

// 정적 경로 생성 (SSG)
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

// 정적 props 생성
export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  return {
    props: {
      slug: params?.slug as string,
    },
  };
};
