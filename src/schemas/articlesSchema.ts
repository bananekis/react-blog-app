import { createListSchema } from "./listSchema";
import { articleSchema } from "./articleSchema";

export const articlesSchema = createListSchema(articleSchema);
