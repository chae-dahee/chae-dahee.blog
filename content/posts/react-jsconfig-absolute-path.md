---
title: "[React] jsconfig.json으로 절대경로 만들기"
slug: "react-jsconfig-absolute-path"
excerpt: "CRA에서 baseUrl로 절대경로를 설정하는 방법과, @ alias를 지정하는 paths가 왜 동작하지 않는지 정리한다."
category: "FrontEnd"
subcategory: "react"
tags: ["React", "jsconfig", "CRA"]
date: "2023-11-03T17:21"
published: true
---

컴포넌트를 불러올 때 상대경로가 길어지면 파일 위치를 옮길 때마다 경로를 다시 세어야 한다.

```jsx
import Home from '../../Home'
```

이런 경로가 늘어나는 것을 막기 위해 절대경로를 설정한다.

## baseUrl로 절대경로 만들기

JS 프로젝트라면 프로젝트 루트, 즉 `package.json`과 같은 위치에 `jsconfig.json`을 만든다. TS 프로젝트는 같은 설정을 `tsconfig.json`에 넣는다.

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": [
    "src"
  ]
}
```

이제 `src`를 기준으로 경로를 쓸 수 있다.

```jsx
// before
import Home from '../../Home'

// after
import Home from 'pages/Home'
```

`baseUrl`에 넣을 수 있는 값은 `src`와 `node_modules` 둘뿐이다. 다른 값을 넣으면 react-scripts가 빌드를 멈추고 다음 오류를 낸다.

> Your project's `baseUrl` can only be set to `src` or `node_modules`.

## @ alias를 지정하는 paths는 CRA에서 동작하지 않는다

`paths`로 `@hooks`, `@components` 같은 alias를 지정하는 방법이 널리 알려져 있다.

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@hooks/*": ["hooks/*"],
      "@components/*": ["components/*"],
      "@layouts/*": ["layouts/*"],
      "@pages/*": ["pages/*"]
    }
  }
}
```

그런데 CRA에서는 이 설정이 적용되지 않는다. react-scripts의 `config/modules.js`는 `baseUrl`만 읽어 webpack과 Jest의 alias를 만들고 `paths`는 아예 참조하지 않는다. 잘못된 설정이라고 알려주지도 않고 조용히 무시한다.

여기서 헷갈리기 쉬운 부분은 VS Code가 `jsconfig.json`의 `paths`를 읽는다는 점이다. 에디터에서는 자동완성과 정의 이동이 정상 동작하니 설정이 먹은 것처럼 보이는데, 빌드는 모듈을 찾지 못하고 실패한다. 에디터와 빌드 도구가 서로 다른 설정을 보기 때문이다.

CRA에서 alias가 꼭 필요하면 `craco`나 `react-app-rewired`로 webpack 설정을 덧붙이거나 eject해야 한다.

## 설정을 고친 뒤에는 개발 서버를 재시작한다

`jsconfig.json`은 개발 서버가 시작할 때 읽는다. 설정을 추가하거나 고쳤는데 경로가 그대로 깨진다면 서버를 재시작해 본다.

## 덧붙임

이 글은 2023년 11월에 정리한 메모다. 2025년 2월 React 공식 블로그가 CRA를 deprecated로 발표하고, 프레임워크나 Vite 같은 빌드 도구로 이전할 것을 권했다. Vite는 `vite.config.js`의 `resolve.alias`로 alias를 정식 지원하므로, 새로 시작하는 프로젝트라면 `paths`가 무시되는 문제를 애초에 겪지 않는다.
