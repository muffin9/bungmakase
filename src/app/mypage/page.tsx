'use client';

import Logo from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const MyPage = () => {
  return (
    <div className="bg-yellow-gradient h-screen pt-[100px] flex flex-col items-center">
      <div className="w-[89px] h-[89px] relative rounded-full bg-[#F6EEDF] flex justify-center items-center cursor-pointer mb-6">
        <Logo size="xSmall" />
        <div className="rounded-full w-7 h-7 flex items-center justify-center bg-primary absolute bottom-0 right-0">
          <Image
            src="/images/svg/photo.svg"
            alt="사진"
            width={17}
            height={17}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[10px] mb-8">
        <div className="flex gap-1">
          <div className="bg-primary rounded-sm p-1 h-fit text-xs text-white">
            레벨 1
          </div>
          <p className="font-medium text-xl">사용자 닉네임</p>
        </div>
        <Button variant={'secondary'} size={'xs'}>
          프로필 수정하기
        </Button>
      </div>
      <div className="bg-[#fff7e8] py-3 w-full text-center border-y border-primary mb-7">
        나의 붕어빵 기록
      </div>

      <div className="grid grid-cols-3 gap-[10px] w-full px-5">
        <div className="aspect-square bg-[#ddd] rounded-[10px] cursor-pointer">
          contents
        </div>
        <div className="aspect-square bg-[#ddd] rounded-[10px] cursor-pointer">
          contents
        </div>
        <div className="aspect-square bg-[#ddd] rounded-[10px] cursor-pointer">
          contents
        </div>
        <div className="aspect-square bg-[#ddd] rounded-[10px] cursor-pointer">
          contents
        </div>
      </div>
    </div>
  );
};

export default MyPage;
