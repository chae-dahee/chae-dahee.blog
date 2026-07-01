import { getComments } from "@/lib/data/comments";
import CommentItem from "./CommentItem";

interface CommentListProps {
  slug: string;
  currentUserId?: string;
}

// 댓글 목록(Server Component). 서버에서 직접 조회한다(fetch 불필요).
export default async function CommentList({ slug, currentUserId }: CommentListProps) {
  const comments = await getComments(slug);

  if (comments.length === 0) {
    return (
      <p className="py-6 text-sm text-[var(--color-secondary)]">
        아직 댓글이 없습니다. 첫 댓글을 남겨보세요.
      </p>
    );
  }

  return (
    <ul className="mt-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
        />
      ))}
    </ul>
  );
}
