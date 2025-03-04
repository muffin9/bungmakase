'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import { setEncryptedAccessToken } from '@/lib/cookie';

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    async function getKakaoLogin() {
      try {
        const isLocal = process.env.NODE_ENV === 'development' ? 'local' : '';

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao/callback?code=${code}` +
            (isLocal && `&state=${isLocal}`),
          { withCredentials: true },
        );

        if (response.data.data) {
          const token = response.data.data.token;
          setEncryptedAccessToken(token);
          router.push('/');
        }
      } catch (error) {
        console.error('Login error:', error);
        router.push('/error');
      }
    }

    if (code) getKakaoLogin();
  }, [code, router]);

  return <div>카카오 로그인 처리중...</div>;
}
