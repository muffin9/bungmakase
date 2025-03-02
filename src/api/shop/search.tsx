import useGeolocation from '@/hooks/map/useGeolocation';
import { SearchShopInfoType } from '@/types/map';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getSearchResult = async (shopName: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/map/markers/search/name?shopName=${shopName}`,
  );
  if (response.status === 200) {
    return response.data.data;
  }

  return [];
};

export const getSearchOneResult = async (shopId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/map/markers/search?shopId=${shopId}`,
  );
  if (response.status === 200) {
    return response.data.data[0];
  }

  return [];
};

export function useSearchShop(shopName: string) {
  const { calculateDistance } = useGeolocation();

  return useQuery({
    queryKey: ['searchShop', shopName],
    queryFn: () => getSearchResult(shopName),
    enabled: !!shopName,
    select: (data: SearchShopInfoType[]) => {
      // 각 항목에 거리 정보 추가
      return data.map((shop: SearchShopInfoType) => ({
        ...shop,
        distance: calculateDistance(shop.latitude, shop.longitude),
      }));
    },
  });
}
