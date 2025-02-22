import { useModalStore } from '@/hooks/useModalStore';
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
    { cache: 'no-store' },
  );

  return response.json();
}

interface UseNicknameCheckProps {
  onDuplicateCheck?: (isDuplicate: boolean) => void;
}

export function useNicknameCheck({
  onDuplicateCheck,
}: UseNicknameCheckProps = {}) {
  const { openModal } = useModalStore();

  return useMutation({
    mutationFn: (nickname: string) => checkNicknameDuplicate(nickname),
    onSuccess: (data) => {
      if (data.code === 409) {
        onDuplicateCheck?.(true);
        openModal({
          title: '닉네임 중복 확인',
          description: '이미 사용 중인 닉네임입니다.',
          type: 'error',
        });
      } else if (data.code === 200) {
        onDuplicateCheck?.(false);
        openModal({
          title: '닉네임 중복 확인',
          description: '사용 가능한 닉네임입니다.',
          type: 'success',
        });
      }
    },
    onError: () => {
      onDuplicateCheck?.(true);
      openModal({
        title: '오류',
        description: '닉네임 중복 확인 중 오류가 발생했습니다.',
        type: 'error',
      });
    },
  });
}
