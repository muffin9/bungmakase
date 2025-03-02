import auth from '@/api/auth';
import { useModalStore } from '@/hooks/useModalStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface CreateReviewData {
  shopId: string;
  star: number;
  bungName: string;
  reviewText: string;
  files: File[];
}

async function createReview(data: CreateReviewData) {
  const formData = new FormData();

  const reviewData = {
    shopId: data.shopId,
    star: data.star,
    bungName: data.bungName,
    reviewText: data.reviewText,
  };

  const reviewDataBlob = new Blob([JSON.stringify(reviewData)], {
    type: 'application/json',
  });

  formData.append('reviewData', reviewDataBlob);

  for (const file of data.files) {
    formData.append('image', file, file.name);
  }

  const response = await auth.post(
    `${process.env.NEXT_PUBLIC_API_URL}/map/reviews`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
}

export function useCreateReview() {
  const { openModal } = useModalStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createReview,
    onSuccess: (data) => {
      if (data.code === 201) {
        openModal({
          title: '성공',
          description: '리뷰를 작성했어요.',
          type: 'success',
        });
        const shopId = data.data.shopId;

        queryClient.invalidateQueries({
          queryKey: ['shopReviews', shopId],
        });
        queryClient.invalidateQueries({
          queryKey: ['shopPhotos', shopId],
        });

        router.push(`/shop/${shopId}`);
      } else if (data.code === 400) {
        openModal({
          title: '실패',
          description: '리뷰를 작성하는데 실패했어요.',
          type: 'fail',
        });
      }
    },
  });
}
