import { z } from "zod";

export const articleCommentSchema = z
  .object({
    commentId: z.string(),
    articleId: z.string(),
    author: z.string(),
    content: z.string(),
    postedAt: z.string(),
    score: z.number(),
  })
  .readonly();

export type ArticleComment = z.infer<typeof articleCommentSchema>;
