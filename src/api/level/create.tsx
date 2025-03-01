import { useModalStore } from '@/hooks/useModalStore';
import auth from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

interface CreateLevelData {
  bungCount: number;
  bungName: string;
  tags: string[];
  files: File[];
}

async function createLevel(data: CreateLevelData) {
  const formData = new FormData();

  const levelData = {
    bungCount: data.bungCount,
    bungName: data.bungName,
    tags: data.tags,
  };

  const levelDataBlob = new Blob([JSON.stringify(levelData)], {
    type: 'application/json',
  });

  formData.append('bungLogData', levelDataBlob);

  for (const file of data.files) {
    formData.append('files', file);
  }

  const response = await auth.post(
    `${process.env.NEXT_PUBLIC_API_URL}/level/daily`,
    formData,
  );

  return response.data;
}

export function useCreateLevel() {
  const { openModal } = useModalStore();
  const router = useRouter();

  return useMutation({
    mutationFn: createLevel,
    onSuccess: (data) => {
      if (data.code === 201) {
        openModal({
          title: '성공',
          description: '붕어빵 기록을 추가했어요.',
          type: 'success',
        });
        router.push('/level');
      } else if (data.code === 400) {
        openModal({
          title: '오류',
          description: data.message,
          type: 'error',
        });
      }
    },
  });
}
