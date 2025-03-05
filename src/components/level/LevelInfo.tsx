'use client';

import { useUserLevelInfo } from '@/api/level/user';
import Image from 'next/image';
import { Modal } from '../ui/modal';
import { Progress } from '../ui/progress';
import { levels } from '@/lib/data/level';
import useToggle from '@/hooks/useToggle';

export function LevelInfo() {
  const { data: userData } = useUserLevelInfo();
  const [isOpenModal, toggleOpenModal] = useToggle();

  const levelInfo = levels.find((level) => level.level === userData?.level);

  return (
    userData && (
      <>
        {' '}
        <div className="w-full px-6">
          <div className="flex justify-between items-center mb-[10px]">
            <div className="flex gap-2">
              <div className="flex justify-center items-center px-[5px] bg-[#FFA914] rounded-md">
                <span className="text-xs text-white">
                  레벨 {userData.level}
                </span>
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
              onClick={toggleOpenModal}
            />
          </div>
          <Progress value={userData.level * 10} className="mb-[10px]" />
          {levelInfo && (
            <div
              className="bg-[#FFF0CE] rounded-sm p-[10px] text-[10px] font-medium text-third w-[194px]"
              dangerouslySetInnerHTML={{ __html: levelInfo.description }}
            ></div>
          )}
        </div>
        {isOpenModal && (
          <Modal isOpen onOpenChange={toggleOpenModal} titleElement={''}>
            <div className="flex flex-col items-center">
              <p className="text-xl font-medium">레벨 설명</p>
              <div className="flex flex-col px-5 h-[280px] overflow-y-scroll">
                {levels.map((item) => (
                  <div
                    key={item.level}
                    className="px-[10px] mb-[10px] py-[14px] bg-[#FFEED0] rounded-[20px] flex flex-col items-center gap-2"
                  >
                    <div className="flex items-center">
                      <div className="bg-primary text-white text-sm rounded-[5px] p-[5px] font-medium">
                        레벨 {item.level}
                      </div>
                      <div className="min-w-[100px] text-center font-medium text-sm">
                        {item.name}
                      </div>
                    </div>
                    <p className="font-light text-sm">{item.title}</p>
                    <p
                      className="font-light text-sm text-center"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></p>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        )}
      </>
    )
  );
}
