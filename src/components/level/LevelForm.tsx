'use client';

import { useImageUpload } from '@/hooks/useImageUpload';
import ImageUploadSection from '@/components/common/ImageUploadSection';
import { LabeledInfoField } from '@/components/common/LabeledInfoField';
import BungTypeSelector from '@/components/common/BungTypeSelector';
import { Button } from '../ui/button';
import { useCreateLevel } from '@/api/level/create';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

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
  const [tagInput, setTagInput] = useState('');

  const { files, isLoading, fileInputRef, handleImageChange, removeImage } =
    useImageUpload({ multiple: true });

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

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!levelData.tags.includes(tagInput.trim())) {
        setLevelData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setLevelData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
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
        <div className="flex px-8 h-[70px] border-[1px] border-[#d6d6d6] rounded-lg items-center justify-between w-full">
          <label className="shrink-0 mr-4">붕어빵 특징</label>
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="# 태그 입력 후 Enter"
            className="text-right bg-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {levelData.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="py-1 font-normal">
              {tag}
              <button
                type="button"
                className="ml-1 text-xs"
                onClick={() => removeTag(tag)}
              >
                ✕
              </button>
            </Badge>
          ))}
        </div>

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
