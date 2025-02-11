import BackButton from '@/components/common/BackButton';
import { SearchForm } from '@/components/SearchForm';
import { Separator } from '@/components/ui/separator';

export default function MapSearchPage() {
  return (
    <section className="h-screen px-4 py-8">
      <header className="flex justify-between mb-2">
        <BackButton />
        <span>검색</span>
        <div className="mr-8" />
      </header>
      <Separator />
      <div className="py-4">
        <SearchForm />
      </div>
    </section>
  );
}
