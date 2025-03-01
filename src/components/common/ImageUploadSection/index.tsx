import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';

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

interface ImageUploadSectionProps {
  files: File[];
  isUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
}

const ImageUploadSection = ({
  files,
  isUploading,
  fileInputRef,
  onImageChange,
  onRemove,
}: ImageUploadSectionProps) => {
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
};

export default ImageUploadSection;
