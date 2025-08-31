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

export async function getUserByRole() {
    const supabase = await createServer()
    const { data: { user } } = await supabase.auth.getUser()

    if(!user) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    return parseStringify(profile?.role || 'user')
}