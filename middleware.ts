import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'
import { getUserByRole } from './lib/action/auth.action'


export async function middleware(request: NextRequest) {
  const response = await updateSession(request)

  const { pathname } = request.nextUrl

  const userRole = await getUserByRole()
  const isCreatingStore = pathname === '/store/create'; 

  if (isCreatingStore && userRole === 'seller') {
      
      return NextResponse.redirect(new URL('/mystore', request.url)); 
  }

  if(pathname.startsWith('/dashboard/')) {

    if(userRole === null) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (pathname.startsWith('/dashboard/users')) {
      if (userRole !== 'super_admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    if(userRole !== 'employee' && userRole !== "super_admin") {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  }

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