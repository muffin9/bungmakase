'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const MypageDetail = () => {
  const router = useRouter();
  const { id } = useParams();

  const onClickUpdate = () => {
    router.push(`/mypage/${id}/update`);
  };

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
        <p className="font-medium text-center">나의 붕어빵 기록</p>
      </div>
      <div className="bg-primary/50 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[calc(100%-40px)] xs:w-[335px] rounded-3xl shadow-[1px_1px_10px_0px_rgba(0,0,0,.25)] p-9">
        <p className="text-center font-medium text-2xl mb-7">
          붕어빵 종류 (이름)
        </p>
        <div className="rounded-[10px] bg-[#d9d9d9] w-full h-[128px] mb-7">
          contents
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center font-light">
            <p>날짜</p>
            <p>2025 00 00</p>
          </div>
          <div className="flex justify-between items-center font-light">
            <p>붕어빵 개수</p>
            <p>1개</p>
          </div>
          <div className="flex justify-between items-center font-light">
            <p>붕어빵 특징</p>
            <p># 태그</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-20 flex w-full gap-3 px-5 xs:w-[375px]">
        <Button variant={'outline'}>삭제하기</Button>
        <Button onClick={onClickUpdate}>수정하기</Button>
      </div>
    </div>
  );
};

export default MypageDetail;
