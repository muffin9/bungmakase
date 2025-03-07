'use client';

import { LabeledInfoField } from '@/components/common/LabeledInfoField';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { useCreateSuggestLevel } from '@/api/level/create';
import TagInput from '../common/TagInput';

export function CreateDogamForm() {
  const [bungName, setBungName] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const { mutate: createSuggestLevel } = useCreateSuggestLevel();

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2">
        <LabeledInfoField
          label="붕어빵 종류"
          isEditable
          value={bungName}
          placeholder={'직접 입력하기'}
          onChange={(value) => setBungName(value as string)}
        />
        <TagInput tags={tags} setTags={setTags} />
      </div>
      <Button
        className="mt-8"
        onClick={() => createSuggestLevel({ bungName, tags })}
        disabled={bungName.trim() === '' || tags.length === 0}
      >
        등록하기
      </Button>
    </div>
  );
}
