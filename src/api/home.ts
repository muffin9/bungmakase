import { DogamDetail, Dogams } from '@/types/home';
import axios from 'axios';
import auth from './auth';

export const getDogams = async (): Promise<Dogams> => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dogam/list`);
};

export const getUserDogams = async (): Promise<Dogams> => {
  return await auth.get(`${process.env.NEXT_PUBLIC_API_URL}/dogam/userList`);
};

export const getUserDogamDetail = async (
  bungId: number,
): Promise<DogamDetail> => {
  return await auth.get(`${process.env.NEXT_PUBLIC_API_URL}/dogam`, {
    params: { bungId },
  });
};
