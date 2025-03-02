'use client';

import { useUserLevelInfo } from '@/api/level/user';
import Image from 'next/image';
import { Modal } from '../ui/modal';
import { useState } from 'react';

export function LevelInfo() {
  const { data: userData } = useUserLevelInfo();
  const [isOpen, setIsOpen] = useState(false);

  return (
    userData && (
      <div className="w-full px-6">
        <header className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="flex justify-center items-center px-[5px] bg-[#FFA914] rounded-md">
              <span className="text-xs text-white">레벨 {userData.level}</span>
            </div>
            <span className="font-bold text-2xl text-[#9C6403]">
              {userData.nickname}
            </span>
          </div>
          <Image
            width={20}
            height={20}
            src={'/images/svg/level_question.svg'}
            alt="level description"
            className="cursor-pointer"
            // onClick={() => setIsOpen(true)}
          />
          <Modal
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            titleElement={<h2 className="text-2xl">레벨 설명</h2>}
          >
            <div className="flex flex-col">
              <div></div>
              <div></div>
            </div>
          </Modal>
        </header>
      </div>
    )
  );
}
