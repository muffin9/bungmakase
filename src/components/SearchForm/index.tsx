'use client';

import { SearchInput } from '@/components/common/SearchInput';
import { RecentSearchForm } from '../RecentSearchForm';
import { useSearchValue } from '@/hooks/useSearchValue';
import { useSearchShopStore } from '@/store/useSearchShopStore';
import { useRouter } from 'next/navigation';
import { useSearchShop } from '@/api/shop/search';
import { SearchShopInfoType } from '@/types/map';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { useCurrentAddress } from '@/store/useCurrentAddress';

export function SearchForm() {
  const router = useRouter();
  const { value, updatedValue, handleChange } = useSearchValue();
  const { setResultShopSearchInfo } = useSearchShopStore();
  const { data: shopData } = useSearchShop(value);
  const { addRecentSearch } = useRecentSearches();
  const { setLocation } = useCurrentAddress();

  const handleSearch = (latitude?: number, longitude?: number) => {
    if (value && shopData && shopData.length > 0) {
      addRecentSearch(value);
      setResultShopSearchInfo(shopData);
      setLocation({
        latitude: latitude || shopData[0].latitude,
        longitude: longitude || shopData[0].longitude,
      });
      router.push(`/map`);
    }
  };

  return (
    <div className="flex flex-col">
      <SearchInput
        placeholder="가까운 붕어빵 가게를 찾아보세요!"
        value={value}
        onChange={handleChange}
        onEnter={handleSearch}
      />
      {value ? (
        <div className="py-2">
          {shopData &&
            shopData.map((item: SearchShopInfoType) => {
              return (
                <div
                  key={item.shopId}
                  className="flex flex-col p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                  onClick={() => handleSearch(item.latitude, item.longitude)}
                >
                  <div>{item.shopName}</div>
                  <div className="text-xs font-light">{item.address}</div>
                </div>
              );
            })}
        </div>
      ) : (
        <RecentSearchForm updatedValue={updatedValue} />
      )}
    </div>
  );
}
