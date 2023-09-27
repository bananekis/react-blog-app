import { ZodTypeAny, z } from "zod";
import { paginationSchema } from "./paginationSchema";

export const createListSchema = <TItemSchema extends ZodTypeAny>(itemSchema: TItemSchema) =>
  z
    .object({
      pagination: paginationSchema,
      items: z.array(itemSchema).readonly(),
    })
    .readonly();
