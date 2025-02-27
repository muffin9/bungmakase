import { Dogams } from '@/types/home';
import axios from 'axios';

export const getDogams = async (): Promise<Dogams> => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dogam/list`);
};
