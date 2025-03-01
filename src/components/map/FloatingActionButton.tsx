import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BottomDrawer } from '@/components/common/BottomDrawer';
import { useRouter } from 'next/navigation';

const FloatingActionButton = () => {
  const router = useRouter();
  return (
    <BottomDrawer
      triggerElement={
        <Button className="rounded-full text-sm">
          <Image
            src={'/images/svg/plus.svg'}
            alt="plus image button"
            width={16}
            height={16}
          />
          추가하기
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        {/* <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => router.push('/map/review')}
        >
          <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-[#FFA914]">
            <Image
              src={'/images/svg/review.svg'}
              alt="plus image button"
              width={18}
              height={18}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-light">
              이용해 본 붕어빵 가게가 있다면
            </span>
            <span className="text-sm">후기쓰기</span>
          </div>  
        </div> */}

        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => router.push('/map/shop')}
        >
          <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-[#FFA914]">
            <Image
              src={'/images/svg/review.svg'}
              alt="plus image button"
              width={18}
              height={18}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-light">
              새로운 붕어빵 맛집을 찾았다면
            </span>
            <span className="text-sm">가게 추가하기</span>
          </div>
        </div>
      </div>
    </BottomDrawer>
  );
};

export default FloatingActionButton;
