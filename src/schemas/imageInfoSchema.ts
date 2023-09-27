import { z } from "zod";

export const imageInfoSchema = z
  .object({
    imageId: z.string(),
    name: z.string(),
  })
  .readonly();

export type ImageInfo = z.infer<typeof imageInfoSchema>;
