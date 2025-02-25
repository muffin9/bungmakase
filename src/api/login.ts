export async function kakaoLogin(): Promise<void> {
  const isLocal = process.env.NODE_ENV === 'development';
  const apiUrl = isLocal
    ? `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao?state=local`
    : `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao`;

  window.location.href = apiUrl;
}
