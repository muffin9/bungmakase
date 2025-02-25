import { useCurrentAddress } from '@/store/useCurrentAddress';
import { Button } from '../ui/button';

export function LoadAddressSection() {
  const { roadAddress } = useCurrentAddress();
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-2">
        <h2>도로명 주소</h2>
        <span className="text-xs text-gray-500">{roadAddress}</span>
      </header>
      <Button className="bg-[#FFA914]">선택하기</Button>
    </div>
  );
}
