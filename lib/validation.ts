import { z } from "zod";

const MAX_FILE_SIZE = 4 * 1024 * 1024; 
 
export const formSchema = z.object({
  productName: z.string().min(2, "Title too short").max(50, "Title too long"),
  category: z.string().min(2, "Category required"),
  description: z.string().min(2, "Description too short"),
  price: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
    message: "Price must be a positive number",
  }),
  stock: z.string().refine(val => !isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 0, {
    message: "Stock must be a non-negative integer",
  }),
  thumbnail: z.string().min(1, { message: "Please select at least one image." }),
});