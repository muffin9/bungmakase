import { Suspense } from 'react';
import KakaoCallback from '@/hooks/useKakaoCallback';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function AuthKakaoPage() {
  return (
    <Suspense fallback={<LoadingSpinner text="카카오 로그인 처리중..." />}>
      <KakaoCallback />
    </Suspense>
  );
}
