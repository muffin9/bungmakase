import auth from './auth';

// 유저정보프로필
export const getUserProfile = async () => {
  return await auth.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/user`);
};

// 나의붕어빵기록 전체조회
export const getUserLogsList = async () => {
  return await auth.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/logs/list`);
};

// 나의붕어빵기록 단건조회
export const getUserLogs = async (logId: string) => {
  return await auth.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/logs`, {
    params: { logId },
  });
};

// 프로필수정
export const updateUserNickname = async (nickname: string, file: File) => {
  const formData = new FormData();

  const userDataBlob = new Blob([JSON.stringify({ nickname })], {
    type: 'application/json',
  });

  formData.append('userData', userDataBlob);
  formData.append('image', file);

  const response = await auth.put(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/nickname`,
    formData,
  );

  return response.data;
};
