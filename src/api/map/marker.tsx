// /map/markers

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getMarkers = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/map/markers`,
  );

  return response.data;
};

export function useGetMarkers() {
  return useQuery({
    queryKey: ['markers'],
    queryFn: getMarkers,
  });
}
