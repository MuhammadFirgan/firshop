'use server'

import { redirect } from "next/navigation"
import { parseStringify} from "../utils"

import { revalidatePath } from "next/cache"
import { createAdmin } from "../supabase/admin"




export async function loginWithOAuth() {
    const supabase = await createAdmin()
    
    const user = await supabase.auth.getUser()

    return parseStringify(user)
}


export async function userLogout() {
    
    const supabase = await createAdmin()
    const logout = await supabase.auth.signOut()

    if(logout) {
        redirect('/login')
    }

    return parseStringify(logout)
}

export async function getUserByRole() {
  const supabase = await createAdmin()
    
    const { data: { user } } = await supabase.auth.getUser()

    if(!user) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    return parseStringify(profile?.role || 'user')
}

export async function getAllUser(page: number, pageSize: number = 10, query: string = '') {
  try {
    const supabase = await createAdmin()
    const userRole = await getUserByRole();
    if (userRole !== 'super_admin') {
      return { users: [], count: 0, error: 'Forbidden' };
    }

    const { data, error: authError } = await supabase.auth.admin.listUsers({
      perPage: pageSize
    });
    if (authError) {
      return { users: [], count: 0, error: 'Failed to fetch user data.' };
    }

    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id, role');
    if (profileError) {
      return { users: [], count: 0, error: 'Failed to fetch user profiles.' };
    }
    
    const roleMap = new Map(profiles.map(p => [p.id, p.role]));

    let formattedUsers = data.users.map((user: any) => ({
      id: user.id,
      role: roleMap.get(user.id) || 'user',
      email: user.email,
      fullName: user.user_metadata?.full_name || 'N/A',
    }));

    // --- Perbaikan di sini: Tambahkan logika filter berdasarkan query
    if (query) {
      formattedUsers = formattedUsers.filter((user :any) => {
        const nameMatch = user.fullName?.toLowerCase().includes(query.toLowerCase());
        const emailMatch = user.email?.toLowerCase().includes(query.toLowerCase());
        const roleMatch = user.role.toLowerCase().includes(query.toLowerCase());

        return nameMatch || emailMatch || roleMatch;
      });
    }

    // Logika Pengurutan
    const roleOrder: Record<string, number> = { 'super_admin': 1, 'admin': 2, 'user': 3 };
    formattedUsers.sort((a, b) => (roleOrder[a.role as keyof typeof roleOrder] || 99) - (roleOrder[b.role as keyof typeof roleOrder] || 99));

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = formattedUsers.slice(startIndex, endIndex);

    return { users: parseStringify(paginatedUsers), count: formattedUsers.length, error: null };
    
  } catch (error) {
    console.error(error);
    return { users: [], count: 0, error: 'An unexpected error occurred.' };
  }
}

export async function updateUserRole(profileId: string, newRole: string) {
  const supabase = await createAdmin()

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

export async function getDataUser() {
  try {
    const supabase = await createAdmin()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }


    return parseStringify({
      email: user.email,
      avatar: user.user_metadata.avatar_url,
      fullName: user.user_metadata.full_name
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return null;
  }
}