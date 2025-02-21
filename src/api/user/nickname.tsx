import { useMutation } from '@tanstack/react-query';

export interface EmailCheckResponse {
  code: number;
  data: null;
  message: string;
  status: 'success' | 'fail';
}

async function checkNicknameDuplicate(
  nickname: string,
): Promise<EmailCheckResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/check-nickname?nickname=${nickname}`,
  );

  if (!response.ok) {
    throw new Error('닉네임 중복 확인 중 오류가 발생했습니다.');
  }

  return response.json();
}

export function useNicknameCheck() {
  return useMutation({
    mutationFn: (nickname: string) => checkNicknameDuplicate(nickname),
  });
}
