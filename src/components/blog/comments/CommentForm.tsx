"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createComment } from "@/lib/actions/comments";
import { MAX_COMMENT_LENGTH } from "@/lib/constants";

// 제출 중에는 useFormStatus로 pending을 감지해 버튼을 비활성화하고 라벨을 바꾼다.
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 text-sm text-[var(--color-accent)] bg-[var(--color-bg)] hover:bg-[var(--color-muted)] border border-[var(--color-accent)]/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "등록 중…" : "등록"}
    </button>
  );
}

// 댓글 작성 폼(클라이언트). createComment(Server Action)를 호출하고,
// 성공하면 입력창과 글자 수 카운터를 비운다. 목록 갱신은 액션 내부의
// revalidatePath가 담당한다.
export default function CommentForm({ slug }: { slug: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [count, setCount] = useState(0);

  // 한도의 90% 이상이면 강조색으로 남은 글자가 적음을 알린다.
  const nearLimit = count >= MAX_COMMENT_LENGTH * 0.9;

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await createComment(formData);
        formRef.current?.reset();
        setCount(0);
      }}
      className="flex flex-col gap-3"
    >
      <input type="hidden" name="slug" value={slug} />
      <textarea
        name="content"
        required
        maxLength={MAX_COMMENT_LENGTH}
        rows={3}
        placeholder={`댓글을 입력하세요 (최대 ${MAX_COMMENT_LENGTH}자)`}
        onChange={(e) => setCount(e.target.value.length)}
        className="w-full resize-y bg-[var(--color-bg)] border border-[var(--color-muted)] p-3 text-sm text-[var(--color-secondary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
      />
      <div className="flex items-center justify-between">
        <span
          className={`text-xs ${nearLimit ? "text-[var(--color-accent)] font-medium" : "text-[var(--color-secondary)]"}`}
        >
          {count}/{MAX_COMMENT_LENGTH}
        </span>
        <SubmitButton />
      </div>
    </form>
  );
}
