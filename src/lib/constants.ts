// 댓글 본문 최대 길이. 클라이언트 입력 제한(maxLength·카운터)과 서버 검증(zod)이
// 공유한다. zod 의존이 없는 순수 상수 모듈이라 클라이언트 번들에 안전하다.
export const MAX_COMMENT_LENGTH = 1000;
