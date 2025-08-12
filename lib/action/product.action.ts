'use server'
import { createProductProps } from "@/types";
import { createServer } from "../supabase/server";


export async function createProduct(formData: createProductProps) {
    
    const supabase = await createServer()
    const { data : { user }, error: authError } = await supabase.auth.getUser()
    if(authError || !user) {
        throw new Error('unauthorized user')
    }

    const { data, error } = await supabase
                                .from('products')
                                .insert({ ...formData, user_id: user?.id })
                                .select()

    if (error || !data) throw new Error(error?.message)


    return data[0]
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