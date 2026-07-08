---
title: "React 18의 새로운 기능들: Concurrent Rendering 이해하기"
slug: "react-18-concurrent-rendering"
excerpt: "React 18에서 도입된 Concurrent Rendering의 개념과 실제 사용 방법을 알아봅니다. Suspense, Transition API 등 새로운 기능들을 실습 예제와 함께 살펴보겠습니다."
category: "React 시리즈"
categorySlug: "react-series"
tags: ["React", "Hooks", "Performance"]
date: "2026-01-20"
readTime: 8
image: "/placeholder-react.jpg"
published: true
---

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
