'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { BaseInput } from '@/components/common/BaseInput';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 8자 이상 입력해주세요'),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Handle form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <BaseInput
        label="이메일"
        startIcon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        {...register('email')}
      />
      <BaseInput
        label="비밀번호"
        type={showPassword ? 'text' : 'password'}
        endIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        }
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? '로그인 중...' : '로그인'}
      </Button>
    </motion.form>
  );
}
