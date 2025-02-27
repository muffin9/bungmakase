'use client';

import KakaoMap from '@/components/common/KakaoMap';
import { SearchInput } from '@/components/common/SearchInput';
import FloatingActionButton from '@/components/map/FloatingActionButton';
import { ShopResultSection } from '@/components/map/ShopResultSection';
import { zIndex } from '@/constants/zIndex';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function MapPage() {
  const router = useRouter();

  return (
    <section>
      <KakaoMap>
        <header
          className={`px-4 w-full absolute left-[50%] -translate-x-1/2 top-12 z-${zIndex.mapHeader}`}
        >
          <SearchInput
            placeholder={'가까운 붕어빵 가게를 찾아보세요!'}
            onClick={() => router.push('/map/search')}
          />
        </header>
        <footer
          className={`px-3 absolute right-0 bottom-[80px] z-${zIndex.mapFooter}`}
        >
          <FloatingActionButton />
        </footer>
        <div className={`absolute bottom-0 z-${zIndex.bottomDrawer}`}>
          <ShopResultSection />
        </div>
      </KakaoMap>
    </section>
  );
}
