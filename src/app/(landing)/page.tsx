import dynamic from "next/dynamic";
import HomeHero from "@/components/home/HomeHero";
import LatestPosts from "@/components/home/LatestPosts";
import { posts } from "@/data/dummyData";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const PixelScene = dynamic(() => import("@/components/home/PixelScene"), {
  ssr: false,
});

export const metadata: Metadata = buildMetadata({
  description:
    "프론트엔드 개발과 기술에 대한 블로그. React, Next.js, TypeScript, 웹 성능 최적화 등 다양한 주제를 다룹니다.",
  url: "/",
});

export default function HomePage() {
  const latestPosts = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <main className="relative w-full min-h-screen md:h-screen overflow-y-auto md:overflow-hidden bg-[var(--color-bg)]">
      {/* Canvas: 데스크톱 전용 */}
      <div className="hidden absolute inset-0 z-0 md:block">
        <PixelScene />
      </div>

      {/* 정적 배경: 모바일 전용 */}
      <div
        className="absolute inset-0 z-0 md:hidden"
        style={{
          backgroundImage: "url('/pixel/bg/Sky.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          imageRendering: "pixelated",
        }}
      />

      {/* 오버레이 콘텐츠 */}
      <div className="flex relative z-10 flex-col gap-5 justify-center items-center px-6 py-20 my-4 w-full min-h-screen md:items-end md:py-0 md:pr-16">
        <HomeHero />
        <LatestPosts posts={latestPosts} />
      </div>

      {/* CC-BY-SA 크레딧 */}
      <p className="absolute bottom-2 right-3 z-20 text-[10px] text-[var(--color-secondary)] opacity-50">
        Ghost:{" "}
        <a
          href="https://opengameart.org/users/pixerat"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          PiXeRaT
        </a>{" "}
        CC BY-SA 4.0
      </p>
    </main>
  );
}
