'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

const OnBoardingPage = () => {
  const [swiperIndex, setSwiperIndex] = useState(0); // -> 페이지네이션용
  const [swiper, setSwiper] = useState<SwiperClass>(); // -> 슬라이드용
  const router = useRouter();

  const onClickComplete = () => {
    localStorage.setItem('isOnboard', 'true');
    router.push('/');
  };

  return (
    <div className="bg-primary-100 h-[calc(100lvh-100px)] flex">
      <div className="w-full h-full relative">
        <Swiper
          pagination={true}
          modules={[Pagination]}
          className="onBoardingSwiper h-full"
          onActiveIndexChange={(e: SwiperClass) => setSwiperIndex(e.realIndex)}
          onSwiper={(e: SwiperClass) => {
            setSwiper(e);
          }}
        >
          <SwiperSlide className="relative h-full bg-yellow-gradient">
            <div className="h-full absolute w-full">
              <Image
                src={'/images/onboarding1.png'}
                alt="온보딩이미지"
                width={240}
                height={487}
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              />
            </div>
            <div className="bg-gradient-to-t from-white via-white/90 to-transparent pt-[300px] pb-[50px] absolute w-full bottom-0">
              <p className="font-medium text-xl text-center mb-2">
                매일 매일 먹은 붕어빵을 기록하고
                <br />
                도감을 채워보세요!
              </p>
              <p className="font-light text-sm text-center">
                새로운 맛을 발견한다면 추가할 수 있어요.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative h-full bg-yellow-gradient">
            <div className="h-full absolute w-full">
              <Image
                src={'/images/onboarding2.png'}
                alt="온보딩이미지"
                width={300}
                height={540}
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              />
            </div>
            <div className="bg-gradient-to-t from-white via-white/90 to-transparent pt-[300px] pb-[50px] absolute w-full bottom-0">
              <p className="font-medium text-xl text-center mb-2">
                지금까지 먹은 붕어빵을
                <br />
                아카이빙 할 수 있어요!
              </p>
              <p className="font-light text-sm text-center">
                붕어빵 아카이빙을 통해 친구들과 경쟁 할 수 있어요.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative h-full bg-yellow-gradient">
            <div className="h-full absolute w-full">
              <Image
                src={'/images/onboarding3.png'}
                alt="온보딩이미지"
                width={300}
                height={540}
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              />
            </div>
            <div className="bg-gradient-to-t from-white via-white/90 to-transparent pt-[300px] pb-[50px] absolute w-full bottom-0">
              <p className="font-medium text-xl text-center mb-2">
                내 근처의 붕어빵 맛집 위치를
                <br />
                바로 찾아보세요!
              </p>
              <p className="font-light text-sm text-center">
                맛집의 리뷰를 남기거나 가게를 추가 할 수 있어요.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="fixed bottom-0 xs:w-[375px] w-[calc(100%-40px)] left-[50%] translate-x-[-50%]">
        {swiperIndex !== 2 ? (
          <Button
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            onClick={() => swiper?.slideNext()}
          >
            다음
          </Button>
        ) : (
          <Button
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            onClick={onClickComplete}
          >
            시작하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnBoardingPage;
