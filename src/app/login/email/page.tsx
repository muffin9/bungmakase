'use client';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import BackButton from '@/components/common/BackButton';
import { BaseInput } from '@/components/common/BaseInput';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

export default function LoginEmailPage() {
  const router = useRouter();

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
    <section className="h-screen px-5 py-8">
      <header className="flex flex-col">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-[#181818]">
            로그인 시 필요한
            <br />
            정보를 입력해주세요
          </h1>
          <span className="text-sm text-muted-foreground">
            로그인 또는 회원가입을 위해 필요합니다.
          </span>
        </div>
      </header>

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
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          error={errors.password?.message}
          correct={getPasswordCorrect()}
          {...register('password')}
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
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요"
          error={errors.confirmPassword?.message}
          correct={getConfirmPasswordCorrect()}
          {...register('confirmPassword')}
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
    </section>
  );
}
