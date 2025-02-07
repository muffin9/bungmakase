import BackButton from '@/components/common/BackButton';
import { LoginForm } from '@/components/LoginForm';

export default function LoginEmailPage() {
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

      <LoginForm />
    </section>
  );
}
