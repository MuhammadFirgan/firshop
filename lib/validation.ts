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

export const marketingSchema = z.object({
  discount: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
    message: "Discount must be a positive number"
  }),
  tagline: z.string().min(2, 'Tagline too short').max(50, 'Tagline too long'),
  start_date: z.date({
    required_error: "Date required",
    invalid_type_error: "Invalid type date"
  }),
  end_date: z.date({
    required_error: "Date required",
    invalid_type_error: "Invalid type date"
  }),
  thumbnail: z.string().min(1, { message: "Please select at least one image." }),
})

export const storeSchema = z.object({
  name: z.string().min(2, 'Name too short').max(50, 'Name too long'),
  description: z.string().min(2, 'Description too short').max(200, 'Description too long'),
  address: z.string().min(2, 'Address too short').max(100, 'Address too long'),
  profile: z.string().min(1, { message: "Please select at least one image." }),
  banner: z.string().min(1, { message: "Please select at least one image." })
})

export const categorySchema = z.object({
  name: z.string().min(2, 'Name too short').max(50, 'Name too long'),
  slug: z.string().min(2, 'Slug too short').max(50, 'Slug too long'),
})