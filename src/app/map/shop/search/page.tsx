import BackButton from '@/components/common/BackButton';
import { AddressForm } from '@/components/map/AddressForm';

export default function MapAddressSearchPage() {
  return (
    <section className="h-screen px-4 py-8">
      <header className="flex justify-between mb-2">
        <BackButton />
        <span>주소 검색</span>
        <div className="mr-8" />
      </header>
      <AddressForm />
    </section>
  );
}
