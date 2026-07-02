"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import CommentForm from "./CommentForm";

// 최상위 댓글의 헤더~답글 영역(클라이언트). 답글 버튼(헤더, 삭제 좌측)과
// 작성 폼(스레드 하단)이 열림 상태를 공유해야 해서 한 컴포넌트로 감싼다.
//  - header: 아바타·이름·날짜 (서버 렌더)
//  - actions: 본인 댓글이면 삭제 버튼 (서버 렌더)
//  - content: 본문 (서버 렌더, 멘션 강조 포함)
//  - children: 대댓글 목록 (서버 렌더)
// 대댓글·작성 폼은 좌측 가이드선으로 들여써 부모에 속함을 나타낸다(글리프 미사용).
// 유일한 프롬프트 글리프는 작성 폼 내부의 '>' 프리픽스뿐이다.
export default function ReplyThread({
  slug,
  parentId,
  canReply,
  header,
  actions,
  content,
  children,
}: {
  slug: string;
  parentId: string;
  canReply: boolean;
  header: ReactNode;
  actions?: ReactNode;
  content: ReactNode;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const hasThread = Boolean(children) || open;

  return (
    <>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2 min-w-0">{header}</div>
        <div className="flex items-center gap-3 shrink-0">
          {canReply && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="text-xs text-[var(--color-secondary)] hover:text-[var(--color-accent)] underline-offset-2 hover:underline transition-colors"
            >
              답글
            </button>
          )}
          {actions}
        </div>
      </div>

      {content}

      {hasThread && (
        <div className="mt-2 pl-4 border-l border-[var(--color-muted)] flex flex-col gap-2">
          {children}
          {open && (
            <CommentForm
              slug={slug}
              parentId={parentId}
              autoFocus
              onSuccess={() => setOpen(false)}
              onCancel={() => setOpen(false)}
            />
          )}
        </div>
      )}
    </>
  );
}
