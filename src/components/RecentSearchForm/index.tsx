'use client';

import { useRecentSearches } from '@/hooks/useRecentSearches';
import Image from 'next/image';

export function RecentSearchForm() {
  const { recentSearches, removeRecentSearch, clearRecentSearches } =
    useRecentSearches();

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
            {/* TODO: 검색 성공시, addRecentSearch 함수로 최근 검색어에 추가  */}
            <p className="w-full cursor-pointer">{term}</p>
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
