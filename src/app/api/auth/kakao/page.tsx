import { Suspense } from 'react';
import KakaoCallback from '@/hooks/useKakaoCallback';

export default function AuthKakaoPage() {
  return (
    <Suspense fallback={<div>카카오 로그인 처리중...</div>}>
      <KakaoCallback />
    </Suspense>
  );
}
