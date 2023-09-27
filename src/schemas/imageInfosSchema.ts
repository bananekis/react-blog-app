import { z } from "zod";
import { imageInfoSchema } from "./imageInfoSchema";

export const imageInfosSchema = z.array(imageInfoSchema).readonly();
