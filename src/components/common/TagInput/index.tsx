'use client';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagInput = ({ tags, setTags }: TagInputProps) => {
  const [tagInput, setTagInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <div className="flex px-8 h-[70px] border-[1px] border-[#d6d6d6] rounded-lg items-center justify-between w-full">
        <label className="shrink-0 mr-4">붕어빵 특징</label>
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="# 태그 입력 후 Enter"
          className="text-right bg-white"
          minLength={1}
          maxLength={10}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
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
    </>
  );
};

export default TagInput;
