import { setCookie, getCookie, deleteCookie } from 'cookies-next/client';
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || '';

export const setEncryptedAccessToken = (token: string): void => {
  const hash = CryptoJS.AES.encrypt(
    JSON.stringify(token),
    SECRET_KEY,
  ).toString();
  setCookie('token', hash, {
    maxAge: 3600 * 24,
    secure: true,
    sameSite: 'strict',
  });
};

export const getDecryptedAccessToken = (): string | null => {
  const hash = getCookie('token');

  if (typeof hash === 'string') {
    const bytes = CryptoJS.AES.decrypt(hash, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  return null;
};

export const removeAccessToken = (): void => {
  deleteCookie('token');
};
