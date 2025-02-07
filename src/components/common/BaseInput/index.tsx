'use client';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { BaseInputProps } from '@/types/input';

export function BaseInput({
  label,
  error,
  correct,
  helperText,
  startIcon,
  endIcon,
  className,
  id,
  ...props
}: BaseInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </Label>
      )}
      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {startIcon}
          </div>
        )}
        <Input
          id={id}
          className={cn(
            startIcon && 'pl-12',
            endIcon && 'pr-12',
            error && 'border-destructive focus-visible:ring-destructive',
            correct && 'border-success focus-visible:ring-success',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {endIcon}
          </div>
        )}
      </div>
      <AnimatePresence>
        {(error || correct || helperText) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm"
          >
            {error ? (
              <span
                id={`${id}-error`}
                className="flex items-center gap-1 text-destructive"
              >
                <AlertCircle className="h-4 w-4" />
                {error}
              </span>
            ) : correct ? (
              <span className="flex items-center gap-1 text-success">
                {correct}
              </span>
            ) : (
              <div id={`${id}-description`} className="text-muted-foreground">
                {helperText}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
