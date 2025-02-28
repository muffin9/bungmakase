import { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export function useSearchValue(onSearch?: (value: string) => void) {
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

  const updatedValue = (term: string) => setValue(term);

  return { value, setValue, handleChange, updatedValue };
}
