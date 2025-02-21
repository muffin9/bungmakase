'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BaseInput } from '../common/BaseInput';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useEmailLogin } from '@/api/email/login';
const formSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요')
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      '비밀번호는 영문+숫자 조합으로 8자 이상 입력해주세요.',
    ),
});

export type FormData = z.infer<typeof formSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: emailLogin, isPending: emailLoginLoading } = useEmailLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const watchedPassword = watch('password');
  const watchedEmail = watch('email');

  const getPasswordCorrect = () => {
    if (!dirtyFields.password || errors.password) return '';
    if (
      z
        .string()
        .min(8)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)/)
        .safeParse(watchedPassword).success
    ) {
      return '사용 가능한 비밀번호입니다';
    }
    return '';
  };

  const getEmailCorrect = () => {
    if (!dirtyFields.email || errors.email) return '';
    if (z.string().email().safeParse(watchedEmail).success) {
      return '사용 가능한 이메일입니다';
    }
    return '';
  };

  const handleLogin = (data: FormData) => {
    // Call Email Login API
    emailLogin(data);
  };

  return (
    <form
      className="flex flex-col h-[calc(100vh-200px)] mt-8 justify-between"
      onSubmit={handleSubmit(handleLogin)}
    >
      <div className="w-full flex flex-col gap-2">
        <BaseInput
          id="email"
          type="email"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          error={errors.email?.message}
          correct={getEmailCorrect()}
          {...register('email')}
        />
        <BaseInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          error={errors.password?.message}
          correct={getPasswordCorrect()}
          {...register('password')}
          endIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <Eye className="h-4 w-4 text-muted-foreground" />
              ) : (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          }
        />
      </div>

      <div className="w-full flex flex-col gap-2 items-center mt-auto pb-8">
        <Link href="/signup/email" className="underline text-sm">
          회원가입하기
        </Link>
        <Button
          type="submit"
          className="w-full"
          disabled={!isValid || emailLoginLoading}
        >
          {emailLoginLoading ? '처리 중...' : '완료'}
        </Button>
      </div>
    </form>
  );
}
