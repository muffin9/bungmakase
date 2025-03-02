import { useModalStore } from '@/hooks/useModalStore';
import { useCurrentAddress } from '@/store/useCurrentAddress';
import useShopStore from '@/store/useShopStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface CreateShopData {
  shopName: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  startTime: string;
  endTime: string;
  tastes: string[];
  file: File;
}

async function createShop(data: CreateShopData) {
  const formData = new FormData();

  const shopData = {
    shopName: data.shopName,
    address: data.address,
    latitude: data.latitude,
    longitude: data.longitude,
    phone: data.phone,
    startTime: data.startTime,
    endTime: data.endTime,
    tastes: data.tastes,
  };

  const shopDataBlob = new Blob([JSON.stringify(shopData)], {
    type: 'application/json',
  });

  formData.append('shopData', shopDataBlob);
  formData.append('image', data.file);

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/map/shops`,
    formData,
  );

  return response.data;
}

export function useCreateShop() {
  const { openModal } = useModalStore();
  const router = useRouter();
  const { resetShopInfo } = useShopStore();
  const { resetLocation } = useCurrentAddress();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createShop,
    onSuccess: (data) => {
      if (data.code === 201) {
        openModal({
          title: '성공',
          description: '붕어빵 가게를 추가했어요.',
          type: 'success',
        });
        queryClient.invalidateQueries({ queryKey: ['markers'] });
        router.push('/map');
      } else if (data.code === 400) {
        openModal({
          title: '오류',
          description: data.message,
          type: 'error',
        });
      }
      resetShopInfo();
      resetLocation();
    },
    onError: () => {
      openModal({
        title: '오류',
        description: '오류가 발생했습니다.',
        type: 'error',
      });
    },
  });
}
