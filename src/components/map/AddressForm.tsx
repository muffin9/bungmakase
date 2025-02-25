'use client';

import { SearchInput } from '@/components/common/SearchInput';
import useKeySearchInput from '@/hooks/map/useKeySearchInput';
import useSearchPlace from '@/store/useSearchPlace';

export function AddressForm() {
  const { searchAddressToCoordinate } = useKeySearchInput();
  const { resultSearchInfo } = useSearchPlace();

  return (
    <div className="flex flex-col">
      <SearchInput
        placeholder="주변 건물 이름, 주소"
        onSearch={searchAddressToCoordinate}
      />
    </div>
  );
}
