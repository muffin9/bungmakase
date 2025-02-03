export const shouldShowNavigation = (pathname: string): boolean => {
  // Navigation을 숨길 경로 패턴들
  const hidePatterns = ['/onboarding', '/login', '/user/auth'];

  return !hidePatterns.some(
    (pattern) => pathname === pattern || pathname.startsWith(`${pattern}/`),
  );
};
