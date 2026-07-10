/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // 댓글·조회수 서버 액션이 런타임에 content/posts를 읽으므로
    // 서버리스 번들에 Markdown 파일 포함을 보장한다.
    outputFileTracingIncludes: {
      "/**": ["./content/posts/**/*"],
    },
  },
  images: {
    remotePatterns: [
      // GitHub 프로필 아바타(로그인 사용자 표시용)
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
