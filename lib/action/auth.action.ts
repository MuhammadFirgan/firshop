'use server'

import { redirect } from "next/navigation"
import { parseStringify } from "../utils"
import { createServer } from "../supabase/server"



export async function loginWithOAuth() {
    const supabase = await createServer()
    
    const user = await supabase.auth.getUser()

    return parseStringify(user)
}


export async function userLogout() {
    const supabase = await createServer()

    const logout = await supabase.auth.signOut()

    if(logout) {
        redirect('/login')
    }

    return parseStringify(logout)
}