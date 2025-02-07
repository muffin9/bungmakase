'use client';

import Profile from '@/components/common/Profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RiErrorWarningFill } from 'react-icons/ri';
import React from 'react';

const MypageUpdate = () => {
  const router = useRouter();

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
            <Input />
            <Button className="w-[70px] font-light text-xs">중복 확인</Button>
          </div>
          <div className="text-[#969696] font-light text-xs flex items-center gap-1">
            <RiErrorWarningFill className="w-4 h-4" />
            닉네임은 한글과 영문 소문자 12자 이내로 입력해주세요
          </div>
        </div>
      </div>
      <div className="absolute bottom-20 flex w-full gap-3 px-5 xs:w-[375px]">
        <Button>완료</Button>
      </div>
    </div>
  );
};

export default MypageUpdate;
