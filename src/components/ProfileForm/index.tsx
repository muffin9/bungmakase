'use client';

import Image from 'next/image';
import BackButton from '../common/BackButton';
import Logo from '../common/Logo';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

import { BaseInput } from '../common/BaseInput';
import { Info } from 'lucide-react';
import { Button } from '../ui/button';
import { z } from 'zod';
import { useRef, useState } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const nicknameSchema = z
  .string()
  .min(1, '닉네임을 입력해주세요')
  .max(12, '닉네임은 12자 이내로 입력해주세요')
  .regex(/^[가-힣a-z]+$/, '닉네임은 한글과 영문 소문자만 입력 가능합니다');

export function ProfileForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState('');
  const { uploadImage, isUploading } = useImageUpload();
  const [isDuplicate, setIsDuplicate] = useState(false);

  const {
    register,
    formState: { errors, dirtyFields },
    watch,
    handleSubmit,
    trigger,
  } = useForm({
    resolver: zodResolver(nicknameSchema),
    mode: 'onChange',
  });

  const watchedNickname = watch('nickname');

  const getNicknameCorrect = () => {
    if (!dirtyFields.nickname || errors.nickname) return '';
    if (nicknameSchema.safeParse(watchedNickname).success) {
      return '사용 가능한 닉네임입니다';
    }
    return '';
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await uploadImage(file);
      setProfileImage(imageUrl as string);
    }
  };

  const handleDuplicateCheck = async () => {
    const isValid = await trigger('nickname');
    if (!isValid) return;

    // TODO: 중복 체크 API 호출
    setIsDuplicate(true);
  };

  const onSubmit = handleSubmit(async (data) => {
    const isValid = await trigger('nickname');
    if (!isValid) return;

    console.log('Form submitted:', {
      ...data,
      profileImage,
    });
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-yellow-gradient h-screen px-6 py-8 flex flex-col items-center"
    >
      <div className="w-full">
        <header className="flex flex-col gap-1">
          <div>
            <BackButton />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl text-[#181818]">
              프로필을
              <br />
              작성해주세요 :)
            </h1>
          </div>
        </header>

        <form
          className="h-full flex flex-col items-center mt-24"
          onSubmit={onSubmit}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'w-[157px] h-[157px] relative rounded-full bg-[#F6EEDF] flex justify-center items-center cursor-pointer mb-6 border border-[#FFD997]',
              isUploading && 'opacity-50',
            )}
            onClick={handleImageClick}
          >
            {profileImage ? (
              <Image
                src={profileImage}
                alt="프로필 이미지"
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <Logo size="medium" />
            )}
            <motion.div
              className="rounded-full w-[50px] h-[50px] flex items-center justify-center bg-primary absolute bottom-0 right-0"
              whileHover={{ scale: 1.1 }}
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Image
                  src="/images/svg/photo.svg"
                  alt="사진"
                  width={28}
                  height={28}
                />
              )}
            </motion.div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={isUploading}
            />
          </motion.div>

          <div className="w-full flex items-center gap-2">
            <div className="flex-1">
              <BaseInput
                id="nickname"
                label="닉네임"
                placeholder="닉네임을 입력해주세요"
                correct={getNicknameCorrect()}
                {...register('nickname')}
                helperText={
                  <div className="absolute flex items-center gap-1">
                    <Info className="w-4 h-4" />
                    <span className="text-xs">
                      닉네임은 한글과 영문 소문자 12자 이내로 입력해주세요.
                    </span>
                  </div>
                }
              />
            </div>
            <Button
              type="button"
              onClick={handleDuplicateCheck}
              className="w-[70px] h-[50px] self-start mt-8 text-xs"
            >
              중복 확인
            </Button>
          </div>

          <Button
            type="submit"
            className="mt-auto w-full"
            disabled={!isDuplicate}
          >
            완료
          </Button>
        </form>
      </div>
    </motion.section>
  );
}
