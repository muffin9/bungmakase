'use client';

import React from 'react';
import Logo from '../Logo';
import Image from 'next/image';

type Props = {
  size?: 'sm' | 'lg';
  onClick?: () => void;
};

const Profile = ({ size = 'lg', onClick }: Props) => {
  return (
    <>
      {size === 'sm' && (
        <div className="w-[89px] h-[89px] relative rounded-full bg-[#F6EEDF] flex justify-center items-center cursor-pointer mb-6">
          <Logo size="xSmall" />
          <div className="rounded-full w-7 h-7 flex items-center justify-center bg-primary absolute bottom-0 right-0">
            <Image
              src="/images/svg/photo.svg"
              alt="사진"
              width={17}
              height={17}
            />
          </div>
        </div>
      )}
      {size === 'lg' && (
        <div
          className="w-[157px] h-[157px] relative rounded-full bg-primary/10 border border-primary flex justify-center items-center cursor-pointer mb-6"
          onClick={onClick}
        >
          <Logo size="xMedium" />
          <div className="rounded-full w-14 h-14 flex items-center justify-center bg-primary absolute bottom-0 right-0">
            <Image
              src="/images/svg/photo.svg"
              alt="사진"
              width={30}
              height={30}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
