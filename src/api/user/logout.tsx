import { useModalStore } from '@/hooks/useModalStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

async function logout() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    {
      method: 'POST',
      cache: 'no-store',
      credentials: 'include',
    },
  );
  return response.json();
}

export function useLogout() {
  const { openModal } = useModalStore();
  const router = useRouter();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      if (data.code === 200) {
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
