import { handlers } from "@/auth";

// Auth.js의 모든 인증 엔드포인트(로그인/콜백/세션 등)를 처리하는 유일한 Route Handler.
export const { GET, POST } = handlers;
