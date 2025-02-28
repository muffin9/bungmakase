'use client';

import { getUserLogs } from '@/api/mypage';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const MypageDetail = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: logs } = useQuery({
    queryKey: ['logs', id],
    queryFn: () => getUserLogs(String(id)),
    enabled: !!id,
  });

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
      <div className="bg-[#FFEED0] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[calc(100%-40px)] xs:w-[335px] rounded-3xl shadow-[1px_1px_10px_0px_rgba(0,0,0,.25)] p-9">
        <p className="text-center font-medium text-2xl mb-7">
          {logs?.data?.data?.bungName} 붕어빵
        </p>
        <div className="rounded-[10px] bg-white w-full h-[128px] mb-7 flex justify-center items-center">
          {logs?.data?.data?.imageUrl ? (
            <Image src={logs?.data?.data?.imageUrl} alt="로그이미지" />
          ) : (
            <Image
              src={'/images/logo.png'}
              alt="로그이미지"
              width={50}
              height={50}
            />
          )}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center font-light">
            <p>날짜</p>
            <p>{logs?.data?.data?.date}</p>
          </div>
          <div className="flex justify-between items-center font-light">
            <p>붕어빵 개수</p>
            <p>{logs?.data?.data?.bungCount}개</p>
          </div>
          <div className="flex justify-between items-center font-light">
            <p>붕어빵 특징</p>
            <div className="flex gap-2">
              {logs?.data?.data?.tags?.map((tag: string) => (
                <p key={tag}># {tag}</p>
              ))}
            </div>
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
