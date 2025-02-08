import { FormData } from '@/components/LoginForm';

interface SignUpResponse {
  success: boolean;
  message: string;
}

export async function signUp(data: FormData): Promise<SignUpResponse> {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '회원가입에 실패했습니다');
  }

  return response.json();
}
