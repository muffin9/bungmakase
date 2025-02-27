import { MarkerType } from '@/types/map';
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

// 특정 지역의 마커만 가져오는 쿼리
export function useGetMarkersInBounds(bounds: {
  sw: { lat: number; lng: number };
  ne: { lat: number; lng: number };
}) {
  return useQuery({
    queryKey: ['markers', bounds],
    queryFn: getMarkers,
    enabled: !!bounds, // bounds가 있을 때만 쿼리 실행
    select: (data) => {
      // 주어진 bounds 내의 마커만 필터링
      return data.filter(
        (marker: MarkerType) =>
          marker.latitude >= bounds.sw.lat &&
          marker.latitude <= bounds.ne.lat &&
          marker.longitude >= bounds.sw.lng &&
          marker.longitude <= bounds.ne.lng,
      );
    },
  });
}
