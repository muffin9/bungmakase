import axios from 'axios';
import auth from './auth';

export const getDogams = async () => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dogam/list`);
};

export const getUserDogams = async () => {
  return await auth.get(`${process.env.NEXT_PUBLIC_API_URL}/dogam/userList`);
};

export const getUserDogamDetail = async (bungId: number) => {
  return await auth.get(`${process.env.NEXT_PUBLIC_API_URL}/dogam`, {
    params: { bungId },
  });
};
