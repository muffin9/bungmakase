import { authError } from '@/constants/error';

export const getRedirectUrlByError = (error: string) =>
  authError[error].redirect;
