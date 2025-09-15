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