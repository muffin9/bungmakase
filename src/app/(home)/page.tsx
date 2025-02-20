'use client';

import Logo from '@/components/common/Logo';
import { Modal } from '@/components/ui/modal';
import Image from 'next/image';
import React, { useState } from 'react';

const HomePage = () => {
  const [isFishBreadModalOpen, setIsFishBreadModalOpen] = useState(false);
  const [isCaptureModalOpen, setIsCaptureModalOpen] = useState(false);

  return (
    <div className="bg-yellow-gradient h-screen relative">
      <p className="pt-28 font-medium text-2xl text-center text-third mb-[60px]">
        붕 도감
      </p>
      <p className="font-medium text-sm text-center text-third mb-7">
        발견한 붕어빵 : 4개
      </p>

      <div className="grid grid-cols-4 gap-[10px] px-5">
        {/* 있는거 */}
        <div
          className="rounded-[10px] flex items-center justify-center flex-col gap-2 bg-secondary aspect-square cursor-pointer"
          onClick={() => setIsFishBreadModalOpen(true)}
        >
          <p className="font-medium text-xs">팥 붕어빵</p>
          <Logo size="small" />
        </div>

        {/* 붕어빵 상세 모달 */}
        <Modal
          isOpen={isFishBreadModalOpen}
          onOpenChange={setIsFishBreadModalOpen}
          titleElement={<span className="text-third">붕어빵 이름</span>}
        >
          <div className="flex flex-col items-center gap-8">
            <div className="w-[260px] h-[126px] flex items-center justify-center bg-[#FFEED0] border-solid border-[1px] border-[#FFD285] rounded-lg">
              <Logo size="medium" />
            </div>
            <span className="font-light"># 태그 내용</span>
          </div>
        </Modal>

        {/* 없는거 */}
        <div className="rounded-[10px] flex items-center justify-center flex-col gap-2 bg-[#FFF5DF] aspect-square cursor-pointer">
          <p className="font-medium text-xs">치즈 붕어빵</p>
          <Logo size="small" type="empty" />
        </div>
      </div>

      {/* 캡쳐 버튼 */}
      <button
        className="bg-[#FFEED0] text-primary px-4 py-3 flex items-center justify-center rounded-[999px] absolute bottom-20 right-5"
        onClick={() => setIsCaptureModalOpen(true)}
      >
        내 도감 캡쳐하기
      </button>

      {/* 캡쳐 완료 모달 */}
      <Modal
        isOpen={isCaptureModalOpen}
        onOpenChange={setIsCaptureModalOpen}
        titleElement="도감이 저장되었습니다."
      >
        <div>
          <Image
            src="/images/books.png"
            width={136}
            height={123}
            alt="books image"
          />
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
