import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './index';
import { useState } from 'react';

const meta = {
  title: 'components/common/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    onSearch: (value) => console.log('검색어:', value),
    className: 'w-[330px] border-[#FFA914] border-[1px] bg-transparent',
  },
};

// 실제 검색 동작을 보여주는 인터랙티브 예제 - 브라우저 콘솔탭 확인
export const Interactive: Story = {
  render: function Render() {
    const [loading, setLoading] = useState(false);

    const handleSearch = async (value: string) => {
      setLoading(true);
      console.log('검색 시작:', value);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('검색 완료:', value);
      setLoading(false);
    };

    return (
      <SearchInput
        placeholder="가까운 붕어빵 가게를 찾아보세요!"
        loading={loading}
        onSearch={handleSearch}
        className="w-[330px] border-[#FFA914] border-[1px] bg-transparent"
      />
    );
  },
};
