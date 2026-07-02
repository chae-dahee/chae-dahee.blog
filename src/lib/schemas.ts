import { z } from "zod";
import { MAX_COMMENT_LENGTH } from "@/lib/constants";

// 댓글 작성 입력 검증. 서버 액션에서 FormData를 파싱할 때 사용한다.
export const CommentSchema = z.object({
  slug: z.string().min(1),
  // 순서 중요: trim()으로 앞뒤 공백을 먼저 제거한 뒤 min(1)로 검사해야
  // 공백만 입력한 빈 댓글(전각 공백 포함)이 거부된다. 순서를 바꾸면 검증이 뚫린다.
  content: z
    .string()
    .trim()
    .min(1, "내용을 입력해 주세요.")
    .max(MAX_COMMENT_LENGTH, `${MAX_COMMENT_LENGTH}자 이내로 입력해 주세요.`),
  // 대댓글이면 부모 댓글 id. 최상위 댓글이면 없음.
  parentId: z.string().min(1).optional(),
});
