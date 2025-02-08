'use client';

import { Search, X } from 'lucide-react';
import { BaseInput } from '../BaseInput';
import type { SearchInputProps } from '@/types/input';
import { useState, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type React from 'react';

export function SearchInput({
  onSearch,
  placeholder,
  onClick,
  ...props
}: SearchInputProps) {
  const [value, setValue] = useState('');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearch?.(value);
  }, 500);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      debouncedSearch(newValue);
    },
    [debouncedSearch],
  );

  return (
    <BaseInput
      endIcon={
        value ? <X className="h-4 w-4" /> : <Search className="h-6 w-6" />
      }
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onClick={onClick}
      className="w-[330px] h-[55px] bg-white rounded-[10px] border-[#FFA914] border-[1px]"
      {...props}
    />
  );
}
