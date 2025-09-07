'use server'

import { redirect } from "next/navigation"
import { parseStringify } from "../utils"
import { createServer } from "../supabase/server"
import { revalidatePath } from "next/cache"



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
       
        const aRoleValue = roleOrder[a.role as keyof typeof roleOrder] || 99;
        const bRoleValue = roleOrder[b.role as keyof typeof roleOrder] || 99;
        return aRoleValue - bRoleValue;
      });
  
      return parseStringify(formattedUsers);
  
    } catch (error) {
      console.error(error);
      return { error: 'An unexpected error occurred.' };
    }
  }

export async function updateUserRole(profileId: string, newRole: string) {
  const supabase = await createServer()

  const { data: { user } } = await supabase.auth.getUser()
   if(!user) {
    return { error: 'Unauthorized' }
   }



  const { data : currentProfile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()


    if (profileError) {
      console.error('Profile error:', profileError);
      return { error: profileError };
    }
  
    if (currentProfile?.role !== 'super_admin') {
      return { error: 'Forbidden: Only super-admin can perform this action.'};
    }

   const { data: updateRole, error: dbError } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', profileId)
    .select()
    .single()

  if(dbError) {
    
    return { error: dbError }
  }

  revalidatePath('/dashboard/users')

  return parseStringify(updateRole)
      
}