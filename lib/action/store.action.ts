'use server'

import { auth } from "@clerk/nextjs/server"
import { createServerSupabase } from "../supabase/server"
import { createStoreProps } from "@/types"


export async function createStore(storeForm: createStoreProps) {
    
    
    const { userId } = await auth()

    // const supabase = await createServerSupabase()

    

    // const { data, error } = await supabase.storage
    //                             .from('firshop-bucket')
    //                             .upload(filePath, file)
    // if(error || !data) throw new Error(error?.message)
        
    // console.log(data)
    
                                


    // const { data, error } = await supabase
    //                                 .from('stores')
    //                                 .insert({ ...storeForm, user_id: userId })
    //                                 .select()

    // if (error || !data) throw new Error(error?.message)

    // return data[0]
}

export async function getStoreByUserId(userid: string) {
    const supabase = await createServerSupabase()

    const { data, error } = await supabase
                                    .from('stores')
                                    .select()
                                    .eq('user_id', userid)

    if(error) throw new Error(error.message);

    return data;
}