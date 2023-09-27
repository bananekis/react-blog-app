import { z } from "zod";

export const articleSchema = z
  .object({
    articleId: z.string(),
    title: z.string(),
    perex: z.string(),
    imageId: z.string().nullable(),
    createdAt: z.string(),
    lastUpdatedAt: z.string(),
  })
  .readonly();

export type Article = z.infer<typeof articleSchema>;
