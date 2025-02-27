'use client';

import { getSearchResult } from '@/api/shop/search';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { useCurrentAddress } from '@/store/useCurrentAddress';
import { useSearchShopStore } from '@/store/useSearchShopStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function RecentSearchForm() {
  const router = useRouter();
  const { recentSearches, removeRecentSearch, clearRecentSearches } =
    useRecentSearches();
  const { setResultShopSearchInfo } = useSearchShopStore();
  const { setLocation } = useCurrentAddress();

  return (
    <div className="flex flex-col">
      <header className="py-4 flex justify-between">
        <span className="text-xs">최근 검색</span>
        <span
          className="text-xs font-light cursor-pointer"
          onClick={clearRecentSearches}
        >
          전체 삭제
        </span>
      </header>
      <div className="flex flex-col gap-2">
        {recentSearches.map((term) => (
          <div key={term} className="flex justify-between">
            <p
              className="w-full cursor-pointer"
              onClick={async () => {
                const data = await getSearchResult(term);
                setResultShopSearchInfo(data);
                setLocation({
                  latitude: data[0].latitude,
                  longitude: data[0].longitude,
                });
                router.push('/map');
              }}
            >
              {term}
            </p>
            <button onClick={() => removeRecentSearch(term)}>
              <Image
                src="/images/svg/delete.svg"
                width={16}
                height={16}
                alt="recent-search"
                className="cursor-pointer"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
