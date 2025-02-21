import { useMutation } from '@tanstack/react-query';

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
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error('이메일 회원가입 중 오류가 발생했습니다.');
  }

  return response.json();
}

export function useSignUpEmail() {
  return useMutation({
    mutationFn: signUpEmail,
  });
}
