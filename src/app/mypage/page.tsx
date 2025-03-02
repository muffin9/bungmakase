'use client';

import { getUserLogsList, getUserProfile } from '@/api/mypage';
import { useLogout } from '@/api/user/logout';
import Profile from '@/components/common/Profile';
import { Button } from '@/components/ui/button';
import { UserLogsListType } from '@/types/mypage';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const MyPage = () => {
  const router = useRouter();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserProfile,
  });

  const { data: logsList } = useQuery({
    queryKey: ['logsList'],
    queryFn: getUserLogsList,
  });

  const { mutate: logout } = useLogout();

  return (
    <div className="bg-yellow-gradient h-screen pt-[100px] flex flex-col items-center">
      {profile?.data?.data?.imageUrl ? (
        <div className="w-[89px] h-[89px] relative rounded-full bg-[#F6EEDF] flex justify-center items-center cursor-pointer mb-6">
          <Image
            src={profile?.data?.data?.imageUrl}
            alt="profile"
            fill
            objectFit="cover"
          />
        </div>
      ) : (
        <Profile size="sm" />
      )}
      <div className="flex flex-col gap-[10px] mb-8 items-center">
        <div className="flex gap-1">
          <div className="bg-primary rounded-sm p-1 h-fit text-xs text-white">
            레벨 {profile?.data?.data?.level}
          </div>
          <p className="font-medium text-xl">{profile?.data?.data?.nickname}</p>
        </div>
        <Button
          variant={'secondary'}
          size={'xs'}
          onClick={() => router.push('/mypage/update')}
          className="w-[133px]"
        >
          프로필 수정하기
        </Button>
        <Button
          variant={'outline'}
          size={'xs'}
          className="w-[80px]"
          onClick={() => logout()}
        >
          로그 아웃
        </Button>
      </div>
      <div className="bg-[#fff7e8] py-3 w-full text-center border-y border-primary mb-7">
        나의 붕어빵 기록
      </div>

      <div className="grid grid-cols-3 gap-[10px] w-full px-5">
        {logsList?.data?.data?.map((log: UserLogsListType) => (
          <div
            key={log.logId}
            className="aspect-square bg-[#FFEED0] rounded-[10px] cursor-pointer flex justify-center items-center"
            onClick={() => router.push(`/mypage/${log.logId}`)}
          >
            {log.imageUrl ? (
              <Image src={log.imageUrl} alt="로그이미지" />
            ) : (
              <Image
                src={'/images/logo.png'}
                alt="로그이미지"
                width={50}
                height={50}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
