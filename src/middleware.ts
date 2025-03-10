import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  decryptAccessTokenInMiddleware,
  shouldRedirectToHome,
  shouldRedirectToLogin,
} from './lib/router';

export function middleware(request: NextRequest) {
  const accessToken = decryptAccessTokenInMiddleware(
    request.cookies.get('token')?.value,
  );
  const pathname = request.nextUrl.pathname;

  if (shouldRedirectToHome(pathname, accessToken)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (shouldRedirectToLogin(pathname, accessToken)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
