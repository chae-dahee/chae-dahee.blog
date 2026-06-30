import type { DefaultSession } from "next-auth";

// 기본 Session.user에는 id가 없으므로, 댓글 작성자 식별을 위해 id를 추가한다.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
