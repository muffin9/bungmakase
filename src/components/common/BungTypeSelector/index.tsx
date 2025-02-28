'use client';

import { bungDogamData } from '@/constants/dummy';
import { useRouter } from 'next/navigation';
import { LabeledInfoField } from '@/components/common/LabeledInfoField';
import { Button } from '@/components/ui/button';
import { BottomDrawer, DrawerClose } from '@/components/common/BottomDrawer';

interface BungTypeSelectorProps {
  currentType: string;
  onTypeChange: (type: string) => void;
}

function BungTypeSelector({
  currentType,
  onTypeChange,
}: BungTypeSelectorProps) {
  const router = useRouter();

  return (
    <BottomDrawer
      triggerElement={
        <div className="w-full cursor-pointer">
          <LabeledInfoField
            label="붕어빵 종류"
            value={currentType && `${currentType} 붕어빵`}
          />
        </div>
      }
    >
      <div className="flex flex-wrap gap-[5px] mb-4">
        {bungDogamData.map((dogam) => (
          <div
            key={dogam.id}
            className={`${
              currentType === dogam.name && 'bg-[#FFA914] text-white'
            } p-3 text-sm rounded-full border border-[#d8d8d8] cursor-pointer hover:bg-gray-50 transition-colors`}
            onClick={() => onTypeChange(dogam.name)}
          >
            {dogam.name}
          </div>
        ))}
      </div>
      <Button
        type="button"
        className="mb-2 bg-[#FFEED0] text-[#FFA914] hover:bg-[#FFEED0]/50 transition-colors w-full"
        onClick={() => {
          router.push('/create');
        }}
      >
        새 붕어빵 제안하기
      </Button>
      <div className="flex gap-2">
        <DrawerClose asChild>
          <Button variant="outline" className="border-none bg-[#EBEBEB] flex-1">
            취소
          </Button>
        </DrawerClose>
        <DrawerClose asChild>
          <Button className="flex-1">확인</Button>
        </DrawerClose>
      </div>
    </BottomDrawer>
  );
}

export default BungTypeSelector;
