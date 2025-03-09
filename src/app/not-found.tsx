'use client';

// src/app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-2">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-600 mb-4">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/">홈으로</Link>
        </Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          이전으로
        </Button>
      </div>
    </div>
  );
}
