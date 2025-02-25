import type { Meta, StoryObj } from '@storybook/react';
import BungTypeSelector from './index';

const meta = {
  title: 'components/common/BungTypeSelector',
  component: BungTypeSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentType: {
      control: 'text',
      description: '현재 선택된 붕어빵 타입',
    },
    onTypeChange: {
      description: '붕어빵 타입 변경 시 호출되는 함수',
    },
  },
} satisfies Meta<typeof BungTypeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentType: '',
    onTypeChange: (type: string) => {
      console.log('Selected type:', type);
    },
  },
};

export const WithSelectedType: Story = {
  args: {
    currentType: '팥',
    onTypeChange: (type: string) => {
      console.log('Selected type:', type);
    },
  },
};
