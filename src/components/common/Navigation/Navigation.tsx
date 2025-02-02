'use client';
import { navigationMenus } from '@/lib/data/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 flex justify-around w-full xs:w-[375px] h-[60px] items-center shadow-[0_-1px_1px_rgba(125,125,125,0.25)]">
      {navigationMenus.map((menu) => (
        <Link
          key={menu.id}
          href={menu.url}
          className="flex flex-col gap-1 items-center"
        >
          <Image
            src={pathname === menu.url ? menu.iconActive : menu.icon}
            alt={menu.name}
            width={20}
            height={20}
          />
          <p
            className={`text-[10px] ${
              pathname === menu.url ? 'text-third font-bold' : 'text-[#747474]'
            }`}
          >
            {menu.name}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
