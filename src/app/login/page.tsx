'use client';

import Logo from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [isOnboarding] = useState();
  const loginWithKakao = async () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  useEffect(() => {
    const localIsOnboard = localStorage.getItem('isOnboard');
    if (!localIsOnboard) {
      router.push('/onboarding');
    }
  }, [isOnboarding]);

  return (
    <div className="h-screen bg-yellow-gradient px-6 py-8">
      <div className="h-full flex flex-col items-center justify-between">
        <header className="text-center">
          <p className="text-third text-sm">나만의 붕어빵 아카이브</p>
          <span className="text-[80px] text-third font-OwnglyphPDH">
            붕마카세
          </span>
        </header>

        <Logo size="large" />

        {/* Buttons */}
        <div className="w-full flex flex-col gap-1 max-w-xs space-y-3">
          <Button
            id="kakao-login-btn"
            onClick={() => {
              loginWithKakao();
            }}
            className="w-full bg-[#FEE500] hover:bg-[#FEE500]/90 text-black h-12 relative"
          >
            <Image
              src={'/images/svg/kakao.svg'}
              width={18}
              height={18}
              className="absolute left-4"
              alt="kakao"
            />

            <span className="flex-1 text-center">카카오로 시작하기</span>
          </Button>

          <Link href="/login/email">
            <Button
              variant="outline"
              className="w-full bg-white hover:bg-gray-50 text-black border-gray-200 h-12 relative"
            >
              <Image
                src={'/images/svg/email.svg'}
                width={18}
                height={18}
                className="absolute left-4"
                alt="kakao"
              />

              <span className="flex-1 text-center">이메일로 시작하기</span>
            </Button>
          </Link>

          <button
            className="w-full text-sm text-gray-600 mt-4 underline"
            onClick={() => router.push('/map')}
          >
            로그인 없이 둘러보기
          </button>
        </div>
      </div>
    </div>
  );
}
