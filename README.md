# 🖥️ 닿망징창의 터미널

> 프론트엔드 개발과 기술을 기록하는 개인 블로그

본문은 Markdown 파일로 관리하고, 조회수·댓글 같은 동적 데이터만 DB에 두는 하이브리드 구조로 만들었습니다.

🔗 **https://dahee.dev**

## ✨ 주요 기능

- 📝 **글 & 분류** — Markdown 기반 글, 카테고리·태그별 탐색
- 💬 **댓글** — GitHub 로그인, 대댓글 스레드
- 👀 **조회수** — 방문자별 중복 없이 집계
- 📖 **읽기 도우미** — 목차, 읽기 진행바, 공유 버튼
- 🌗 **다크 모드** — 라이트/다크 테마 전환
- 🕹️ **픽셀 아트 랜딩** — 시차 스크롤 인터랙션
- 🔍 **SEO & 피드** — 메타데이터, RSS, 사이트맵

## 🛠️ 기술 스택

| 구분 | 기술 | 비고 |
| --- | --- | --- |
| 프레임워크 | Next.js 14 (App Router), React 18 | Server Components 기반 |
| 언어 | TypeScript | |
| 스타일 | Tailwind CSS | CSS 토큰 기반 라이트/다크 테마 |
| 데이터베이스 | PostgreSQL (Neon), Prisma | |
| 인증 | Auth.js (next-auth) | GitHub OAuth |
| 콘텐츠 | Markdown, gray-matter, remark(+gfm/html) | hast-util-sanitize로 정화 |
| 그래픽·모션 | pixi.js, framer-motion | 픽셀 아트 랜딩 씬 |
| 검증 | zod | 서버·클라이언트 공유 스키마 |
| 배포 | Vercel | |

## 🧩 구현 포인트

- 🗃️ **하이브리드 콘텐츠**
	- 글 본문은 Markdown 파일로 관리
	- DB엔 slug 앵커와 동적 데이터(조회수·댓글)만 저장
- 🔒 **익명 조회수 집계**
	- IP를 HMAC-SHA256으로 해시해 원문을 남기지 않음
	- 동일 IP·글은 1시간에 한 번만 집계
- 🪦 **댓글 soft delete**
	- 대댓글이 달린 댓글은 tombstone으로 유지
	- DB 제약(`onDelete: Restrict`)이 부모의 hard delete를 차단
- 🧼 **입력 정화**
	- 렌더링 시 hast-util-sanitize로 HTML 정화
	- 사용자 입력 기반 XSS 방지
- ♻️ **공유 검증 스키마**
	- zod 스키마와 상수를 서버 액션·클라이언트가 공유
	- 검증 규칙을 한 곳에서 일원화

## 🗂️ 프로젝트 구조

```
src/
├─ app/                    # Next.js App Router
│  ├─ (landing)/           # 픽셀 아트 랜딩 페이지
│  ├─ (main)/              # 블로그 본체
│  │  ├─ blog/[slug]/      # 글 상세
│  │  ├─ category/[slug]/  # 카테고리별 목록
│  │  ├─ tag/[slug]/       # 태그별 목록
│  │  └─ about/            # 소개
│  ├─ api/auth/            # Auth.js 라우트
│  ├─ rss.xml/             # RSS 피드
│  └─ sitemap.ts           # 사이트맵
├─ components/
│  ├─ blog/                # 글·댓글·조회수·TOC·공유
│  ├─ common/              # 헤더·푸터·사이드바·테마 토글
│  └─ home/                # 히어로·최신 글·픽셀 씬
├─ lib/
│  ├─ actions/             # 서버 액션 (조회수·댓글)
│  ├─ data/                # DB 접근 계층
│  ├─ markdown/            # 글 파싱·렌더링
│  └─ schemas.ts           # zod 스키마
content/posts/             # Markdown 글 원문
prisma/                    # 스키마·마이그레이션
```
