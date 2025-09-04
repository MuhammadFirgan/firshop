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

export async function getAllUser() {
    try {
      const supabase = await createServer();
      const userRole = await getUserByRole();
      if (userRole !== 'super_admin') {
        return { error: 'Forbidden' };
      }
      const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
      if (authError) {
        console.error('Auth error:', authError);
        return { error: 'Failed to fetch user data.' };
      }
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, role');
      if (profileError) {
        console.error('Profile error:', profileError);
        return { error: 'Failed to fetch user profiles.' };
      }
      
      const roleMap = new Map(profiles.map(p => [p.id, p.role]));
  
      const formattedUsers = users.map(user => ({
        id: user.id,
        role: roleMap.get(user.id) || 'user',
        email: user.email,
        fullName: user.user_metadata?.full_name || 'N/A',
      }));
  
      // Logika Pengurutan
      const roleOrder = { 'super_admin': 1, 'admin': 2, 'user': 3 };
      formattedUsers.sort((a, b) => {
        return (roleOrder[a.role] || 99) - (roleOrder[b.role] || 99);
      });
  
      return parseStringify(formattedUsers);
  
    } catch (error) {
      console.error(error);
      return { error: 'An unexpected error occurred.' };
    }
  }

// export async function getAllUser() {
//     try {
        
//         const supabase = await createServer()
    
//         const { data } = await supabase.auth.admin.listUsers();

//         const results = data?.users

//         const formattedUsers = results.map((result: any) => ({
//             id: result.id,
//             role: result.role,
//             email: result.auth_users?.email,
//             fullName: result.auth_users?.raw_user_meta_data?.full_name,     
//         }))

//         return parseStringify(results)
    
//         // const { data: profile } = await supabase
//         //     .from('profiles')
//         //     .select('role')
//         //     .eq('id', user?.id)
//         // if (profile?.role !== 'super_admin') {
//         //     return { error: 'Forbidden' };
//         // }

//         // console.log("profile : ", profile)
    
//         // const { data: users, error } = await supabase
//         //     .from('profiles')
//         //     .select(`
//         //         id,
//         //         role,
//         //         auth_users:auth.users(email, raw_user_meta_data)  
//         //     `)

//         // if (error) {
//         //     console.error('Error fetching users:', error);
//         //     return { error: error.message };
//         // }

//         // const formattedUsers = users.map((u: any) => ({
//         //     id: u.id,
//         //     role: u.role,
//         //     email: u.auth_users?.email,
//         //     fullName: u.auth_users?.raw_user_meta_data?.full_name,     
//         // }))

//         // return parseStringify(formattedUsers)


//     } catch (error) {
//         console.error(error)
//     }
// }