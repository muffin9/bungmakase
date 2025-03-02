import { useQuery } from '@tanstack/react-query';
import auth from '../auth';

const getUserLevelInfo = async () => {
  const response = await auth.get(
    `${process.env.NEXT_PUBLIC_API_URL}/level/user`,
  );
  if (response.status === 200) {
    return response.data.data;
  }

  return null;
};

const getUserRankings = async () => {
  const response = await auth.get(
    `${process.env.NEXT_PUBLIC_API_URL}/level/rankings`,
  );
  if (response.status === 200) {
    return response.data.data;
  }

  return null;
};

export const useUserLevelInfo = () => {
  return useQuery({
    queryKey: ['userLevelInfo'],
    queryFn: getUserLevelInfo,
  });
};

export const useUserRankings = () => {
  return useQuery({
    queryKey: ['userRankings'],
    queryFn: getUserRankings,
  });
};
