import BackButton from '@/components/common/BackButton';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { ReviewForm } from '@/components/ReviewForm';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

export default function CreateReviewPage() {
  return (
    <Suspense fallback={<LoadingSpinner text="리뷰 작성 에러..." />}>
      <section className="h-screen py-8">
        <header className="flex justify-between mb-2">
          <BackButton />
          <span>후기 작성</span>
          <div className="mr-8" />
        </header>
        <Separator />
        <div className="w-full px-4">
          <ReviewForm />
        </div>
      </section>
    </Suspense>
  );
}
