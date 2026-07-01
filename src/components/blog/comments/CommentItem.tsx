import Image from "next/image";
import type { ReactNode } from "react";
import DeleteButton from "./DeleteButton";
import ReplyThread from "./ReplyThread";
import type { CommentWithAuthor, ReplyWithAuthor } from "@/lib/data/comments";

// 본문에서 사용자가 직접 입력한 '@이름'만 멘션으로 강조한다(자동 삽입은 하지 않음).
// 이메일(a@b.com) 등 오탐을 피하려고 앞이 공백이거나 문장 시작일 때만 인정한다.
function renderContent(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /@[^\s@]+/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const start = m.index;
    const prevChar = start === 0 ? "" : text[start - 1];
    if (start !== 0 && !/\s/.test(prevChar)) continue;

    const mention = m[0].replace(/[^\p{L}\p{N}]+$/u, "");
    if (mention.length <= 1) continue;

    if (start > last) nodes.push(text.slice(last, start));
    nodes.push(
      <span key={key++} className="text-[var(--color-accent)] font-medium">
        {mention}
      </span>,
    );
    last = start + mention.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

interface CommentItemProps {
  comment: CommentWithAuthor | ReplyWithAuthor;
  currentUserId?: string;
  // 대댓글로 렌더될 때는 작은 아바타로 계층을 표시한다(들여쓰기는 ReplyThread가 담당, 중첩 1단계 제한).
  isReply?: boolean;
}

// 댓글 1건. 본인 댓글에만 삭제 버튼을 노출한다(삭제는 서버에서 소유자 재검증).
// 최상위 댓글이면 로그인 시 답글 버튼(삭제 좌측)·대댓글 목록·작성 폼을 ReplyThread로 함께 렌더한다.
export default function CommentItem({
  comment,
  currentUserId,
  isReply = false,
}: CommentItemProps) {
  const isOwner = !!currentUserId && comment.authorId === currentUserId;
  const isLoggedIn = !!currentUserId;
  // 대댓글 목록은 최상위 댓글에만 존재한다(타입 좁히기).
  const replies: ReplyWithAuthor[] =
    !isReply && "replies" in comment ? comment.replies : [];
  const avatarSize = isReply ? 20 : 24;
  const createdAt = comment.createdAt.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 아바타·이름·날짜 (최상위/대댓글 공통)
  const headMeta = (
    <>
      {comment.author.image && (
        <Image
          src={comment.author.image}
          alt={comment.author.name ?? "사용자"}
          width={avatarSize}
          height={avatarSize}
          className="rounded-full border border-[var(--color-muted)] shrink-0"
        />
      )}
      <span className="text-sm font-medium text-[var(--color-accent)] truncate">
        {comment.author.name ?? "익명"}
      </span>
      <span className="text-xs text-[var(--color-secondary)] shrink-0">
        {createdAt}
      </span>
    </>
  );

  const content = (
    <p className="text-sm text-[var(--color-secondary)] whitespace-pre-wrap break-words">
      {renderContent(comment.content)}
    </p>
  );

  // 대댓글: 들여쓰기·좌측 가이드선은 상위 ReplyThread가 담당한다(글리프 미사용, 답글 버튼 없음).
  if (isReply) {
    return (
      <li className="min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2 min-w-0">{headMeta}</div>
          {isOwner && <DeleteButton id={comment.id} />}
        </div>
        {content}
      </li>
    );
  }

  // 최상위 댓글: 헤더(답글 버튼 + 삭제)·본문·대댓글 목록·작성 폼을 ReplyThread가 함께 렌더한다.
  return (
    <li className="py-4 border-b border-[var(--color-muted)] last:border-b-0">
      <ReplyThread
        slug={comment.postSlug}
        parentId={comment.id}
        canReply={isLoggedIn}
        header={headMeta}
        actions={isOwner ? <DeleteButton id={comment.id} /> : null}
        content={content}
      >
        {replies.length > 0 && (
          <ul className="flex flex-col gap-3">
            {replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                currentUserId={currentUserId}
                isReply
              />
            ))}
          </ul>
        )}
      </ReplyThread>
    </li>
  );
}
