'use client';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
// import { NextRequest } from 'next/server';
import { useEffect, useState } from 'react';

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const code = searchParams.get('code');

//   if (code) {
//     const isLocal = process.env.NODE_ENV === 'development' ? 'local' : '';

//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao/callback?code=${code}&state=${isLocal}`,
//     );

//     console.log(response);

//     if (response) redirect('/');
//   }
// }

export default function AuthKakao() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.has('code')) {
      setCode(searchParams.get('code'));
    }
  }, [searchParams]);

  useEffect(() => {
    async function getKakaoLogin() {
      try {
        const isLocal = process.env.NODE_ENV === 'development' ? 'local' : '';

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao/callback?code=${code}&state=${isLocal}`,
          { withCredentials: true },
        );

        console.log(response);
        router.push('/');
      } catch (error) {
        console.error('Login error:', error);
      }
    }

    if (code) getKakaoLogin();
  }, [code]);

  return <></>;
}
