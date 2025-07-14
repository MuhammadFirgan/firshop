'use server'

import { redirect } from "next/navigation"
import { createClient } from "../supabase/server"
import { parseStringify } from "../utils"



export async function loginWithOAuth() {
    const supabase = await createClient()
    
    const user = await supabase.auth.getUser()

    return parseStringify(user)
}

export async function loginWIthEmail() {
    const supabase = await createClient()

    
}

export async function userLogout() {
    const supabase = await createClient()

    const logout = await supabase.auth.signOut()

    if(logout) {
        redirect('/login')
    }

    return parseStringify(logout)
}