'use client';

import { useImageUpload } from '@/hooks/useImageUpload';
import ImageUploadSection from '@/components/common/ImageUploadSection';
import { LabeledInfoField } from '@/components/common/LabeledInfoField';
import BungTypeSelector from '@/components/common/BungTypeSelector';
import { Button } from '../ui/button';
import { useCreateLevel } from '@/api/level/create';
import { useState } from 'react';

import TagInput from '../common/TagInput';

export function LevelForm() {
  const [bungCount, setBungCount] = useState(1);
  const [bungName, setBungName] = useState('팥');
  const [tags, setTags] = useState<string[]>([]);

  const { files, isLoading, fileInputRef, handleImageChange, removeImage } =
    useImageUpload({ multiple: true });

  const { mutate: createLevel } = useCreateLevel();

  const isFormValid = () => {
    return !!(bungCount > 0 && bungName);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createLevel({
      bungCount,
      bungName,
      tags,
      files: files,
    });
  };

  return (
    <form className="flex flex-col items-center" onSubmit={onSubmit}>
      <ImageUploadSection
        files={files}
        isUploading={isLoading}
        fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
        onImageChange={handleImageChange}
        onRemove={removeImage}
      />
      <div className="h-screen flex flex-col gap-2">
        <LabeledInfoField
          label="붕어빵 개수"
          isEditable
          type="number"
          value={bungCount.toString()}
          placeholder={'직접 입력하기'}
          onChange={(value) => setBungCount(Number(value))}
        />
        <BungTypeSelector
          currentType={bungName}
          onTypeChange={(value) => setBungName(value)}
        />
        <TagInput tags={tags} setTags={setTags} />

        <Button
          type="submit"
          className="mt-[50px] w-full transition-colors"
          disabled={isLoading || !isFormValid()}
        >
          {isLoading ? '업로드 중...' : '등록하기'}
        </Button>
      </div>
    </form>
  );
}
