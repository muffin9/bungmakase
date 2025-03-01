import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getDogams = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/dogam/list`,
  );
  if (response.status === 200) {
    return response.data.data;
  }

  return [];
};

export const useGetDogams = () => {
  return useQuery({
    queryKey: ['dogams'],
    queryFn: getDogams,
  });
};
