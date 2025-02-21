interface KakaoLoginResponse {
  status: 'success' | 'error';
  code: number;
  message: string;
  data: { loginUrl: string } | null;
}

export async function kakaoLogin(): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao`,
    {
      method: 'GET',
    },
  );

  const data: KakaoLoginResponse = await response.json();

  if (data.code === 500) {
    throw new Error('로그인에 실패했습니다');
  }

  if (data.code === 200) {
    if (data.data) window.location.href = data.data.loginUrl;
  }
}
