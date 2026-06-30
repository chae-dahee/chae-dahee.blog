import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Auth.js v5 설정. GitHub OAuth로 로그인하고, 세션·계정 정보는 Prisma 어댑터를
// 통해 DB(User/Account/Session 테이블)에 저장한다(database 세션 전략).
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  session: { strategy: "database" },
  callbacks: {
    // database 세션의 user(id 포함)를 클라이언트 세션에도 노출한다.
    // 댓글 작성·삭제에서 session.user.id로 작성자를 식별하기 위함.
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
