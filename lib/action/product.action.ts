'use server'
import { createProductProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { createServerSupabase } from "../supabase/server";

export async function createProduct(formData: createProductProps) {
    const { userId: seller } = await auth()

    const supabase = await createServerSupabase()

    const { data, error } = await supabase
                                .from('products')
                                .insert({ ...formData, seller })
                                .select()

    if (error || !data) throw new Error(error?.message)


    return data[0]
}