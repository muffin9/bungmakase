import CryptoJS from 'crypto-js';
import { protectedRoutes, publicOnlyRoutes } from '@/constants/route';

export const shouldShowNavigation = (pathname: string): boolean => {
  // Navigation을 숨길 경로 패턴들
  const hidePatterns = [
    '/onboarding',
    '/login',
    '/user/auth',
    '/signup/email',
    '/signup/profile',
    '/review/create',
    '/create',
  ];

  return !hidePatterns.some(
    (pattern) => pathname === pattern || pathname.startsWith(`${pattern}/`),
  );
};

export const decryptAccessTokenInMiddleware = (
  hash?: string,
): string | null => {
  if (!hash) return null;
  const bytes = CryptoJS.AES.decrypt(hash, process.env.NEXT_PUBLIC_SECRET_KEY!);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const shouldRedirectToHome = (
  pathname: string,
  accessToken: string | null,
): boolean => {
  return (
    publicOnlyRoutes.includes(pathname) && !!accessToken && pathname !== '/'
  );
};

export const shouldRedirectToLogin = (
  pathname: string,
  accessToken: string | null,
): boolean => {
  // level, profile ~~ 동적 경로들은 무조건 로그인 필요.
  const protectedPathPatterns = [
    '/level',
    '/profile',
    '/dogam',
    '/mypage',
    '/review',
  ];
  const isProtectedPattern = protectedPathPatterns.some(
    (pattern) => pathname === pattern || pathname.startsWith(`${pattern}/`),
  );

  return (
    (protectedRoutes.includes(pathname) || isProtectedPattern) && !accessToken
  );
};
