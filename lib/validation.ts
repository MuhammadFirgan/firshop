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
    .string()
    .min(1, 'Price cannot be 0.'),
  stock: z
    .string()
    .min(1, 'Stock cannot be 0.'),
  thumbnail: z
    .string({ required_error: "Thumbnail wajib di upload" })
    .min(1,"Thumbnail wajib di upload")
    
})