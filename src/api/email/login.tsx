import { useModalStore } from '@/hooks/useModalStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { setEncryptedAccessToken } from '@/lib/cookie';

export interface EmailResponse {
  code: number;
  data: null;
  message: string;
  status: 'success' | 'fail';
}

async function checkEmailDuplicate(email: string): Promise<EmailResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/check-email?email=${email}`,
    { cache: 'no-store' },
  );

  return response.json();
}

async function checkEmailLogin(email: string, password: string) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login/email`,
    {
      email,
      password,
    },
    { withCredentials: true },
  );

  if (response.data.data) {
    const token = response.data.data.token;
    setEncryptedAccessToken(token);
  }
}

interface UseEmailCheckProps {
  onDuplicateCheck?: (isDuplicate: boolean) => void;
}

export function useEmailCheck({ onDuplicateCheck }: UseEmailCheckProps = {}) {
  const { openModal } = useModalStore();

  return useMutation({
    mutationFn: (email: string) => checkEmailDuplicate(email),
    onSuccess: (data) => {
      if (data.code === 409) {
        onDuplicateCheck?.(true);
        openModal({
          title: '이메일 중복 확인',
          description: '이미 사용 중인 이메일입니다.',
          type: 'error',
        });
      } else if (data.code === 200) {
        onDuplicateCheck?.(false);
        openModal({
          title: '이메일 중복 확인',
          description: '사용 가능한 이메일입니다.',
          type: 'success',
        });
      }
    },
    onError: () => {
      onDuplicateCheck?.(true);
      openModal({
        title: '오류',
        description: '이메일 중복 확인 중 오류가 발생했습니다.',
        type: 'error',
      });
    },
  });
}

export function useEmailLogin() {
  const router = useRouter();
  const { openModal } = useModalStore();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      checkEmailLogin(data.email, data.password),
    onSuccess: () => {
      openModal({
        title: '로그인 성공',
        description: '로그인에 성공했습니다.',
        type: 'success',
      });
      router.push('/');
    },
    onError: () => {
      openModal({
        title: '로그인 실패',
        description: '로그인 중 오류가 발생했습니다.',
        type: 'error',
      });
      console.error('로그인 중 오류가 발생했습니다.');
    },
  });
}
