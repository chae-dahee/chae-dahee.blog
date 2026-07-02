"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createComment } from "@/lib/actions/comments";
import { MAX_COMMENT_LENGTH } from "@/lib/constants";

// 제출 중에는 useFormStatus로 pending을 감지해 버튼을 비활성화하고 라벨을 바꾼다.
function SubmitButton({ isReply }: { isReply: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`text-[var(--color-accent)] bg-[var(--color-bg)] hover:bg-[var(--color-muted)] border border-[var(--color-accent)]/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        isReply ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm"
      }`}
    >
      {pending ? "등록 중…" : "등록"}
    </button>
  );
}

// 댓글/대댓글 작성 폼(클라이언트). createComment(Server Action)를 호출하고,
// 성공하면 입력창과 글자 수 카운터를 비운다. 목록 갱신은 액션 내부의
// revalidatePath가 담당한다. parentId가 있으면 대댓글 폼(터미널 스타일)으로 동작한다.
export default function CommentForm({
  slug,
  parentId,
  autoFocus = false,
  onSuccess,
  onCancel,
}: {
  slug: string;
  parentId?: string;
  autoFocus?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const isReply = !!parentId;
  const formRef = useRef<HTMLFormElement>(null);
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // 한도의 90% 이상이면 강조색으로 남은 글자가 적음을 알린다.
  const nearLimit = count >= MAX_COMMENT_LENGTH * 0.9;

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        // 공백만 입력된 빈 댓글은 서버 호출 없이 즉시 차단한다(서버 스키마도 trim으로 재검증).
        const content = String(formData.get("content") ?? "").trim();
        if (!content) {
          setError("내용을 입력해 주세요.");
          return;
        }

        // createComment는 인증·slug·스키마 검증 실패 시 예외를 던진다.
        // 성공했을 때만 입력창을 비우고, 실패하면 입력을 유지한 채 오류를 알린다.
        try {
          await createComment(formData);
          formRef.current?.reset();
          setCount(0);
          setError(null);
          onSuccess?.(); // 대댓글 폼은 성공 시 접힌다
        } catch {
          setError(
            `${isReply ? "답글" : "댓글"} 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.`,
          );
        }
      }}
      className="flex flex-col gap-2"
    >
      <input type="hidden" name="slug" value={slug} />
      {parentId && <input type="hidden" name="parentId" value={parentId} />}

      {/* 답글 모드에서는 터미널 프롬프트처럼 '>' 프리픽스를 textarea 앞에 붙인다. */}
      <div className={isReply ? "flex gap-2" : ""}>
        {isReply && (
          <span
            aria-hidden
            className="font-mono text-[var(--color-accent)] leading-none pt-3 select-none"
          >
            {">"}
          </span>
        )}
        <textarea
          name="content"
          required
          autoFocus={autoFocus}
          maxLength={MAX_COMMENT_LENGTH}
          rows={isReply ? 2 : 3}
          placeholder={`${isReply ? "답글" : "댓글"}을 입력하세요 (최대 ${MAX_COMMENT_LENGTH}자)`}
          onChange={(e) => {
            setCount(e.target.value.length);
            if (error) setError(null); // 다시 입력하면 이전 오류를 지운다
          }}
          className="w-full flex-1 resize-y bg-[var(--color-bg)] border border-[var(--color-muted)] p-3 text-sm text-[var(--color-secondary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
        />
      </div>

      {error && (
        <p role="alert" className="text-xs text-[var(--color-error)]">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between">
        <span
          className={`text-xs ${nearLimit ? "text-[var(--color-accent)] font-medium" : "text-[var(--color-secondary)]"}`}
        >
          {count}/{MAX_COMMENT_LENGTH}
        </span>
        <div className="flex items-center gap-2">
          {isReply && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1 text-xs text-[var(--color-secondary)] hover:text-[var(--color-accent)] border border-transparent hover:border-[var(--color-muted)] transition-colors"
            >
              취소
            </button>
          )}
          <SubmitButton isReply={isReply} />
        </div>
      </div>
    </form>
  );
}
