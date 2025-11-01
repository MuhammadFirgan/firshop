'use server'
import { storeProps } from "@/types"
import { createServer } from "../supabase/server"
import { redirect } from "next/navigation"
import { getUserByRole } from "./auth.action"
import { generateSlug, parseStringify } from "../utils"
import { revalidatePath } from "next/cache"
import { baseUploadHandler, UploadResult } from "./upload.action"


export async function createStore(dataStore: storeProps) {
    console.log(generateSlug(dataStore.name))
    try {
        const supabase = await createServer()

        const userRole = await getUserByRole()

        const { data: { user } } = await supabase.auth.getUser()

        if(!user) return redirect('/login')

        if(userRole === 'seller') return redirect('/mystore')

        const { data: store, error: errorStore } = await supabase
            .from('stores')
            .insert({
                name: dataStore.name,
                description: dataStore.description,
                address: dataStore.address,
                slug: generateSlug(dataStore.name),
                poster: dataStore.profile,
                banner: dataStore.banner,
                user_id: user.id
            })
            .select()
            .single()

        if (errorStore) {
            return {
        
                    error: errorStore.message,
                
            };
        }

        const { error: roleUpdateError } = await supabase
            .from('profiles')
            .update({ role: 'seller' })
            .eq('id', user.id)
            
        if (roleUpdateError) {
            return { error: roleUpdateError.message }
             
        }
        

        revalidatePath('/mystore')
        revalidatePath('/'); 

        return parseStringify(store);
        
    } catch (error) {
        console.error(error)
    }
}

export async function uploadProfileStore(formData: FormData): Promise<UploadResult> {
    // Memanggil fungsi inti dengan path spesifik
    return baseUploadHandler(formData, 'store/profile');
}

export async function uploadBannerStore(formData: FormData): Promise<UploadResult> {
    // Memanggil fungsi inti dengan path spesifik
    return baseUploadHandler(formData, 'store/banner');
}

