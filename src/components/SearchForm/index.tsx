'use client';

import { SearchInput } from '@/components/common/SearchInput';
import { RecentSearchForm } from '../RecentSearchForm';
import { useSearchValue } from '@/hooks/useSearchValue';

export function SearchForm() {
  const { value, handleChange } = useSearchValue();

  return (
    <div className="flex flex-col">
      <SearchInput
        placeholder="가까운 붕어빵 가게를 찾아보세요!"
        value={value}
        onChange={handleChange}
      />
      {value ? <div>Search Result List</div> : <RecentSearchForm />}
    </div>
  );
}
