'use client';

import Profile from '@/components/common/Profile';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const MyPage = () => {
  const router = useRouter();

  return (
    <div className="bg-yellow-gradient h-screen pt-[100px] flex flex-col items-center">
      <Profile size="sm" />
      <div className="flex flex-col gap-[10px] mb-8">
        <div className="flex gap-1">
          <div className="bg-primary rounded-sm p-1 h-fit text-xs text-white">
            레벨 1
          </div>
          <p className="font-medium text-xl">사용자 닉네임</p>
        </div>
        <Button
          variant={'secondary'}
          size={'xs'}
          onClick={() => router.push('/mypage/update')}
        >
          프로필 수정하기
        </Button>
      </div>
      <div className="bg-[#fff7e8] py-3 w-full text-center border-y border-primary mb-7">
        나의 붕어빵 기록
      </div>

      <div className="grid grid-cols-3 gap-[10px] w-full px-5">
        <div
          className="aspect-square bg-[#ddd] rounded-[10px] cursor-pointer"
          onClick={() => router.push('/mypage/1')}
        >
          click
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
