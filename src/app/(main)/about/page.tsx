import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "About",
  url: "/about",
});

export default function About() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 text-center">
      <h1 className="text-4xl font-bold mb-6 text-[var(--color-accent)]">About Me</h1>
      <Image
        src="/chae-dahee.png"
        alt="Chaedahhee"
        width={200}
        height={200}
        className="rounded-full mx-auto mb-6"
      />
      <p className="text-lg text-[var(--color-secondary)]">
        안녕하세요! 저는 프론트엔드와 백엔드 모두 다루는 풀스택 개발자{" "}
        <strong>Chaedahhee</strong> 입니다. 여기에 자기 소개, 경력, 기술 스택,
        프로젝트 등을 자유롭게 적으시면 됩니다.
      </p>
    </section>
  );
}
