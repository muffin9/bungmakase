import type { Meta, StoryObj } from '@storybook/react';
import { LabeledInfoField } from './index';

const meta: Meta<typeof LabeledInfoField> = {
  title: 'components/common/LabeledInfoField',
  component: LabeledInfoField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '라벨과 값을 함께 표시하는 정보 필드 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: '필드의 라벨',
      control: 'text',
    },
    value: {
      description: '표시할 값',
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LabeledInfoField>;

// 기본 스토리
export const Default: Story = {
  args: {
    label: '영업시간',
    value: '09:00 ~ 18:00',
  },
};

// 긴 텍스트 스토리
export const LongText: Story = {
  args: {
    label: '매장 위치',
    value: '서울특별시 강남구 테헤란로 123길 45, 7층 701호',
  },
};

// 짧은 텍스트 스토리
export const ShortText: Story = {
  args: {
    label: '가격',
    value: '1,000원',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="space-y-2">
      <LabeledInfoField label="영업시간" value="09:00 ~ 18:00" />
      <LabeledInfoField label="전화번호" value="02-1234-5678" />
      <LabeledInfoField label="주소" value="서울시 강남구" />
      <LabeledInfoField label="메뉴" value="붕어빵 (팥/슈크림)" />
    </div>
  ),
};
