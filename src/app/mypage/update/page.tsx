'use client';

import Profile from '@/components/common/Profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RiErrorWarningFill } from 'react-icons/ri';
import React, { useState } from 'react';
import { useNicknameCheck } from '@/api/user/nickname';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { updateUserNickname } from '@/api/mypage';

const nicknameSchema = z
  .string()
  .min(1, '닉네임을 입력해주세요')
  .max(12, '닉네임은 12자 이내로 입력해주세요')
  .regex(/^[가-힣a-z]+$/, '닉네임은 한글과 영문 소문자만 입력 가능합니다');

const MypageUpdate = () => {
  const router = useRouter();
  const [selectName, setSelectName] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

  const { mutate: checkNickname } = useNicknameCheck({
    onDuplicateCheck: (isDuplicate) => setIsDuplicate(!isDuplicate),
  });

  const updateNicknameMutation = useMutation({
    mutationKey: ['d'],
    mutationFn: (nickname: string) => updateUserNickname(nickname),
    onSuccess: () => {
      alert('수정되었습니다.');
      router.back();
    },
    onError: (error) => {
      console.error(error);
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
    <div className="bg-yellow-gradient h-screen relative">
      <div className="pt-10 h-20 w-full relative">
        <Image
          src="/images/svg/arrow-left.svg"
          alt="뒤로가기"
          width={10}
          height={17}
          className="cursor-pointer absolute left-6"
          onClick={() => router.back()}
        />
      </div>
      <div>
        <p className="text-xl font-medium px-6 mb-24">
          프로필을
          <br />
          작성해주세요 &#58;&#41;
        </p>
        <div className="w-full flex justify-center mb-14">
          <Profile />
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
      </div>
      <div className="absolute bottom-20 flex w-full gap-3 px-5 xs:w-[375px]">
        <Button disabled={!isDuplicate} onClick={onClickUpdateBtn}>
          완료
        </Button>
      </div>
    </div>
  );
};

export default MypageUpdate;
