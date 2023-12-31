import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    '/home/:path*',
    '/producto/:path*',
    '/categoria/:path*',
    '/listado/:path*',
    '/settings/:path*'
  ]
}

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /home)
  const path = req.nextUrl.pathname

  // If it's the root path, just render it
  if (path === '/') {
    return NextResponse.next()
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  })

  if (!session && config) {
    return NextResponse.redirect(new URL('/login', req.url))
  } else if (session && path === '/login') {
    return NextResponse.redirect(new URL('/home', req.url))
  }
  return NextResponse.next()
}
