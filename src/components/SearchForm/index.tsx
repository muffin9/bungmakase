'use client';

import { SearchInput } from '@/components/common/SearchInput';
import { RecentSearchForm } from '../RecentSearchForm';
import { useSearchValue } from '@/hooks/useSearchValue';
import { useSearchShopStore } from '@/store/useSearchShopStore';
import { useRouter } from 'next/navigation';
import { getSearchOneResult, useSearchShop } from '@/api/shop/search';
import { SearchShopInfoType } from '@/types/map';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { useCurrentAddress } from '@/store/useCurrentAddress';
import useGeolocation from '@/hooks/map/useGeolocation';

export function SearchForm() {
  const router = useRouter();
  const { value, updatedValue, handleChange } = useSearchValue();
  const { setResultShopSearchInfo } = useSearchShopStore();
  const { data: shopData } = useSearchShop(value);
  const { addRecentSearch } = useRecentSearches();
  const { setLocation } = useCurrentAddress();
  const { calculateDistance } = useGeolocation();

  const handleSearch = () => {
    if (value && shopData && shopData.length > 0) {
      addRecentSearch(value);
      setResultShopSearchInfo(shopData);
      setLocation({
        latitude: shopData[0].latitude,
        longitude: shopData[0].longitude,
      });
      router.push(`/map`);
    }
  };

  const handleOneSearch = async (shopId: string, shopName: string) => {
    addRecentSearch(shopName);
    const shopData = await getSearchOneResult(shopId);
    const distance = calculateDistance(shopData.latitude, shopData.longitude);
    setResultShopSearchInfo([{ ...shopData, distance }]);
    setLocation({
      latitude: shopData.latitude,
      longitude: shopData.longitude,
    });
    router.push(`/map`);
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
                  onClick={() => handleOneSearch(item.shopId, item.shopName)}
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
