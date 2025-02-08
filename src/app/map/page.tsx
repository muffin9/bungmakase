'use client';

import KakaoMap from '@/components/common/KakaoMap';
import { SearchInput } from '@/components/common/SearchInput';
import { Button } from '@/components/ui/button';
import { zIndex } from '@/constants/zIndex';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function MapPage() {
  const router = useRouter();
  return (
    <section>
      <KakaoMap>
        <header
          className={`px-4 absolute left-[50%] -translate-x-1/2 top-12 z-${zIndex.mapHeader}`}
        >
          <SearchInput
            placeholder={'가까운 붕어빵 가게를 찾아보세요!'}
            onClick={() => router.push('/map/search')}
          />
        </header>
        <footer
          className={`px-3 absolute right-0 bottom-[80px] z-${zIndex.mapFooter}`}
        >
          <Button
            className="rounded-full text-sm"
            onClick={() => console.log('가게후기, 추가하기 Up Bottom Sheet')}
          >
            <Plus />
            추가하기
          </Button>
        </footer>
      </KakaoMap>
    </section>
  );
}
