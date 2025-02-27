import { UserLogsList, UserProfile } from '@/types/mypage';
import auth from './auth';

// 유저정보프로필
export const getUserProfile = async (): Promise<UserProfile> => {
  return await auth.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/user`);
};

// 나의붕어빵기록
export const getUserLogsList = async (): Promise<UserLogsList> => {
  return await auth.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/logs/list`);
};
