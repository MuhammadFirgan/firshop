'use server'
import { createProductProps } from "@/types";

import { ProductState } from "@/components/shared/Steps3";
import { formSchema } from "../validation";

import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
import { createServer } from "../supabase/server";


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
    const supabase = await createServer()
    
    const rawProductName = formData.get('productName');
    const rawCategory = formData.get('category');
    const rawDescription = formData.get('description');
    const rawPrice = formData.get('price');
    const rawStock = formData.get('stock');
    const rawThumbnail = formData.getAll('thumbnail') as File[];

    const thumbnail = rawThumbnail.filter((file) => file.size > 0)

    const productName = typeof rawProductName === 'string' ? rawProductName : '';
    const category = typeof rawCategory === 'string' ? rawCategory : '';
    const description = typeof rawDescription === 'string' ? rawDescription : '';
    const price = parseFloat(rawPrice as string);
    const stock = parseInt(rawStock as string, 10);

    const result = formSchema.safeParse({
      productName,
      category,
      description,
      price,
      stock,
      thumbnail,
    });

    if (!result.success) {
      return {
        ...prevState,
        errors: result.error.flatten().fieldErrors,
        productName,
        category,
        description,
        price,
        stock,
        thumbnail,
      };
    }

    const { productName: name, category: cat, description: desc, price: prc, stock: stk } = result.data;

    const imageUrls: string[] = [];
    const uploadErrors: string[] = [];

    for (const file of result.data.thumbnail) {
      const buffer = await file.arrayBuffer();
      const filename = `product-thumbnails/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  
      const { data, error } = await supabase.storage
        .from('product-thumbnails') // Nama bucket
        .upload(filename, buffer, {
          contentType: file.type,
          upsert: false,
        });
  
      if (error) {
        uploadErrors.push(`Gagal upload ${file.name}: ${error.message}`);
      } else {
        const {  data: publicUrlData } = supabase.storage
          .from('product-thumbnails')
          .getPublicUrl(data.path);
        imageUrls.push(publicUrlData.publicUrl);
      }
    }

    if (imageUrls.length === 0 && uploadErrors.length > 0) {
      return {
        ...prevState,
        errors: {
          thumbnail: uploadErrors,
        },
        productName: name,
        category: cat,
        description: desc,
        price: prc,
        stock: stk,
        thumbnail,
      };
    }

    const {  data: product, error: dbError } = await supabase
      .from('products')
      .insert({
        name,
        category: cat,
        description: desc,
        price: prc,
        stock: stk,
        image_urls: imageUrls, // simpan sebagai array text[]
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      return {
        ...prevState,
        errors: {
          database: [dbError.message],
        },
        productName: name,
        category: cat,
        description: desc,
        price: prc,
        stock: stk,
        thumbnail,
      };
    }

    revalidatePath('/dashboard/products');
    revalidatePath('/products');

    return parseStringify(product);
  
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