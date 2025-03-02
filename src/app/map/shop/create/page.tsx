import BackButton from '@/components/common/BackButton';
import CreateForm from '@/components/shop/CreateForm';

export default function MapShopCreatePage() {
  return (
    <section className="h-screen px-4 py-8">
      <header className="flex flex-col gap-1">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-[#181818]">
            붕어빵 가게의
            <br />
            정보를 추가해 주세요
          </h1>
        </div>
      </header>
      <div className="h-screen w-full">
        <CreateForm />
      </div>
    </section>
  );
}
