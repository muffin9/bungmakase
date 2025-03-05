'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { RiErrorWarningFill } from 'react-icons/ri';
import React, { useState } from 'react';
import { useNicknameCheck } from '@/api/user/nickname';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateUserNickname } from '@/api/mypage';
import { useModalStore } from '@/hooks/useModalStore';
import BackButton from '@/components/common/BackButton';
import { useImageUpload } from '@/hooks/useImageUpload';
import Image from 'next/image';

const nicknameSchema = z
  .string()
  .min(1, '닉네임을 입력해주세요')
  .max(12, '닉네임은 12자 이내로 입력해주세요')
  .regex(/^[가-힣a-z]+$/, '닉네임은 한글과 영문 소문자만 입력 가능합니다');

const MypageUpdate = () => {
  const router = useRouter();
  const [selectName, setSelectName] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const { openModal } = useModalStore();
  const queryClient = useQueryClient();

  const {
    files,
    fileInputRef,
    handleImageChange,
    isLoading: fileLoading,
  } = useImageUpload();

  const { mutate: checkNickname } = useNicknameCheck({
    onDuplicateCheck: (isDuplicate) => setIsDuplicate(!isDuplicate),
  });

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserProfile,
  });

  const updateNicknameMutation = useMutation({
    mutationKey: ['updateNickname'],
    mutationFn: (nickname: string) => updateUserNickname(nickname, files[0]),
    onSuccess: () => {
      openModal({
        title: '수정되었습니다.',
        description: '수정되었습니다.',
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      router.back();
    },
    onError: (error) => {
      console.error(error);
      openModal({
        title: '오류',
        description: '알 수 없는 오류가 발생했습니다.',
        type: 'error',
      });
    },
  });

  const onClickCheckId = () => {
    const result = nicknameSchema.safeParse(selectName);
    if (!result.success) {
      alert(result.error.errors[0].message);
      return;
    }
    checkNickname(selectName);
  };

  const onClickUpdateBtn = () => {
    updateNicknameMutation.mutate(selectName);
  };

  return (
    <div className="bg-yellow-gradient relative py-8">
      <div className="w-full relative mb-2 ml-5">
        <BackButton />
      </div>
      <div>
        <p className="text-xl font-medium px-6 mb-24">
          프로필을
          <br />
          작성해주세요 &#58;&#41;
        </p>
        <div className="w-full flex justify-center mb-14">
          <div
            className="w-[157px] h-[157px] relative rounded-full bg-primary/10 border border-primary flex justify-center items-center cursor-pointer mb-6"
            onClick={() => fileInputRef.current?.click()}
          >
            {files[0] ? (
              <div className="w-[89px] h-[89px] relative rounded-full bg-[#F6EEDF] flex justify-center items-center cursor-pointer mb-6">
                <Image
                  src={
                    files[0]
                      ? URL.createObjectURL(files[0])
                      : '/images/logo.png'
                  }
                  alt="profile"
                  width={89}
                  height={89}
                  className="rounded-full"
                />
              </div>
            ) : (
              <Image
                src={profile?.data?.data?.imageUrl || '/images/logo.png'}
                width={89}
                height={89}
                alt="사진"
                className="rounded-full"
              />
            )}

            <div className="rounded-full w-14 h-14 flex items-center justify-center bg-primary absolute bottom-0 right-0">
              <Image
                src={'/images/svg/photo.svg'}
                alt="사진"
                width={30}
                height={30}
              />
            </div>
          </div>
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
        <div className="px-6">
          <p className="mb-2">닉네임</p>
          <div className="flex items-center gap-[10px] mb-2">
            <Input
              value={selectName}
              onChange={(e) => setSelectName(e.target.value)}
            />
            <Button
              className="w-[70px] font-light text-xs"
              onClick={onClickCheckId}
            >
              중복 확인
            </Button>
          </div>
          <div className="text-[#969696] font-light text-xs flex items-center gap-1">
            <RiErrorWarningFill className="w-4 h-4" />
            닉네임은 한글과 영문 소문자 12자 이내로 입력해주세요
          </div>
        </div>
        <div className="w-full gap-3 px-5 mt-5 mb-14">
          <Button disabled={!isDuplicate} onClick={onClickUpdateBtn}>
            완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MypageUpdate;
