import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export interface EmailResponse {
  code: number;
  data: null;
  message: string;
  status: 'success' | 'fail';
}

async function checkEmailDuplicate(email: string): Promise<EmailResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/check-email?email=${email}`,
  );

  if (!response.ok) {
    throw new Error('이메일 중복 확인 중 오류가 발생했습니다.');
  }

  return response.json();
}

async function checkEmailLogin(
  email: string,
  password: string,
): Promise<EmailResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login/email`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  );

  if (!response.ok) {
    throw new Error('이메일 로그인 중 오류가 발생했습니다.');
  }

  return response.json();
}

export function useEmailCheck() {
  return useMutation({
    mutationFn: (email: string) => checkEmailDuplicate(email),
  });
}

export function useEmailLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      checkEmailLogin(data.email, data.password),
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {
      console.error('로그인 중 오류가 발생했습니다.');
    },
  });
}
