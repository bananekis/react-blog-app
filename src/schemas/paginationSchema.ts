import { z } from "zod";

export const paginationSchema = z
  .object({
    offset: z.number(),
    limit: z.number(),
    total: z.number(),
  })
  .readonly();
