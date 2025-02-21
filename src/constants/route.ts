const PAGE_URL = {
  HOME: '/',

  USER: '/profile',
  LOGIN: '/login',
  EMAIL_LOGIN: '/login/email',
};

export const publicOnlyRoutes: string[] = [
  PAGE_URL.LOGIN,
  PAGE_URL.EMAIL_LOGIN,
];
export const protectedRoutes: string[] = [PAGE_URL.USER, PAGE_URL.HOME];
