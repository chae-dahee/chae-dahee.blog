import { z } from "zod";
import { MAX_COMMENT_LENGTH } from "@/lib/constants";

// 댓글 작성 입력 검증. 서버 액션에서 FormData를 파싱할 때 사용한다.
export const CommentSchema = z.object({
  slug: z.string().min(1),
  content: z
    .string()
    .min(1, "내용을 입력해 주세요.")
    .max(MAX_COMMENT_LENGTH, `${MAX_COMMENT_LENGTH}자 이내로 입력해 주세요.`),
});
