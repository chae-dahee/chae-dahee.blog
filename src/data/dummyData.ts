// 블로그 더미 데이터
import type { BlogInfo, SitemapItem, CareerItem, ProjectItem } from "@/types";

export const blogInfo: BlogInfo = {
  title: "닿망징창의 터미널",
  subtitle: "프론트엔드 개발과 기술 이야기",
  author: {
    name: "닿다라다나닷",
    role: "Frontend Developer",
    bio: "사용자 경험을 중시하는 프론트엔드 개발자입니다. React, Next.js, TypeScript를 주로 다루며, 아름다운 UI와 성능 최적화에 관심이 많습니다.",
    avatar: "/chae-dahee.png",
    email: "chae@dahee.dev",
  },
  social: [
    { name: "GitHub", url: "https://github.com/chae-dahee", icon: "github" },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/chae-dahee",
      icon: "linkedin",
    },
    { name: "Twitter", url: "https://twitter.com/chae-dahee", icon: "twitter" },
    { name: "Email", url: "mailto:chae@dahee.dev", icon: "email" },
  ],
};

export const sitemap: SitemapItem[] = [
  { label: "홈", path: "/" },
  { label: "소개", path: "/about" },
  { label: "블로그", path: "/blog" },
];

export const career: CareerItem[] = [
  {
    id: 1,
    organization: "COTATO",
    role: "프론트엔드 개발자",
    period: "2023.03 - 현재",
    description: "대학 연합 IT 동아리에서 웹 프론트엔드 개발 활동. 팀 프로젝트 주도 및 스터디 운영.",
    logo: "/cotato.png",
    skills: ["React", "TypeScript", "TailwindCSS"],
  },
  {
    id: 2,
    organization: "UMC (University MakeUs Challenge)",
    role: "웹 파트",
    period: "2023.09 - 2024.02",
    description: "대학생 연합 IT 프로젝트 동아리. 스프링/리액트 기반 팀 프로젝트 수료.",
    logo: "/umc.webp",
    skills: ["React", "JavaScript", "Spring Boot"],
  },
  {
    id: 3,
    organization: "Programmers",
    role: "코딩 교육 수료",
    period: "2023.07",
    description: "프로그래머스 데브코스 프론트엔드 심화 과정 수료.",
    logo: "/programmers.jpg",
    skills: ["JavaScript", "React"],
  },
];

export const projects: ProjectItem[] = [
  {
    id: 1,
    name: "SyncSpot",
    description: "팀원들의 실시간 위치를 공유하고 최적의 만남 장소를 추천하는 모바일 웹 서비스. 지도 기반 인터페이스와 실시간 소켓 통신 구현.",
    image: "/syncspot.png",
    period: "2024.03 - 2024.06",
    github: "https://github.com/chae-dahee/syncspot",
    skills: ["React", "TypeScript", "TailwindCSS", "WebSocket"],
    role: "Frontend Lead",
  },
  {
    id: 2,
    name: "BookitList",
    description: "책 검색, 독서 기록, 리뷰 공유가 가능한 소셜 독서 플랫폼. 카카오 도서 API 연동 및 무한 스크롤 구현.",
    image: "/BookitList.jpeg",
    period: "2023.09 - 2023.12",
    skills: ["React", "JavaScript", "Styled-Components"],
    role: "Frontend Developer",
  },
  {
    id: 3,
    name: "MyGoodPrice",
    description: "온라인 쇼핑몰 상품의 가격을 비교하고 최저가를 찾아주는 가격 비교 서비스.",
    image: "/MyGoodPrice.jpg",
    period: "2023.06 - 2023.08",
    skills: ["React", "TypeScript", "REST API"],
    role: "Frontend Developer",
  },
  {
    id: 4,
    name: "ShowMailer",
    description: "공연·전시 일정을 구독하면 예매 오픈 알림을 이메일로 발송하는 서비스.",
    image: "/showMailer.jpg",
    period: "2024.01 - 2024.03",
    skills: ["Next.js", "TypeScript", "TailwindCSS"],
    role: "Frontend Developer",
  },
  {
    id: 5,
    name: "Unity 게임 프로젝트",
    description: "Unity 엔진으로 제작한 2D 플랫폼 퍼즐 게임. 물리 엔진 활용 및 레벨 디자인 담당.",
    image: "/unity.jpg",
    period: "2022.09 - 2022.12",
    skills: ["Unity", "C#", "Game Design"],
    role: "Developer & Designer",
  },
];
