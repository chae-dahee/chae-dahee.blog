// 블로그 더미 데이터
import type { BlogInfo, Category, Tag, Post, SitemapItem } from "@/types";

export const blogInfo: BlogInfo = {
  title: "닿망징창의 터미널",
  subtitle: "프론트엔드 개발과 기술 이야기",
  author: {
    name: "닿다라다나닷",
    role: "Frontend Developer",
    bio: "사용자 경험을 중시하는 프론트엔드 개발자입니다. React, Next.js, TypeScript를 주로 다루며, 아름다운 UI와 성능 최적화에 관심이 많습니다.",
    avatar: "/chae-dahee.png",
    email: "chae-dahee@example.com",
  },
  social: [
    { name: "GitHub", url: "https://github.com/chae-dahee", icon: "github" },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/chae-dahee",
      icon: "linkedin",
    },
    { name: "Twitter", url: "https://twitter.com/chae-dahee", icon: "twitter" },
    { name: "Email", url: "mailto:chae-dahee@example.com", icon: "email" },
  ],
};

export const categories: Category[] = [
  { id: 1, name: "React 시리즈", slug: "react-series", count: 8 },
  { id: 2, name: "Next.js 완벽 가이드", slug: "nextjs-guide", count: 6 },
  { id: 3, name: "웹 성능 최적화", slug: "web-performance", count: 5 },
  { id: 4, name: "CSS 디자인", slug: "css-design", count: 4 },
  { id: 5, name: "JavaScript 심화", slug: "javascript-deep-dive", count: 7 },
];

export const tags: Tag[] = [
  { id: 1, name: "React", count: 15 },
  { id: 2, name: "Next.js", count: 12 },
  { id: 3, name: "TypeScript", count: 10 },
  { id: 4, name: "CSS", count: 8 },
  { id: 5, name: "Performance", count: 7 },
  { id: 6, name: "Hooks", count: 9 },
  { id: 7, name: "SSR", count: 6 },
  { id: 8, name: "SEO", count: 5 },
  { id: 9, name: "TailwindCSS", count: 4 },
  { id: 10, name: "Web Vitals", count: 6 },
];

export const posts: Post[] = [
  {
    id: 1,
    title: "React 18의 새로운 기능들: Concurrent Rendering 이해하기",
    slug: "react-18-concurrent-rendering",
    excerpt:
      "React 18에서 도입된 Concurrent Rendering의 개념과 실제 사용 방법을 알아봅니다. Suspense, Transition API 등 새로운 기능들을 실습 예제와 함께 살펴보겠습니다.",
    content: `
# React 18의 새로운 기능들: Concurrent Rendering 이해하기

## 목차
- Concurrent Rendering이란?
- 주요 새 기능
- Suspense와 데이터 페칭
- useTransition Hook
- 실전 예제
- 마무리

## Concurrent Rendering이란?

React 18의 가장 큰 변화는 Concurrent Rendering의 도입입니다. 이는 React가 여러 작업을 동시에 준비하고, 우선순위에 따라 렌더링을 중단하거나 재개할 수 있게 해줍니다.

## 주요 새 기능

### 1. Automatic Batching
기존에는 이벤트 핸들러 내부에서만 배칭이 작동했지만, React 18부터는 모든 업데이트가 자동으로 배칭됩니다.

### 2. Transitions
사용자 인터랙션의 우선순위를 지정할 수 있습니다.

### 3. Suspense 개선
서버 사이드 렌더링에서도 Suspense를 사용할 수 있게 되었습니다.

## 실전 예제

자세한 코드 예제와 설명은 본문에서 계속됩니다...
    `,
    category: "React 시리즈",
    categorySlug: "react-series",
    tags: ["React", "Hooks", "Performance"],
    date: "2026-01-20",
    readTime: 8,
    image: "/placeholder-react.jpg",
  },
  {
    id: 2,
    title: "Next.js 14 App Router 완벽 가이드",
    slug: "nextjs-14-app-router-guide",
    excerpt:
      "Next.js 14의 App Router를 처음부터 끝까지 상세하게 다룹니다. Server Components, Streaming, Layouts 등 핵심 개념을 실습 프로젝트와 함께 학습해봅시다.",
    content: `
# Next.js 14 App Router 완벽 가이드

## 목차
- App Router 소개
- 파일 기반 라우팅
- Server Components vs Client Components
- 레이아웃과 템플릿
- 데이터 페칭 전략
- 실습: 블로그 만들기

## App Router 소개

Next.js 13부터 도입된 App Router는 React Server Components를 기반으로 한 새로운 라우팅 시스템입니다...
    `,
    category: "Next.js 완벽 가이드",
    categorySlug: "nextjs-guide",
    tags: ["Next.js", "React", "SSR"],
    date: "2026-01-18",
    readTime: 12,
    image: "/placeholder-nextjs.jpg",
  },
  {
    id: 3,
    title: "웹 성능 최적화: Core Web Vitals 개선하기",
    slug: "core-web-vitals-optimization",
    excerpt:
      "Google의 Core Web Vitals 지표를 이해하고, LCP, FID, CLS를 개선하는 실전 전략들을 소개합니다. 측정부터 최적화까지 단계별로 알아봅니다.",
    content: `
# 웹 성능 최적화: Core Web Vitals 개선하기

## 목차
- Core Web Vitals란?
- LCP 최적화
- FID 개선 방법
- CLS 해결하기
- 측정 도구
- 실전 체크리스트

## Core Web Vitals란?

Core Web Vitals는 Google이 정의한 웹 페이지의 사용자 경험을 측정하는 핵심 지표입니다...
    `,
    category: "웹 성능 최적화",
    categorySlug: "web-performance",
    tags: ["Performance", "SEO", "Web Vitals"],
    date: "2026-01-15",
    readTime: 10,
    image: "/placeholder-performance.jpg",
  },
  {
    id: 4,
    title: "CSS Grid와 Flexbox 마스터하기",
    slug: "css-grid-flexbox-master",
    excerpt:
      "현대 CSS 레이아웃의 핵심인 Grid와 Flexbox를 완벽하게 이해합니다. 언제 어떤 것을 사용해야 하는지, 실무 패턴들을 다양한 예제로 익혀봅니다.",
    content: `
# CSS Grid와 Flexbox 마스터하기

## 목차
- Grid vs Flexbox
- Flexbox 완전 정복
- Grid 시스템 이해하기
- 반응형 레이아웃
- 실전 패턴
- 브라우저 호환성

## Grid vs Flexbox

Grid와 Flexbox는 서로 다른 목적을 가진 레이아웃 시스템입니다...
    `,
    category: "CSS 디자인",
    categorySlug: "css-design",
    tags: ["CSS", "TailwindCSS"],
    date: "2026-01-12",
    readTime: 9,
    image: "/placeholder-css.jpg",
  },
  {
    id: 5,
    title: "TypeScript 제네릭 활용 패턴",
    slug: "typescript-generics-patterns",
    excerpt:
      "TypeScript의 제네릭을 실무에서 효과적으로 활용하는 방법을 배웁니다. 타입 안정성을 유지하면서 재사용 가능한 코드를 작성하는 고급 패턴들을 소개합니다.",
    content: `
# TypeScript 제네릭 활용 패턴

## 목차
- 제네릭 기초
- 제약 조건 활용하기
- 유틸리티 타입 만들기
- 실전 패턴
- 타입 추론 최적화
- 베스트 프랙티스

## 제네릭 기초

제네릭은 타입을 파라미터화하여 재사용 가능한 컴포넌트를 만드는 도구입니다...
    `,
    category: "JavaScript 심화",
    categorySlug: "javascript-deep-dive",
    tags: ["TypeScript", "JavaScript"],
    date: "2026-01-10",
    readTime: 11,
    image: "/placeholder-typescript.jpg",
  },
  {
    id: 6,
    title: "React Custom Hooks 디자인 패턴",
    slug: "react-custom-hooks-patterns",
    excerpt:
      "재사용 가능하고 테스트하기 쉬운 Custom Hooks를 만드는 방법을 학습합니다. 실무에서 자주 사용되는 패턴들과 안티패턴을 함께 살펴봅니다.",
    content: `
# React Custom Hooks 디자인 패턴

## 목차
- Custom Hooks란?
- 기본 패턴
- 고급 패턴
- 테스팅 전략
- 실무 예제
- 피해야 할 안티패턴

## Custom Hooks란?

Custom Hooks는 React의 상태 로직을 재사용 가능한 함수로 추출하는 방법입니다...
    `,
    category: "React 시리즈",
    categorySlug: "react-series",
    tags: ["React", "Hooks"],
    date: "2026-01-08",
    readTime: 7,
    image: "/placeholder-hooks.jpg",
  },
  {
    id: 7,
    title: "Next.js 이미지 최적화 완벽 가이드",
    slug: "nextjs-image-optimization",
    excerpt:
      "Next.js의 Image 컴포넌트를 활용한 이미지 최적화 전략을 다룹니다. 자동 최적화, lazy loading, 반응형 이미지 등 성능 향상 기법들을 실습합니다.",
    content: `
# Next.js 이미지 최적화 완벽 가이드

## 목차
- Next.js Image 컴포넌트
- 자동 최적화
- 반응형 이미지
- Lazy Loading
- 성능 측정
- 베스트 프랙티스

## Next.js Image 컴포넌트

Next.js 10부터 도입된 Image 컴포넌트는 자동 이미지 최적화 기능을 제공합니다...
    `,
    category: "Next.js 완벽 가이드",
    categorySlug: "nextjs-guide",
    tags: ["Next.js", "Performance", "SEO"],
    date: "2026-01-05",
    readTime: 6,
    image: "/placeholder-image-opt.jpg",
  },
  {
    id: 8,
    title: "모던 JavaScript: async/await 완벽 이해하기",
    slug: "modern-javascript-async-await",
    excerpt:
      "JavaScript의 비동기 처리를 마스터합니다. Promise부터 async/await까지, 에러 핸들링과 병렬 처리 패턴을 실전 예제로 학습합니다.",
    content: `
# 모던 JavaScript: async/await 완벽 이해하기

## 목차
- Promise 기초
- async/await 문법
- 에러 핸들링
- 병렬 처리
- 실전 패턴
- 성능 고려사항

## Promise 기초

Promise는 비동기 작업의 결과를 나타내는 객체입니다...
    `,
    category: "JavaScript 심화",
    categorySlug: "javascript-deep-dive",
    tags: ["JavaScript", "React"],
    date: "2026-01-03",
    readTime: 8,
    image: "/placeholder-async.jpg",
  },
];

export const sitemap: SitemapItem[] = [
  { label: "홈", path: "/" },
  { label: "소개", path: "/about" },
  { label: "블로그", path: "/blog" },
];
