import { ShopHomeInfoType } from '@/types/map';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getShopHomeInfo = async (
  shopId: string,
): Promise<ShopHomeInfoType | null> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/map/home?shopId=${shopId}`,
  );

  if (response.status === 200) {
    return response.data.data;
  }

  return null;
};

export const getShopPhotos = async (shopId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/map/home/photos?shopId=${shopId}`,
  );

  if (response.status === 200) {
    return response.data.data;
  }

  return [];
};

export const getShopReviews = async (shopId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/map/home/reviews?shopId=${shopId}`,
  );

  if (response.status === 200) {
    return response.data.data;
  }

  return [];
};

export function useShopHomeInfo(shopId: string) {
  return useQuery({
    queryKey: ['shopHomeInfo', shopId],
    queryFn: () => getShopHomeInfo(shopId),
  });
}

export function useShopPhotos(shopId: string) {
  return useQuery({
    queryKey: ['shopPhotos', shopId],
    queryFn: () => getShopPhotos(shopId),
  });
}

export function useShopReviews(shopId: string) {
  return useQuery({
    queryKey: ['shopReviews', shopId],
    queryFn: () => getShopReviews(shopId),
  });
}
