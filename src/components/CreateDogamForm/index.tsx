'use client';

import { LabeledInfoField } from '@/components/common/LabeledInfoField';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function CreateDogamForm() {
  const [bungName, setBungName] = useState('');
  const [tags, setTags] = useState('');

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2">
        <LabeledInfoField
          label="붕어빵 종류"
          isEditable
          value={bungName}
          placeholder={'직접 입력하기'}
          onChange={(value) => setBungName(value)}
        />
        <LabeledInfoField
          label="붕어빵 특징"
          isEditable
          value={tags}
          placeholder={'# 직접 입력하기'}
          onChange={(value) => setTags(value)}
        />
      </div>
      <Button
        className="mt-8"
        onClick={() => {
          // TODO: Create Dogam CALL API
          // /level/suggest
        }}
      >
        등록하기
      </Button>
    </div>
  );
}
