'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseInput } from '@/components/common/BaseInput';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import * as z from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUpStore } from '@/store/useSignUpStore';
import { useEmailCheck } from '@/api/email/login';

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
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
        '비밀번호는 영문+숫자+특수문자 조합으로 8자 이상 입력해주세요.',
      ),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type FormData = z.infer<typeof formSchema>;

export function SignupForm() {
  const { setLoginData } = useSignUpStore();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const watchedPassword = watch('password');
  const watchedEmail = watch('email');
  const watchedConfirmPassword = watch('confirmPassword');

  const { mutate: checkEmail, isPending: checkEmailLoading } = useEmailCheck({
    onDuplicateCheck: (isDuplicate) => setIsDuplicate(!isDuplicate),
  });

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

  // 모든 필드가 입력되었는지 확인
  const watchedValues = watch(['email', 'password', 'confirmPassword']);
  const isAllFieldsFilled = watchedValues.every((value) => value);

  // 버튼 활성화 조건: 모든 필드가 입력되고, 에러가 없으며, 폼이 유효한 상태
  const isButtonEnabled =
    isAllFieldsFilled && isValid && Object.keys(errors).length === 0;

  const onSubmit = handleSubmit((data) => {
    setLoginData(data);
    router.push('/signup/profile');
  });

  const handleDuplicateCheck = async () => {
    const isValid = await trigger('email');

    if (!isValid) return;

    checkEmail(watchedEmail);
  };

  return (
    <form
      className="flex flex-col h-[calc(100vh-200px)] gap-6 mt-8"
      onSubmit={onSubmit}
    >
      <div className="w-full flex items-center gap-2">
        <div className="flex-1">
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
          />
        </div>
        <Button
          type="button"
          disabled={checkEmailLoading}
          className="w-[70px] h-[50px] self-start mt-8 text-xs"
          onClick={handleDuplicateCheck}
        >
          {checkEmailLoading ? '확인 중...' : '중복 확인'}
        </Button>
      </div>

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
        helperText={
          <div className="flex items-center gap-1">
            <Info className="w-4 h-4" />
            <span className="text-xs text-muted-foreground">
              비밀번호는 영문+숫자 조합으로 8자 이상 입력해주세요.
            </span>
          </div>
        }
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
      />

      <Button
        type="submit"
        className="mt-auto"
        disabled={!isButtonEnabled || !isDuplicate}
      >
        이동
      </Button>
    </form>
  );
}
