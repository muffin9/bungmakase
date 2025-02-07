'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdPhotoCamera } from 'react-icons/md';

const MypageUpdatePage = () => {
  const router = useRouter();

  return (
    <div>
      <div className="mt-10 h-10 w-full relative border-b border-[#D9D9D9]">
        <Image
          src="/images/svg/arrow-left.svg"
          alt="뒤로가기"
          width={10}
          height={17}
          className="cursor-pointer absolute left-6"
          onClick={() => router.back()}
        />
        <p className="font-medium text-center">나의 붕어빵 기록 수정</p>
      </div>
      <div className="mt-[46px] flex flex-col items-center">
        <div className="bg-[#d9d9d9] rounded-[10px] w-[127px] h-[127px] mb-3">
          photo
        </div>
        <button className="bg-primary w-[115px] mb-8 gap-2 h-10 rounded-[10px] flex items-center justify-center text-white text-sm">
          <MdPhotoCamera className="w-5 h-5" />
          사진 추가
        </button>
        <div className="flex flex-col gap-[10px]">
          <div className="w-full border border-[#d6d6d6] rounded-[10px] px-[30px] py-6 flex items-center justify-between">
            <p>날짜</p>
            <input
              placeholder="2025 01 01"
              className="outline-none font-light text-right"
            />
          </div>
          <div className="w-full border border-[#d6d6d6] rounded-[10px] px-[30px] py-6 flex items-center justify-between">
            <p>붕어빵 개수</p>
            <input
              placeholder="1 개"
              className="outline-none font-light text-right"
            />
          </div>
          <div className="w-full border border-[#d6d6d6] rounded-[10px] px-[30px] py-6 flex items-center justify-between">
            <p>붕어빵 종류</p>
            <input
              placeholder="팥 붕어빵"
              className="outline-none font-light text-right"
            />
          </div>
          <div className="w-full border border-[#d6d6d6] rounded-[10px] px-[30px] py-6 flex items-center justify-between">
            <p>붕어빵 특징</p>
            <input
              placeholder="# 직접 입력하기"
              className="outline-none font-light text-right"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-20 flex w-full gap-3 px-5 xs:w-[375px]">
        <Button onClick={() => router.back()}>저장하기</Button>
      </div>
    </div>
  );
};

export default MypageUpdatePage;
