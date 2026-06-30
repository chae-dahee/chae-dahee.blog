import { signIn } from "@/auth";

// 비로그인 사용자에게 댓글 작성을 위한 GitHub 로그인을 유도한다.
// 폼의 Server Action으로 처리하므로 JS 없이도 동작한다.
export default function SignInPrompt() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
      className="flex flex-col items-start gap-3 bg-[var(--color-surface)] border border-[var(--color-muted)] p-5"
    >
      <p className="text-sm text-[var(--color-secondary)]">
        댓글을 작성하려면 GitHub 로그인이 필요합니다.
      </p>
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-accent)] bg-[var(--color-bg)] hover:bg-[var(--color-muted)] border border-[var(--color-accent)]/40 transition-colors"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58A12 12 0 0024 12.5C24 5.87 18.63.5 12 .5z" />
        </svg>
        GitHub로 로그인
      </button>
    </form>
  );
}
