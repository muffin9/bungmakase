import { useModalStore } from '@/hooks/useModalStore';
import { removeAccessToken } from '@/lib/cookie';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import auth from '@/api/auth';

async function logout() {
  const response = await auth.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
  );

  return response.data.data;
}

export function useLogout() {
  const { openModal } = useModalStore();
  const router = useRouter();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      if (data.code === 200) {
        removeAccessToken();
        router.push('/login');
      }
    },
    onError: () => {
      openModal({
        title: '로그아웃 실패',
        description: '로그아웃에 실패했습니다.',
        type: 'error',
      });
    },
  });
}
