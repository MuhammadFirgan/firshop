import { z } from "zod";

const MAX_FILE_SIZE = 4 * 1024 * 1024; 
 
export const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(250),
  poster: z
    .custom<File>((file) => file instanceof File, {
      message: "Poster wajib diupload",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Ukuran maksimum 3MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "File harus berupa gambar",
    }),
})