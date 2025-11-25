'use server'

import { FormCategoryProps } from "@/types";
import { createServer } from "../supabase/server";
import { parseStringify} from "../utils";
import { revalidatePath } from "next/cache";
import { getUserByRole } from "./auth.action";

export async function createCategory(dataCategory: FormCategoryProps) {
    try {
        const supabase = await createServer()

        const userRole = await getUserByRole()
       
        
        if(userRole !== 'super_admin') {
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
                errors: dbError.message,
            };
        }
        
        revalidatePath('/dashboard/categories');
    
        return parseStringify(category);

    } catch (error) {
        console.error(error);
    }
}

export async function getAllCategories() {
    try {
        const supabase = await createServer()
        const { data: categories, error: dbError } = await supabase
            .from('categories')
            .select('*')
        if(dbError) {
            return {
                errors: dbError.message
            }
        }

        return parseStringify(categories)
    }catch(error) {
        console.error(error)
     
    }
}

export async function getCategories(page: number, pageSize: number, query: string = '') {
    try {
        
        const supabase = await createServer()
        const { data: getCategories, error: dbError } = await supabase.
            from('categories')
            .select('*', { count: 'exact' })
            .ilike('name', `%${query}%`)
            .order('created_at', { ascending: false })
            .range((page - 1) * pageSize, page * pageSize - 1)
        if (dbError) {
            return {
                errors: dbError.message,
            };
        }

        return {
            categories: parseStringify(getCategories),
            count: getCategories?.length || 0,
        };


    } catch (error) {
        console.error(error);
    }
}

export async function deleteCategory(categoryId: string) {
    try {
        const supabase = await createServer()

        const userRole = await getUserByRole()
       
        
        if(userRole !== 'super_admin') {
            return { error: 'Forbidden' }
        }

        const { data: { user } } = await supabase.auth.getUser()

        if(!user) {
            return { success: false, errors: { general: ['unauthorized'] } }
        }

        const { error: dbError } = await supabase
            .from('categories')
            .delete()
            .eq('id', categoryId)

        if (dbError) {
            return {
                errors: dbError.message,
            };
        }

        revalidatePath('/dashboard/categories')
        return { success: true, message: "Delete category success" }


    } catch (error) {
        console.error(error);
    }
}