'use client';

import { useImageUpload } from '@/hooks/useImageUpload';
import ImageUploadSection from '@/components/common/ImageUploadSection';
import { LabeledInfoField } from '@/components/common/LabeledInfoField';
import BungTypeSelector from '@/components/common/BungTypeSelector';
import { Button } from '../ui/button';
import { useCreateLevel } from '@/api/level/create';
import { useState } from 'react';

interface LevelData {
  bungCount: number;
  bungName: string;
  tags: string[];
}

export function LevelForm() {
  const [levelData, setLevelData] = useState<LevelData>({
    bungCount: 1,
    bungName: '팥',
    tags: [],
  });

  const { files, isLoading, fileInputRef, handleImageChange, removeImage } =
    useImageUpload();

  const { mutate: createLevel } = useCreateLevel();

  const isFormValid = () => {
    return !!(levelData.bungCount > 0 && levelData.bungName);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createLevel({
      bungCount: levelData.bungCount,
      bungName: levelData.bungName,
      tags: levelData.tags,
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
      <div className="flex flex-col gap-2">
        <LabeledInfoField
          label="붕어빵 개수"
          isEditable
          type="number"
          value={levelData.bungCount.toString()}
          placeholder={'직접 입력하기'}
          onChange={(value) =>
            setLevelData((prev) => ({
              ...prev,
              bungCount: typeof value === 'number' ? value : Number(value),
            }))
          }
        />
        <BungTypeSelector
          currentType={levelData.bungName}
          onTypeChange={(value) =>
            setLevelData((prev) => ({ ...prev, bungName: value }))
          }
        />
        <LabeledInfoField
          label="붕어빵 특징"
          isEditable
          value={levelData.tags.join(', ')}
          onChange={(value) =>
            setLevelData((prev) => ({
              ...prev,
              tags: typeof value === 'string' ? value.split(', ') : [],
            }))
          }
          placeholder={'# 직접 입력하기'}
        />

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
