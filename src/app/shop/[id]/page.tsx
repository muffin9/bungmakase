'use client';

import { useShopHomeInfo } from '@/api/shop/info';
import BackButton from '@/components/common/BackButton';
import ShopTabs from '@/components/shop/Tabs';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function ShopDetailPage() {
  const { id } = useParams();
  const { data: shopHomeInfo } = useShopHomeInfo(id as string);

  return (
    <div className="bg-yellow-gradient h-screen relative content-to-capture">
      <header className="flex flex-col px-4 py-8 gap-4">
        <BackButton />
        <span className="text-2xl font-medium">{shopHomeInfo?.shopName}</span>
        {shopHomeInfo?.imageUrls && (
          <div className="flex gap-2 overflow-x-scroll">
            {shopHomeInfo.imageUrls.map((imageUrl: string, index: number) => (
              <Image
                key={`${imageUrl}-${index}`}
                src={imageUrl}
                alt="shop image"
                width={100}
                height={100}
                className="rounded-md"
              />
            ))}
          </div>
        )}
      </header>

      <ShopTabs />
    </div>
  );
}
