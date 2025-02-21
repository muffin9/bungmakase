import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { shouldRedirectToHome, shouldRedirectToLogin } from './lib/router';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value as string;

  const pathname = request.nextUrl.pathname;

  if (shouldRedirectToHome(pathname, accessToken)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (shouldRedirectToLogin(pathname, accessToken)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
