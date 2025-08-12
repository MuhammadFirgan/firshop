import { z } from "zod";

const MAX_FILE_SIZE = 4 * 1024 * 1024; 
 
export const formSchema = z.object({
  name: z
    .string()
    .min(2, "Title too short")
    .max(50, "Title too long"),
  description: z
    .string()
    .min(2, "Description too short")
    .max(250, "Description too long"),
  thumbnail: z
    .custom<File>((file) => file instanceof File, {
      message: "Thumbnail required",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max file 3MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "File must be an image",
    }),
})