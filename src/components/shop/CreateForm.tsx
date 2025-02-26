'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BaseInput } from '@/components/common/BaseInput';
import BungTypeSelector from '@/components/common/BungTypeSelector';
import useShopStore from '@/store/useShopStore';
import { Button } from '@/components/ui/button';
import { LabeledInfoField } from '../common/LabeledInfoField';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useCreateShop } from '@/api/shop/create';
import { useCurrentAddress } from '@/store/useCurrentAddress';

const formSchema = z.object({
  shopName: z.string().min(1, '이름을 입력해주세요'),
  phone: z
    .string()
    .min(1, '전화번호를 입력해주세요')
    .regex(
      /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/,
      '올바른 전화번호 형식이 아닙니다',
    ),
  startTime: z
    .string()
    .min(1, '시간을 입력해주세요')
    .regex(/^[0-9]{2}:[0-9]{2}$/, '올바른 형식이 아닙니다'),
  endTime: z
    .string()
    .min(1, '시간을 입력해주세요')
    .regex(/^[0-9]{2}:[0-9]{2}$/, '올바른 형식이 아닙니다'),
});

export type FormData = z.infer<typeof formSchema>;

function CreateForm() {
  const { mutate: createShop } = useCreateShop();
  const { shopInfo, updateShopInfo } = useShopStore();
  const { latitude, longitude, currentAddress } = useCurrentAddress();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      shopName: shopInfo.name,
      phone: shopInfo.phone,
      startTime: shopInfo.startTime,
      endTime: shopInfo.endTime,
    },
  });

  const watchedName = watch('shopName');
  const watchedPhone = watch('phone');
  const watchedStartTime = watch('startTime');
  const watchedEndTime = watch('endTime');

  const {
    files,
    fileInputRef,
    handleImageChange,
    isLoading: fileLoading,
  } = useImageUpload();

  const getNameCorrect = () => {
    if (!dirtyFields.shopName || errors.shopName) return '';
    if (z.string().min(1).safeParse(watchedName).success) {
      return '사용 가능한 이름입니다';
    }
    return '';
  };

  const getPhoneCorrect = () => {
    if (!dirtyFields.phone || errors.phone) return '';
    if (
      z
        .string()
        .regex(/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/)
        .safeParse(watchedPhone).success
    ) {
      return '사용 가능한 전화번호 형식입니다';
    }
    return '';
  };

  const getStartTimeCorrect = () => {
    if (!dirtyFields.startTime || errors.startTime) return '';
    if (
      z
        .string()
        .min(1)
        .regex(/^[0-9]{2}:[0-9]{2}$/)
        .safeParse(watchedStartTime).success
    ) {
      return '가능한 시간 형식입니다';
    }
  };

  const getEndTimeCorrect = () => {
    if (!dirtyFields.endTime || errors.endTime) return '';
    if (
      z
        .string()
        .min(1)
        .regex(/^[0-9]{2}:[0-9]{2}$/)
        .safeParse(watchedEndTime).success
    ) {
      return '가능한 시간 형식입니다';
    }
  };

  const onSubmit = handleSubmit((data) => {
    updateShopInfo({
      name: data.shopName,
      phone: data.phone,
      startTime: data.startTime,
      endTime: data.endTime,
      bungType: shopInfo.bungType,
      file: files,
    });

    createShop({
      shopName: data.shopName,
      address: currentAddress,
      latitude: latitude,
      longitude: longitude,
      phone: data.phone,
      startTime: data.startTime,
      endTime: data.endTime,
      tastes: [shopInfo.bungType],
      file: files[0],
    });
  });

  const handleBungTypeChange = (type: string) => {
    updateShopInfo({ bungType: type });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col h-[calc(100vh-200px)] gap-4 mt-4"
    >
      <BaseInput
        id="name"
        label="가게 이름"
        placeholder="가게 이름을 입력해주세요"
        error={errors.shopName?.message}
        correct={getNameCorrect()}
        {...register('shopName')}
      />

      <BaseInput
        id="phone"
        label="전화번호"
        placeholder="010-0000-0000"
        error={errors.phone?.message}
        correct={getPhoneCorrect()}
        {...register('phone')}
      />

      <div className="flex gap-2">
        <BaseInput
          label="영업 시작 시간"
          placeholder="09:00"
          error={errors.startTime?.message}
          correct={getStartTimeCorrect()}
          {...register('startTime')}
        />
        <BaseInput
          label="영업 종료 시간"
          placeholder="18:00"
          error={errors.endTime?.message}
          correct={getEndTimeCorrect()}
          {...register('endTime')}
        />
      </div>

      <div
        className="cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <LabeledInfoField
          label="사진"
          value={fileInputRef.current?.files?.[0]?.name || ''}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
          disabled={fileLoading}
        />
      </div>

      <BungTypeSelector
        currentType={shopInfo.bungType}
        onTypeChange={handleBungTypeChange}
      />

      <Button
        type="submit"
        disabled={!isValid || !files.length || !shopInfo.bungType}
        className="mt-auto mb-12"
      >
        등록하기
      </Button>
    </form>
  );
}

export default CreateForm;
