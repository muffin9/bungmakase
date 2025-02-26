import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getDecryptedAccessToken, setEncryptedAccessToken } from '@/lib/cookie';

const tokenInterceptor = () => {
  const setAuthHeader = async function (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${getDecryptedAccessToken()}`;
    }
    // config.withCredentials = true;
    return config;
  };

  // axios res header에 AT 존재하면 저장
  const setNewAccessToken = (response: AxiosResponse): AxiosResponse => {
    const newToken = response.headers['authorization'];
    if (newToken) {
      const accessToken = newToken.replace('Bearer ', '');
      setEncryptedAccessToken(accessToken);
    }
    return response;
  };

  return {
    setAuthHeader,
    setNewAccessToken,
  };
};

export const { setAuthHeader, setNewAccessToken } = tokenInterceptor();
