import { z } from "zod";

const MAX_FILE_SIZE = 4 * 1024 * 1024; 
 
export const formSchema = z.object({
  productName: z
    .string()
    .min(2, "Title too short")
    .max(50, "Title too long"),
  category: z
    .string()
    .min(2, "Category required"),
  description: z
    .string()
    .min(2, "Description too short")
    .max(250, "Description too long"),
    price: z
      .number()
      .positive('Price must be a positive number.')
      .min(1, 'Price cannot be 0.'),
    stock: z
      .number()
      .positive('Stock must be a positive number.')
      .min(1, 'Stock cannot be 0.'),
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