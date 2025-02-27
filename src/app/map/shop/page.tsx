'use client';

import BackButton from '@/components/common/BackButton';
import { SearchInput } from '@/components/common/SearchInput';
import { LoadAddressSection } from '@/components/map/LoadAddressSection';
import KakaoDynamicMap from '@/components/shop/KakaoDynamicMap';
import { zIndex } from '@/constants/zIndex';
import { useRouter } from 'next/navigation';

export default function MapShopPage() {
  const router = useRouter();

  return (
    <KakaoDynamicMap>
      <header
        className={`p-4 w-full absolute left-[50%] -translate-x-1/2 z-${zIndex.mapHeader} bg-white`}
      >
        <div className="flex flex-col gap-2">
          <BackButton />
          <span>
            새로 추가할 붕어빵 가게의 <br />
            위치를 선택해 주세요
          </span>
          <SearchInput
            placeholder={'주변 건물 이름, 주소'}
            onClick={() => router.push('/map/shop/search')}
          />
        </div>
      </header>
      <footer
        className={`h-[200px] p-4 absolute bottom-8 w-full z-${zIndex.loadAddressSection} bg-white`}
      >
        <LoadAddressSection />
      </footer>
    </KakaoDynamicMap>
  );
}
