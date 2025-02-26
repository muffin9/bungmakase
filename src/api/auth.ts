import axios from 'axios';
import {
  setAuthHeader as reqInterceptor,
  setNewAccessToken as resInterceptor,
} from '@/lib/handleAuth';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const auth = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

auth.interceptors.request.use(reqInterceptor);
auth.interceptors.response.use(resInterceptor);

export default auth;
