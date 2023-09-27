import { z } from "zod";
import { articleCommentSchema } from "./articleCommentSchema";

export const articleDetailSchema = z
  .object({
    articleId: z.string(),
    title: z.string(),
    perex: z.string(),
    imageId: z.string().nullable(),
    createdAt: z.string(),
    lastUpdatedAt: z.string(),
    content: z.string(),
    comments: z.array(articleCommentSchema).readonly(),
  })
  .readonly();

export type ArticleDetail = z.infer<typeof articleDetailSchema>;
