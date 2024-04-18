import { NextResponse } from 'next/server'

export function middleware(request) {
    const loggedin = request.cookies.get('email');
    const email = request.cookies.get("email"); 
    const { pathname } = request.nextUrl;

    if (loggedin && (pathname === '/signup' || pathname==="/login")) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (!loggedin && pathname === '/profile') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if(pathname.startsWith("/admin")){
        if(email?.value === "shantanubhs1985@gmail.com"){
          return NextResponse.rewrite(new URL(pathname, request.url))
        }else{
          return NextResponse.redirect(new URL('/', request.url))
        }
    }
}
 
// // See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
}