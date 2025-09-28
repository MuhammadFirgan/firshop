'use server'

import { FormCategoryProps } from "@/types";
import { createServer } from "../supabase/server";
import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getUserByRole } from "./auth.action";

export async function createCategory(dataCategory: FormCategoryProps) {
    try {
        const supabase = await createServer()

        const userRole = await getUserByRole()
        
        if(userRole !== 'employee' && userRole !== 'super_admin') {
            return { error: 'Forbidden' }
        }

        const { data: { user } } = await supabase.auth.getUser()

        if(!user) {
            return { success: false, errors: { general: ['unauthorized'] } }
        }

        const { data: category, error: dbError } = await supabase
            .from('categories')
            .insert({
                name: dataCategory.name,
                slug: dataCategory.slug,
                user_id: user.id
            })
            .select()
            .single()

        if (dbError) {
            return {
        
                errors: {
                database: [dbError?.message],
                },
                
            };
        }
        
        revalidatePath('/dashboard/categories');
        revalidatePath('/categories')
    
        return parseStringify(category);

    } catch (error) {
        console.error(error);
    }
}

export async function getCategories(page: number, pageSize: number, query: string = '') {
    try {
        const supabase = await createServer()

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize - 1

        let categoryQuery = supabase
            .from('categories')
            .select(`
                name,
                slug,
                total_products:products(count)    
            `, { count: 'exact' })
            .order('created_at', { ascending: false })
            
        if(query) {
            // const cleanQuery = query.replace(/[^0-9]/g, '')

            let filteredCondition = `name.ilike.%${query}%`

            categoryQuery = categoryQuery.or(filteredCondition)
        }

        const { data: categories, count, error } = await categoryQuery.range(startIndex, endIndex)

        if(error) {
            return { error: error.message }
        }

        // LIAT ERRORNYA DI GEMINI (PERBAIKAN RLS)

        const formattedCategories = categories.map((cat: any) => ({
            name: cat.name,
            total_products: cat.total_products?.[0]?.count || 0,
        }));

        console.log('categories', categories)


        return { categories: parseStringify(formattedCategories), count: count }


    } catch (error) {
        console.error(error);
    }
}