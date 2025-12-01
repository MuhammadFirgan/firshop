'use server'
import { createProductProps } from "@/types";

import { revalidatePath } from "next/cache";
import { generateSlug, parseStringify } from "../utils";
import { createServer } from "../supabase/server";
import { v4 as uuidv4 } from 'uuid'
import { redirect } from "next/navigation";
import { getUserByRole } from "./auth.action";
import { getOwnStore } from "./store.action";
import { baseUploadHandler, deleteFile, UploadResult } from "./upload.action";





export async function createProduct(products: createProductProps) {
  try {

    const supabase = await createServer()
    const userRole = await getUserByRole()
    
    if(userRole !== 'seller') {
      return { error: 'Forbidden' }
    }

    const { data: { user } } = await supabase.auth.getUser();

 
    if (!user) {
      return redirect('/login');
    }

    const mystore = await getOwnStore()

    
    if (!mystore.user_id || !mystore) {
      return {
        errors: "You do not have permission to add products to this store.",
      }
    }

    const dataProduct = {
      name: products.productName,
      description: products.description,
      price: products.price,
      slug: generateSlug(products.productName),
      stock: products.stock,
      thumbnail_url: products.thumbnail,
      category_id: products.category,
      store_id: mystore.id,
      user_id: user.id
    }

    
  
    const {  data: product, error: dbError } = await supabase
      .from('products')
      .insert(dataProduct)
      .select()
      .single();

    if (dbError) {
      return {
 
        errors: dbError.message,
        
      };
    }

    
    revalidatePath('/dashboard/products');
    return parseStringify(product);
  
  } catch (error) {
    console.error("Validation Error:", error);
  }
}

export async function getAllProducts(page: number, pageSize: number, query: string = '') {
  try {
    
    const supabase = await createServer()
    const currentPage = page <= 0 ? 1 : page
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize - 1

    let productsQuery = supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        slug,
        stock,
        thumbnail_url,
        category_id,
        categories!inner(name)
      `, { count: 'exact' })
      .order('created_at', { ascending: false });

   
      if (query) {
        const cleanedQuery = query.replace(/[^0-9]/g, '');
        const isNumericQuery = !isNaN(Number(cleanedQuery));
  
        let filterConditions = `name.ilike.%${query}%,category.ilike.%${query}%`;
        
        if (isNumericQuery) {
          filterConditions += `,price.eq.${cleanedQuery},stock.eq.${cleanedQuery}`;
        }
        
        productsQuery = productsQuery.or(filterConditions);
      }

    const { data: products, count, error: dbError } = await productsQuery.range(startIndex, endIndex);
    
    if(dbError) {
      return { error: dbError.message }
    }

    return { products: parseStringify(products), count: count };
    
  } catch (error) {
    console.error(error)
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const supabase = await createServer()
    
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        slug,
        stock,
        description,
        thumbnail_url,
        category_id,
        categories!inner(name)
      `)
      .eq('slug', slug)
      .single()

    if(error) {
      return { error: 'Failed to fetch product' }
    }

    return parseStringify(product)
    
  } catch(error) {
    console.error(error)
  }
}

export async function updateProducts({id, products}: {id: string, products: createProductProps}) {
  try {
   
    const supabase = await createServer()
    const userRole = await getUserByRole()
    
    if(userRole !== 'seller') {
      return redirect('/')
    }

    const { data: oldProduct, error: oldProductError } = await supabase
      .from('products')
      .select('thumbnail_url')
      .eq('id', id)
      .single()

    if (oldProductError || !oldProduct) {
      return { error: "Store not found or unauthorized." };
    }

    const oldProductImageUrl = oldProduct.thumbnail_url;

    const productUploadResult = await uploadImageProduct(new FormData(), oldProductImageUrl);

    if (productUploadResult.error) {
      return { error: `Profile upload failed: ${productUploadResult.error}` };
    }
    
    const newProfileUrl = productUploadResult.imageUrl || oldProduct;

    const { data: updateProduct, error: dbError } = await supabase
      .from('products')
      .update({
        name: products.productName,
        category_id: products.category,
        description: products.description,
        price: products.price,
        stock: products.stock,
        thumbnail_url: newProfileUrl,
      })
      .eq('id', id)
      .select()
      .single()

      if (dbError) {
        return {
   
          errors: dbError.message,
          
        };
      }

    revalidatePath('/dashboard/product');
    

    return parseStringify(updateProduct)
    
  } catch (error) {
    console.error("Validation Error:", error);
  }
}

export async function deleteProduct(slug: string) {
  try {
    const supabase = await createServer()
    const userRole = await getUserByRole()



    if(userRole !== "seller") {
      return { error: 'Unauthorized' }; 
    }

    const productById = await getProductBySlug(slug)


    if(productById?.thumbnail_url) {
      await deleteFile(productById.thumbnail_url);
    }



    const { error: dbError } = await supabase
      .from('products')
      .delete()
      .eq('slug', slug)

      if(dbError) {
        return { message: 'Failed to delete product' };
      }

      return { success: true, message: "Delete category success" }

  } catch (error) {
    (error)
  }
}



export async function uploadImageProduct(formData: FormData, oldImageUrl?: string): Promise<UploadResult> {
    // Memanggil fungsi inti dengan path spesifik
    return baseUploadHandler(formData, 'products', oldImageUrl);
}