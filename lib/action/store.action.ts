'use server'
import { storeProps } from "@/types"
import { createServer } from "../supabase/server"
import { redirect } from "next/navigation"
import { generateSlug, parseStringify } from "../utils"
import { revalidatePath } from "next/cache"
import { baseUploadHandler, UploadResult } from "./upload.action"
import { getUserByRole } from '@/lib/action/auth.action';


export async function createStore(dataStore: storeProps) {
  
    try {
        const supabase = await createServer()
        
        const userRole = await getUserByRole()

        const { data: { user } } = await supabase.auth.getUser()

        if(!user) return redirect('/login')

        if(userRole === 'seller') return redirect('/store')

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

export async function getOwnStore() {
    try {
        
        const supabase = await createServer()
        const { data: { user } } = await supabase.auth.getUser()

        if(!user) return redirect('/login')

        const { data: store, error: storeError } = await supabase
            .from('stores')
            .select('*')
            .eq('user_id', user.id)
            .single()

            if(storeError) {
                return { error: 'Failed to fetch store' }
            }

        return parseStringify(store)

    } catch (error) {
        console.error(error)
    }
}

export async function getStoreBySlug(slug: string) {
    try {
        const supabase = await createServer()

        const { data: { user } } = await supabase.auth.getUser()

        if(!user) return redirect('/login')

        const { data: store, error: storeError } = await supabase
            .from('stores')
            .select('*')
            .eq('slug', slug) 
            .single()

            if(storeError) {
                return { error: 'Failed to fetch store by slug' }
            }

        return parseStringify(store)
    } catch (error) {
        console.error(error)
    }
}

export async function updateStore(slug: string, dataUpdate: storeProps) {
    try {
        const supabase = await createServer()
        const userRole = await getUserByRole()

        if(userRole !== 'seller') return redirect('/store')

        const { data: oldStore, error: oldStoreError } = await supabase
            .from('stores')
            .select('poster, banner') 
            .eq('slug', slug)
            .single();

        if (oldStoreError || !oldStore) {
            console.error("Error fetching old store data for update:", oldStoreError?.message || "Store not found.");
            return { error: "Store not found or unauthorized." };
        }

        const oldProfileUrl = oldStore.poster;
        const oldBannerUrl = oldStore.banner;
        
        const profileUploadResult = await uploadProfileStore(new FormData(), oldProfileUrl);
        if (profileUploadResult.error) {
            return { error: `Profile upload failed: ${profileUploadResult.error}` };
        }
        const newProfileUrl = profileUploadResult.imageUrl || oldProfileUrl; 


        const bannerUploadResult = await uploadBannerStore(new FormData(), oldBannerUrl);
        if (bannerUploadResult.error) {
            return { error: `Banner upload failed: ${bannerUploadResult.error}` };
        }
        const newBannerUrl = bannerUploadResult.imageUrl || oldBannerUrl;

        const { data: updateStore, error: dbError } = await supabase
        
            .from('stores')
            .update({
                name: dataUpdate.name,
                description: dataUpdate.description,
                address: dataUpdate.address,
                poster: newProfileUrl,
                banner: newBannerUrl,
            })
            .eq('slug', slug)
            .select()
            .single()

        if(dbError) {
            return { error: 'Failed to update store' }
        }

        return parseStringify(updateStore)
    } catch (e) {
        console.error(e)
    }
}

export async function uploadProfileStore(formData: FormData, oldProfileUrl?: string): Promise<UploadResult> {
    // Memanggil fungsi inti dengan path spesifik
    return baseUploadHandler(formData, 'store/profile', oldProfileUrl);
}

export async function uploadBannerStore(formData: FormData, oldBannerUrl?: string): Promise<UploadResult> {
    // Memanggil fungsi inti dengan path spesifik
    return baseUploadHandler(formData, 'store/banner', oldBannerUrl);
}

