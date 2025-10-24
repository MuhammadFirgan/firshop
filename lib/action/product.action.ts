'use server'
import { createProductProps } from "@/types";

import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
import { createServer } from "../supabase/server";
import { v4 as uuidv4 } from 'uuid'
import { redirect } from "next/navigation";
import { getUserByRole } from "./auth.action";




export async function createProduct({ products }: createProductProps) {
 
  try {
    const supabase = await createServer()

    const { data: { user } } = await supabase.auth.getUser();

 
    if (!user) {
      return redirect('/login');
    }
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'employee' && profile?.role !== 'super_admin') {
      return redirect('/');
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

export async function getAllProducts(page: number, pageSize: number, query: string = '') {
  try {
    const supabase = await createServer()

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize - 1

    let productsQuery = supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        stock,
        thumbnail_url,
        category:categories(name)
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

    const { data: products, count, error } = await productsQuery.range(startIndex, endIndex);
    
    if(error) {
      return { error: 'Failed to fetch products' }
    }

    return { products: parseStringify(products), count: count };
    
  } catch (error) {
    console.error(error)
  }
}

export async function getProductById(id: string) {
  try {
    const supabase = await createServer()

    const userRole = await getUserByRole()
    
    if(userRole.role !== 'employee' && userRole.role !== 'super_admin') {
      return redirect('/')
    }

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if(error) {
      return { error: 'Failed to fetch product' }
    }

    return parseStringify(product)
    
  } catch(error) {
    console.error(error)
  }
}

export async function updateProducts({ id, products }: createProductProps) {
  try {
    const supabase = await createServer()

    const userRole = await getUserByRole()
    
    if(userRole !== 'employee' && userRole !== 'super_admin') {
      return redirect('/')
    }

    const { data: product, error } = await supabase
      .from('products')
      .update({
        name: products.productName,
        category: products.category,
        description: products.description,
        price: products.price,
        stock: products.stock,
        thumbnail_url: products.thumbnail,
      })
      .eq('id', id)
      .select()
      .single()

    if(error) {
      return { error: 'Failed to fetch product' };
    }

    revalidatePath('/dashboard/products');
    revalidatePath('/products');

    return parseStringify(product)
    
  } catch (error) {
    console.error("Validation Error:", error);
  }
}

export async function deleteProduct(id: string) {
  try {
    const supabase = await createServer()
  } catch (error) {
    console.log(error)
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
  

  const { error } = await supabase.storage
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