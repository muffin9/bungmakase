'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useReviewStore } from '@/store/useReviewStore';
import { X } from 'lucide-react';
import BungTypeSelector from '@/components/common/BungTypeSelector';
import { useCreateReview } from '@/api/review/create';
import { useSearchParams } from 'next/navigation';

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

interface ImageUploadSectionProps {
  files: File[];
  isUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
}

function ImageUploadSection({
  files,
  isUploading,
  fileInputRef,
  onImageChange,
  onRemove,
}: ImageUploadSectionProps) {
  return (
    <div className="w-full flex flex-col gap-2 items-center mb-8 p-4 border border-[#d6d6d6] rounded-lg">
      <div className="w-full overflow-x-auto">
        <div className="flex gap-2 min-w-min">
          {files.map((file, index) => (
            <div key={index} className="relative shrink-0 w-[150px] h-[150px]">
              <Image
                src={URL.createObjectURL(file)}
                alt={`리뷰 이미지 ${index + 1}`}
                className="rounded-lg object-cover"
                fill
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        이미지는 최대 5개까지 업로드할 수 있습니다. ({files.length}/5)
      </p>

      {files.length < 5 && (
        <AddImageButton
          onClick={() => fileInputRef.current?.click()}
          isUploading={isUploading}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onImageChange}
        disabled={isUploading}
      />
    </div>
  );
}

interface AddImageButtonProps {
  onClick: () => void;
  isUploading: boolean;
}

function AddImageButton({ onClick, isUploading }: AddImageButtonProps) {
  return (
    <Button
      type="button"
      className="w-[115px] h-[40px] bg-[#FFEED0] hover:bg-[#FFEED0]/50 transition-colors"
      onClick={onClick}
      disabled={isUploading}
    >
      <Image
        src="/images/svg/camera.svg"
        alt="이미지 추가"
        width={18}
        height={24}
      />
      <span className="text-xs text-[#FFA914]">
        {isUploading ? '업로드 중...' : '사진 추가'}
      </span>
    </Button>
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
    files,
    setStarRating,
    setBungType,
    setReviewContent,
    resetReview,
  } = useReviewStore();

  const { fileInputRef, handleImageChange, removeImage, isLoading } =
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
