import Image from "next/image";
import DeleteButton from "./DeleteButton";
import type { CommentWithAuthor } from "@/lib/data/comments";

interface CommentItemProps {
  comment: CommentWithAuthor;
  currentUserId?: string;
}

// 댓글 1건. 본인 댓글에만 삭제 버튼을 노출한다(삭제는 서버에서 소유자 재검증).
export default function CommentItem({ comment, currentUserId }: CommentItemProps) {
  const isOwner = !!currentUserId && comment.authorId === currentUserId;
  const createdAt = comment.createdAt.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <li className="py-4 border-b border-[var(--color-muted)] last:border-b-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {comment.author.image && (
            <Image
              src={comment.author.image}
              alt={comment.author.name ?? "사용자"}
              width={24}
              height={24}
              className="rounded-full border border-[var(--color-muted)]"
            />
          )}
          <span className="text-sm font-medium text-[var(--color-accent)]">
            {comment.author.name ?? "익명"}
          </span>
          <span className="text-xs text-[var(--color-secondary)]">{createdAt}</span>
        </div>
        {isOwner && <DeleteButton id={comment.id} />}
      </div>
      <p className="text-sm text-[var(--color-secondary)] whitespace-pre-wrap break-words">
        {comment.content}
      </p>
    </li>
  );
}
