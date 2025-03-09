import useGeolocation from '@/hooks/map/useGeolocation';
import { SearchShopInfoType } from '@/types/map';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getMarkers = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/map/markers`,
  );

  if (response.status === 200) {
    return response.data.data;
  }

  return [];
};

export function useGetMarkers() {
  return useQuery({
    queryKey: ['markers'],
    queryFn: async () => {
      try {
        return await getMarkers();
      } catch (error) {
        console.error('마커 조회 오류:', error);
        throw error;
      }
    },
  });
}

// 특정 지역의 마커만 가져오는 쿼리
export function useGetMarkersInBounds(bounds: {
  sw: { lat: number; lng: number };
  ne: { lat: number; lng: number };
}) {
  const { calculateDistance } = useGeolocation();
  return useQuery({
    queryKey: ['markers', bounds],
    queryFn: getMarkers,
    enabled: !!bounds, // bounds가 있을 때만 쿼리 실행
    select: (data) => {
      // 주어진 bounds 내의 마커만 필터링
      return data
        .filter(
          (marker: SearchShopInfoType) =>
            marker.latitude >= bounds.sw.lat &&
            marker.latitude <= bounds.ne.lat &&
            marker.longitude >= bounds.sw.lng &&
            marker.longitude <= bounds.ne.lng,
        )
        .map((marker: SearchShopInfoType) => ({
          ...marker,
          distance: calculateDistance(marker.latitude, marker.longitude),
        }));
    },
  });
}
