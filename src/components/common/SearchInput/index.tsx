'use client';

import { Search } from 'lucide-react';
import { BaseInput } from '../BaseInput';
import type { SearchInputProps } from '@/types/input';
import type React from 'react';
import Image from 'next/image';
import { useSearchValue } from '@/hooks/useSearchValue';

export function SearchInput({
  onSearch,
  placeholder,
  onClick,
  onEnter,
  loading,
  ...props
}: SearchInputProps) {
  const { value, setValue, handleChange } = useSearchValue(onSearch);

  return (
    <div className="relative">
      <BaseInput
        endIcon={
          value ? (
            <Image
              src="/images/svg/delete.svg"
              width={16}
              height={16}
              alt="search value delete"
              onClick={() => setValue('')}
              className="cursor-pointer"
            />
          ) : (
            <Search className="h-6 w-6" />
          )
        }
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onClick={onClick}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onEnter?.();
          }
        }}
        className="h-[55px] bg-white rounded-[10px] border-[#FFA914] border-[1px]"
        {...props}
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <span className="animate-spin">⌛</span>
        </div>
      )}
    </div>
  );
}
