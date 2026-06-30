"use client";

import { useFormStatus } from "react-dom";
import { deleteComment } from "@/lib/actions/comments";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-xs text-[var(--color-secondary)] hover:text-[var(--color-accent)] underline-offset-2 hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "삭제 중…" : "삭제"}
    </button>
  );
}

// 댓글 삭제 버튼(클라이언트). 작성 폼과 동일하게 클라이언트 컴포넌트를 경유해
// Server Action을 호출한다. id·slug는 hidden input으로 전달한다.
export default function DeleteButton({ id, slug }: { id: string; slug: string }) {
  return (
    <form action={deleteComment}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="slug" value={slug} />
      <SubmitButton />
    </form>
  );
}
