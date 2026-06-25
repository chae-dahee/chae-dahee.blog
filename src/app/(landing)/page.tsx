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
    <main className="relative w-full h-[100dvh] overflow-hidden bg-[var(--color-bg)]">
      {/* Canvas: 데스크톱 전용 */}
      <div className="hidden absolute inset-0 z-0 md:block">
        <PixelScene />
      </div>

      {/* 스크롤 배경 + 그린 틴트: 모바일 전용 */}
      <div
        className="mobile-bg-scroll absolute inset-0 z-0 md:hidden"
        style={{
          backgroundImage: "url('/pixel/bg/Sky.png')",
          backgroundSize: "auto 100%",
          backgroundRepeat: "repeat-x",
          imageRendering: "pixelated",
        }}
      >
        {/* mix-blend-mode: multiply → PixiJS tint(0x86efac)와 동일한 곱셈 방식 */}
        <div
          className="absolute inset-0 bg-green-300"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>

      {/* 오버레이 콘텐츠 */}
      <div className="flex relative z-10 flex-col justify-between gap-4 items-center px-6 py-12 w-full h-full pointer-events-none md:w-1/2 md:ml-auto md:py-[72px] md:px-10">
        <HomeHero />
        <LatestPosts posts={latestPosts} />
      </div>

      {/* CC-BY-SA 크레딧: 유령은 데스크톱에서만 표시 */}
      <p className="hidden md:block absolute bottom-2 right-3 z-20 text-[10px] text-[var(--color-secondary)] opacity-50">
        Ghost:
        <a
          href="https://opengameart.org/users/pixerat"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          PiXeRaT
        </a>
        CC BY-SA 4.0
      </p>
    </main>
  );
}
