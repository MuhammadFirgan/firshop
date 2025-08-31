'use server'
import { createProductProps } from "@/types";

import { formSchema } from "../validation";

import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
import { createServer } from "../supabase/server";
import { v4 as uuidv4 } from 'uuid'
import { getUserByRole } from "./auth.action";
import { redirect } from "next/navigation";




export async function createProduct({ products }: createProductProps) {
 
  try {
    const supabase = await createServer()

    const user = await getUserByRole()

    console.log("User Role:", user);

    if(!user || user === null) {
      return redirect('/login')
    };

    if(user !== 'admin') {
      return redirect('/')
    }
    
  
    const {  data: product, error: dbError } = await supabase
      .from('products')
      .insert({
        name: products.productName,
        category: products.category,
        description: products.description,
        price: products.price,
        stock: products.stock,
        thumbnail_url: products.thumbnail,
        user_id: user.id
      })
      .select()
      .single();

    if (dbError) {
      return {
 
        errors: {
          database: [dbError?.message],
        },
        
      };
    }

    revalidatePath('/dashboard/products');
    revalidatePath('/products');

    return parseStringify(product);
  
  } catch (error) {
    console.error("Validation Error:", error);
  }
}

export async function uploadImageProduct(formData: FormData) {
    const supabase = await createServer()
    const rawThumbnail = formData.get('thumbnail') as File;

    if (!rawThumbnail) {
      console.error("file not provided")
    }


    const fileExt = rawThumbnail.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `products/${fileName}`
    

    const { data, error } = await supabase.storage
      .from('thumbnails')
      .upload(filePath, rawThumbnail, {
        cacheControl: '3600',
        upsert: false,
      })
    
    if(error) {
      console.error(error)
      return { error: 'Failed to Upload Image' }
    }

    const { data: publicUrlData } = supabase.storage
      .from('thumbnails')
      .getPublicUrl(filePath)

    return { imageUrl: publicUrlData.publicUrl }
}