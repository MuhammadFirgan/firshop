import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'
import { getUserByRole } from './lib/action/auth.action'

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)
  const pathname = request.nextUrl.pathname.replace(/\/$/, '') || '/'
  const userRole = await getUserByRole()

  // --- Proteksi dashboard ---
  if (pathname.startsWith('/dashboard')) {
    // 🔒 Harus login
    if (userRole === null) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Daftar path eksklusif
    const SELLER_PREFIX = '/dashboard/products'
    const SUPER_ADMIN_PATHS = [
      '/dashboard/categories',
      '/dashboard/marketing',
      '/dashboard/users',
    ]

    // ✅ Biarkan /dashboard diakses oleh seller & super_admin
    // (Tidak redirect otomatis — biarkan halaman itu menampilkan UI sesuai role)
    if (pathname === '/dashboard') {
      // Cukup pastikan role valid
      if (userRole === 'seller' || userRole === 'super_admin') {
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/', request.url))
    }

    // 🔐 Akses ke fitur seller
    if (pathname.startsWith(SELLER_PREFIX)) {
      if (userRole !== 'seller') {
        // Redirect ke /dashboard (bukan ke subpath!)
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }

    // 🔐 Akses ke fitur super admin
    for (const path of SUPER_ADMIN_PATHS) {
      if (pathname.startsWith(path)) {
        if (userRole !== 'super_admin') {
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
      }
    }

    // ❌ Path dashboard tidak dikenali → redirect ke /dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // --- Logika non-dashboard ---
  if (pathname === '/store/new' && userRole === 'seller') {
    return NextResponse.redirect(new URL('/store', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}