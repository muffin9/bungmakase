'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import { setCookie } from 'cookies-next';

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    async function getKakaoLogin() {
      try {
        const isLocal = process.env.NODE_ENV === 'development' ? 'local' : '';

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao/callback?code=${code}&state=${isLocal}`,
          { withCredentials: true },
        );

        if (response.data.data) {
          const token = response.data.data.token;
          setCookie('token', token, {
            maxAge: 3600 * 24,
            secure: true,
            sameSite: 'strict',
          });
        }

        router.push('/');
      } catch (error) {
        console.error('Login error:', error);
        router.push('/error');
      }
    }

    if (code) getKakaoLogin();
  }, [code, router]);

  return <div>카카오 로그인 처리중...</div>;
}
