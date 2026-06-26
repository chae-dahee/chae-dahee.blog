// SEO 기본 설정
import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  title: "Chae Dahee's Tech Blog",
  description:
    "프론트엔드 개발과 기술에 대한 블로그. React, Next.js, TypeScript, 웹 성능 최적화 등 다양한 주제를 다룹니다.",
  siteUrl: "https://chae-dahee.vercel.app",
  author: {
    name: "채다희",
    email: "cdh010126r@gmail.com",
    twitter: "@Djocken86",
  },
  social: {
    github: "https://github.com/chae-dahee",
    linkedin: "https://linkedin.com/in/chae-dahee",
    twitter: "https://twitter.com/Djocken86",
  },
  keywords: [
    "프론트엔드",
    "Frontend",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "웹 개발",
    "Web Development",
    "블로그",
    "Tech Blog",
    "채다희",
  ],
  defaultImage: "/chae-dahee.png",
  locale: "ko_KR",
};
