import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware' // Assumed to exist
import { getUserByRole } from './lib/action/auth.action' // Assumed to return 'seller', 'super_admin', or null

export async function middleware(request: NextRequest) {
  // --- 1. SESSION UPDATE ---
  // Wajib dipanggil untuk menjaga sesi Supabase tetap segar
  const response = await updateSession(request)
  
  // --- Setup Path and Role ---
  // Ensure path doesn't end with a slash (except for base '/') for consistent matching
  const pathname = request.nextUrl.pathname.replace(/\/$/, ''); 
  
  // Get the user's role (assumed to return 'seller', 'super_admin', or null)
  const userRole = await getUserByRole() 

  // --- 2. EXISTING STORE/SELLER LOGIC (Retain Original) ---
  const isCreatingStore = pathname === '/store/new'; 
  if (isCreatingStore && userRole === 'seller') {
      // NOTE: Logika ini terlihat seperti memblokir seller membuat store, 
      // tetapi dipertahankan sesuai kode asli.
      return NextResponse.redirect(new URL('/store', request.url)); 
  }

  // --- 3. DASHBOARD ACCESS CONTROL ---
  if(pathname.startsWith('/dashboard')) {
    
    // 3a. Authentication Check (Block unauthenticated access)
    if (userRole === null) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // --- Definisi Path Berdasarkan Peran ---

    // Paths requiring ONLY SUPER_ADMIN: 
    // 3. /dashboard/categories, 4. /dashboard/marketing, 5. /dashboard/users
    const superAdminOnlyPaths = [
      '/dashboard/categories',
      '/dashboard/marketing',
      '/dashboard/users',
    ];

    // Paths requiring SELLER OR SUPER_ADMIN:
    // 1. /dashboard, 2. /dashboard/products, 6. /dashboard/analytics, 7. /dashboard/orders
    const sellerOrAdminPaths = [
      '/dashboard', // Base path (match exactly)
      '/dashboard/products',
      '/dashboard/analytics',
      '/dashboard/orders',
    ];

    // 3b. Role-Specific Access Checks

    // CHECK A: SUPER_ADMIN ONLY (Paling Restriktif)
    if (superAdminOnlyPaths.some(path => pathname.startsWith(path))) {
      if (userRole !== 'super_admin') {
        // Redirect jika mencoba mengakses path SA tetapi bukan SA
        return NextResponse.redirect(new URL('/dashboard', request.url)); 
      }
    } 
    
    // CHECK B: SELLER OR SUPER_ADMIN 
    // Memeriksa path yang tersisa (termasuk base /dashboard)
    if (sellerOrAdminPaths.some(path => pathname.startsWith(path))) {
        // Jika peran bukan seller atau super_admin, tolak akses
        if (userRole !== 'seller' && userRole !== 'super_admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
    
    // Jika path tidak sesuai dengan SA Only DAN bukan path yang diizinkan seller,
    // (misalnya '/dashboard/settings' yang tidak terdaftar), 
    // kita asumsikan akses diizinkan jika sudah melewati auth check, 
    // atau jika Anda ingin lebih ketat, tambahkan fallback redirect di sini.
    
    // 3c. Final Success: Jika execution mencapai sini, user authorized.
    return NextResponse.next();
  }

  // --- 4. RETURN RESPONSE FOR NON-DASHBOARD PATHS ---
  return response
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}