import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'
import { getUserByRole } from './lib/action/auth.action'

// Helper: cek apakah role valid
const SELLER_PATHS = [
  '/dashboard/product',
  '/dashboard/product/create',
  '/dashboard/product/', // untuk /dashboard/product/[slug]/edit
  '/dashboard/orders',
];

const SUPER_ADMIN_PATHS = [
  '/dashboard/categories',
  '/dashboard/marketing',
  '/dashboard/users',
];

const ALL_DASHBOARD_PATHS = [
  '/dashboard',
  '/dashboard/analytics',
  ...SELLER_PATHS,
  ...SUPER_ADMIN_PATHS,
];

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)
  const { pathname } = request.nextUrl;
  const userRole = await getUserByRole();

  // --- Cek Umum Dashboard ---
  const isOnDashboard = pathname.startsWith('/dashboard');

  if (isOnDashboard) {
      // Jika tidak memiliki role sama sekali (belum login atau role tidak valid)
      if (!userRole || (userRole !== 'seller' && userRole !== 'super_admin')) {
          // Arahkan ke halaman utama jika mencoba akses dashboard tanpa role yang sesuai
          return NextResponse.redirect(new URL('/', request.url));
      }

      // --- Cek Path Berdasarkan Role ---
      
      // Cek apakah path yang diakses adalah path seller
      const isSellerPath = SELLER_PATHS.some(path => {
          if (path.endsWith('/')) {
              // Untuk path dinamis seperti /dashboard/product/[slug]/edit
              // Cek apakah pathname diawali dengan /dashboard/product/
              return pathname.startsWith(path);
          }
          return pathname === path;
      });

      // Cek apakah path yang diakses adalah path super_admin
      const isSuperAdminPath = SUPER_ADMIN_PATHS.some(path => pathname.startsWith(path));

      const isCommonDashboardPath = pathname === '/dashboard' || pathname === '/dashboard/analytics';
      
      // 1. Role Seller
      if (userRole === 'seller') {
          // Jika Seller mengakses path Super Admin, arahkan ke /dashboard
          if (isSuperAdminPath) {
              return NextResponse.redirect(new URL('/dashboard', request.url));
          }
      }

      // 2. Role Super Admin
      else if (userRole === 'super_admin') {
          // Jika Super Admin mengakses path Seller, arahkan ke /dashboard
          if (isSellerPath) {
              return NextResponse.redirect(new URL('/dashboard', request.url));
          }
      }
      
      // Logika tambahan untuk path /dashboard dan /dashboard/analytics
      if (isCommonDashboardPath) {
           // Izinkan akses untuk kedua role
           return NextResponse.next();
      }

      // Pastikan role yang sah (seller atau super_admin) hanya bisa mengakses
      // path yang menjadi milik mereka. Logika di atas sudah mencakup
      // jika role mencoba path yang salah akan diarahkan ke /dashboard.
  }
  
  // Izinkan permintaan untuk rute non-dashboard (atau setelah melewati semua pengecekan)
  return NextResponse.next();
}

// Konfigurasi Matcher agar middleware hanya berjalan di rute tertentu
export const config = {
  matcher: ['/dashboard/:path*', '/'], // Jalankan untuk semua rute di bawah /dashboard dan rute root (opsional)
};