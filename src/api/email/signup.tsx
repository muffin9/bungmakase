import { useModalStore } from '@/hooks/useModalStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface SignUpData {
  email: string;
  password: string;
  nickname: string;
  profileImage?: File;
}

interface SignUpResponse {
  code: number;
  data: null;
  message: string;
  status: 'success' | 'fail';
}

async function signUpEmail(data: SignUpData): Promise<SignUpResponse> {
  const formData = new FormData();

  const userData = {
    email: data.email,
    password: data.password,
    nickname: data.nickname,
  };

  const userDataBlob = new Blob([JSON.stringify(userData)], {
    type: 'application/json',
  });

  formData.append('userData', userDataBlob);

  if (data.profileImage) {
    formData.append('image', data.profileImage);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signup/email`,
    {
      method: 'POST',
      cache: 'no-store',
      body: formData,
    },
  );

  return response.json();
}

export function useSignUpEmail() {
  const { openModal } = useModalStore();
  const router = useRouter();

  return useMutation({
    mutationFn: signUpEmail,
    onSuccess: (data) => {
      if (data.code === 201) {
        router.push('/');
      } else if (data.code === 400) {
        openModal({
          title: '이메일 회원가입 재확인',
          description: data.message,
          type: 'fail',
        });
      }
    },
    onError: () => {
      openModal({
        title: '오류',
        description: '이메일 회원가입 중 오류가 발생했습니다.',
        type: 'error',
      });
    },
  });
}
