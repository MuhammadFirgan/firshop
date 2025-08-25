'use server'
import { createProductProps } from "@/types";
import { createServer } from "../supabase/server";
import { ProductState } from "@/components/shared/Steps3";
import { formSchema } from "../validation";


export type ActionState = {
  
  productName: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: File[];    
  errors?: Record<string, string[]>;
}

export async function createProduct(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState | undefined> {
  try {
    // Validasi input menggunakan Zod
    console.log("form : ", formData)
    const validatedData = formSchema.safeParse({
      productName: formData.get("productName") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      stock: formData.get("stock") as string,
      thumbnail: formData.getAll("thumbnail") || [] as File[],
    });

    // Simpan data ke database atau lakukan proses lainnya
    console.log("Validated Data:", validatedData);

    if (!validatedData.success) {
      return {
        productName,
        category,
        description,
        price,
        stock,
        thumbnail,
        errors: validatedData.error.flatten().fieldErrors,
      };
    }
  
  } catch (error) {
    console.error("Validation Error:", error);
  }
}

export async function uploadImageProduct(files: File[]) {
    const urls = [];
    const supabase = await createServer();
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from('product-thumbnails') 
        .upload(fileName, file);

      if (error) {
        console.error('Error uploading image:', error);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from('product_thumbnails')
          .getPublicUrl(fileName);
        
        urls.push(publicUrlData.publicUrl);
      }
    }
    return urls;
}