'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useReviewStore } from '@/store/useReviewStore';
import BungTypeSelector from '@/components/common/BungTypeSelector';
import { useCreateReview } from '@/api/review/create';
import { useSearchParams } from 'next/navigation';
import ImageUploadSection from '../common/ImageUploadSection';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

function StarRating({ rating, onRatingChange }: StarRatingProps) {
  return (
    <div className="py-8 flex gap-2">
      {Array.from({ length: 5 }).map((_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= rating;

        return (
          <Image
            key={`star-${starNumber}`}
            src={`/images/svg/star-${isFilled ? 'fill' : 'empty'}.svg`}
            alt={`${starNumber}점`}
            width={24}
            height={24}
            onClick={() => onRatingChange(starNumber)}
            className="cursor-pointer transition-transform hover:scale-110"
          />
        );
      })}
    </div>
  );
}

export function ReviewForm() {
  const searchParams = useSearchParams();
  const shopId = searchParams.get('id');

  const { mutate: createReview } = useCreateReview();

  const {
    starRating,
    bungType,
    reviewContent,
    setStarRating,
    setBungType,
    setReviewContent,
    resetReview,
  } = useReviewStore();

  const { files, fileInputRef, handleImageChange, removeImage, isLoading } =
    useImageUpload();

  const isFormValid = () => {
    return !!(starRating > 0 && bungType);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createReview({
      shopId: shopId as string,
      star: starRating,
      bungName: bungType,
      reviewText: reviewContent,
      files: files,
    });

    resetReview();
  };

  return (
    <form className="flex flex-col items-center" onSubmit={onSubmit}>
      <StarRating rating={starRating} onRatingChange={setStarRating} />

      <ImageUploadSection
        files={files}
        isUploading={isLoading}
        fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
        onImageChange={handleImageChange}
        onRemove={removeImage}
      />

      <BungTypeSelector currentType={bungType} onTypeChange={setBungType} />

      <textarea
        placeholder="붕어빵 가게에 대한 생생한 후기를 남겨보세요."
        className="w-full h-[170px] px-4 py-2 rounded-lg border border-[#d9d9d9] resize-none text-sm focus:outline-none focus:ring-2 focus:ring-[#FFA914] transition-all"
        value={reviewContent}
        onChange={(e) => setReviewContent(e.target.value)}
      />

      <Button
        type="submit"
        className="mt-[50px] w-full transition-colors"
        disabled={isLoading || !isFormValid()}
      >
        {isLoading ? '업로드 중...' : '등록하기'}
      </Button>
    </form>
  );
}

export default ReviewForm;
