import type { InputHTMLAttributes } from 'react';
import type React from 'react';

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: React.ReactNode;
  correct?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export interface SearchInputProps extends BaseInputProps {
  onSearch?: (value: string) => void;
  loading?: boolean;
}

export interface TagInputProps
  extends Omit<BaseInputProps, 'value' | 'onChange'> {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  suggestions?: string[];
}
