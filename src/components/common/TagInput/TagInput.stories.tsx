/* eslint-disable react-hooks/rules-of-hooks */
// src/components/common/TagInput/TagInput.stories.tsx
import type { Meta } from '@storybook/react';
import TagInput from './index';
import { useState } from 'react';

const meta = {
  title: 'components/common/TagInput',
  component: TagInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TagInput>;

export default meta;

// 기본 사용 예시
const DefaultTemplate = {
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    return (
      <div className="w-[400px]">
        <TagInput tags={tags} setTags={setTags} />
      </div>
    );
  },
};

export const Default = {
  ...DefaultTemplate,
};

// 초기 태그가 있는 예시
const WithInitialTagsTemplate = {
  render: () => {
    const [tags, setTags] = useState<string[]>([
      '맛있는',
      '바삭바삭',
      '달달한',
    ]);
    return (
      <div className="w-[400px]">
        <TagInput tags={tags} setTags={setTags} />
      </div>
    );
  },
};

export const WithInitialTags = {
  ...WithInitialTagsTemplate,
};
