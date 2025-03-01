'use client';

import { SearchInput } from '@/components/common/SearchInput';
import useKeySearchInput from '@/hooks/map/useKeySearchInput';
import { AddressResultList } from './AddressResultList';

export function AddressForm() {
  // TODO: map/shop search value와 연결필요
  const { searchAddressToCoordinate } = useKeySearchInput();

  return (
    <div className="flex flex-col pb-12">
      <SearchInput
        placeholder="주변 건물 이름, 주소"
        onSearch={searchAddressToCoordinate}
      />
      <AddressResultList />
    </div>
  );
}
