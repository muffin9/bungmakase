export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const isLocal = process.env.NODE_ENV === 'development' && 'local';

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao/callback?code=${code}&state=${isLocal}`,
      {
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error('Login failed');
    }

    console.log(response);

    // 쿠키를 포함한 응답을 받아서 프론트엔드로 전달
  } catch (error) {
    console.error('Login error:', error);
  }
}
