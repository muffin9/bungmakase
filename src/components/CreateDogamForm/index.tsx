'use client';

import { LabeledInfoField } from '@/components/common/LabeledInfoField';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { useCreateSuggestLevel } from '@/api/level/create';
import TagInput from '../common/TagInput';

interface CreateDogamFormProps {
  callBackFunc: () => void;
}

export function CreateDogamForm({ callBackFunc }: CreateDogamFormProps) {
  const [bungName, setBungName] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const { mutate: createSuggestLevel } = useCreateSuggestLevel();

  const handleSubmit = () => {
    if (bungName.length > 6) {
      alert('붕어빵 이름은 6글자 이하로 입력해주세요.');
      return;
    }
    createSuggestLevel({ bungName, tags });
    setBungName('');
    setTags([]);
    callBackFunc();
  };

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
        onClick={handleSubmit}
        disabled={bungName.trim() === '' || tags.length === 0}
      >
        등록하기
      </Button>
    </div>
  );
}
