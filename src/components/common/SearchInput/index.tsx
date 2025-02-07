'use client';

import { Search, X } from 'lucide-react';
import { BaseInput } from '../BaseInput';
import type { SearchInputProps } from '@/types/input';
import { useState, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type React from 'react';

export function SearchInput({ onSearch, ...props }: SearchInputProps) {
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
        value ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />
      }
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
}
