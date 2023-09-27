import { z } from "zod";

export const accessTokenSchema = z
  .object({
    access_token: z.string(),
    expires_in: z.number(),
    token_type: z.string(),
  })
  .readonly();

export type AccessToken = z.infer<typeof accessTokenSchema>;
