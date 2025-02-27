import { useCurrentAddress } from '@/store/useCurrentAddress';
import { Button } from '../ui/button';
import Link from 'next/link';

export function LoadAddressSection() {
  const { location } = useCurrentAddress();
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-2">
        <h2>도로명 주소</h2>
        <span className="text-xs text-gray-500">{location.currentAddress}</span>
      </header>
      <Link href="/map/shop/create">
        <Button className="bg-[#FFA914]">선택하기</Button>
      </Link>
    </div>
  );
}
