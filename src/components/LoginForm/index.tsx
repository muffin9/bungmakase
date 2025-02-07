'use client';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseInput } from '@/components/common/BaseInput';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import * as z from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const formSchema = z
  .object({
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
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof formSchema>;

interface SignUpResponse {
  success: boolean;
  message: string;
}

async function signUp(data: FormData): Promise<SignUpResponse> {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '회원가입에 실패했습니다');
  }

  return response.json();
}

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const watchedPassword = watch('password');
  const watchedEmail = watch('email');
  const watchedConfirmPassword = watch('confirmPassword');

  // 각 필드의 유효성 상태 확인
  const getEmailCorrect = () => {
    if (!dirtyFields.email || errors.email) return '';
    if (z.string().email().safeParse(watchedEmail).success) {
      return '사용 가능한 이메일입니다';
    }
    return '';
  };

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

  const getConfirmPasswordCorrect = () => {
    if (!dirtyFields.confirmPassword || errors.confirmPassword) return '';
    if (watchedPassword === watchedConfirmPassword && watchedConfirmPassword) {
      return '비밀번호가 일치합니다';
    }
    return '';
  };

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      // TODO: Toast Message
      reset();
      router.push('/login/success');
    },
    onError: (error: Error) => {
      // TODO: Toast Message
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const isLoading = isSubmitting || mutation.isPending;

  return (
    <form className="flex flex-col gap-6 mt-8" onSubmit={onSubmit} noValidate>
      <BaseInput
        id="email"
        type="email"
        label="이메일"
        placeholder="이메일을 입력해주세요"
        error={errors.email?.message}
        correct={getEmailCorrect()}
        {...register('email')}
        helperText={
          <div className="flex items-center gap-1">
            <Info className="w-4 h-4" />
            <span className="text-xs text-muted-foreground">
              이메일은 추후 변경이 불가합니다.
            </span>
          </div>
        }
        disabled={isLoading}
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
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        }
        helperText={
          <div className="flex items-center gap-1">
            <Info className="w-4 h-4" />
            <span className="text-xs text-muted-foreground">
              비밀번호는 영문+숫자 조합으로 8자 이상 입력해주세요.
            </span>
          </div>
        }
        disabled={isLoading}
      />

      <BaseInput
        id="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 입력해주세요"
        error={errors.confirmPassword?.message}
        correct={getConfirmPasswordCorrect()}
        {...register('confirmPassword')}
        endIcon={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="focus:outline-none"
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        }
        helperText={
          <div className="flex items-center gap-1">
            <Info className="w-4 h-4" />
            <span className="text-xs text-muted-foreground">
              비밀번호를 다시 한번 입력해주세요.
            </span>
          </div>
        }
        disabled={isLoading}
      />

      <Button type="submit" className="mt-20" disabled={isLoading}>
        {isLoading ? '처리중...' : '완료'}
      </Button>
    </form>
  );
}
