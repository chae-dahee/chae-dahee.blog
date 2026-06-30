import Image from "next/image";
import { auth, signOut } from "@/auth";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import SignInPrompt from "./SignInPrompt";

// 글 하단 댓글 영역. 로그인 여부에 따라 작성 영역(작성자 정보+폼) 또는 로그인
// 유도를 보여주고, 그 아래에 댓글 목록을 렌더한다.
export default async function CommentSection({ slug }: { slug: string }) {
  const session = await auth();

  return (
    <section className="mt-16 pt-8 border-t border-[var(--color-muted)]">
      <h2 className="text-xl font-bold text-[var(--color-accent)] mb-4">댓글</h2>

      {session?.user ? (
        <div className="bg-[var(--color-surface)] border border-[var(--color-muted)] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "사용자"}
                  width={28}
                  height={28}
                  className="rounded-full border border-[var(--color-muted)]"
                />
              )}
              <span className="text-sm font-medium text-[var(--color-accent)]">
                {session.user.name ?? "익명"}
              </span>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="text-xs text-[var(--color-secondary)] hover:text-[var(--color-accent)] underline-offset-2 hover:underline transition-colors"
              >
                로그아웃
              </button>
            </form>
          </div>
          <CommentForm slug={slug} />
        </div>
      ) : (
        <SignInPrompt />
      )}

      <CommentList slug={slug} currentUserId={session?.user?.id} />
    </section>
  );
}
