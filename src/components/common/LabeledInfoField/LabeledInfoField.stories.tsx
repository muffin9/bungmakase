import type { Meta, StoryObj } from '@storybook/react';
import { LabeledInfoField } from './index';
import { useState } from 'react';

const meta: Meta<typeof LabeledInfoField> = {
  title: 'Components/Common/LabeledInfoField',
  component: LabeledInfoField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '라벨과 값을 표시하는 필드 컴포넌트입니다. 편집 가능한 입력 모드와 읽기 전용 모드를 지원합니다.',
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
    isEditable: {
      description: '편집 가능 여부',
      control: 'boolean',
    },
    placeholder: {
      description: '입력 필드의 플레이스홀더',
      control: 'text',
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean',
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

// 읽기 전용 모드
export const ReadOnly: Story = {
  args: {
    label: '영업시간',
    value: '09:00 ~ 18:00',
    isEditable: false,
  },
};

// 편집 가능 모드
export const Editable: Story = {
  render: function Render() {
    const [value, setValue] = useState('09:00 ~ 18:00');

    return (
      <LabeledInfoField
        label="영업시간"
        value={value}
        isEditable={true}
        onChange={setValue}
        placeholder="영업시간을 입력하세요"
      />
    );
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    label: '영업시간',
    value: '09:00 ~ 18:00',
    isEditable: true,
    disabled: true,
  },
};

// 긴 텍스트
export const LongText: Story = {
  args: {
    label: '주소',
    value: '서울특별시 강남구 테헤란로 123길 45, 7층 701호 (매우 긴 주소)',
    isEditable: false,
  },
};

// 다양한 상태 조합
export const Various: Story = {
  render: function Render() {
    const [value1, setValue1] = useState('09:00 ~ 18:00');
    const [value2, setValue2] = useState('');

    return (
      <div className="space-y-2">
        <LabeledInfoField
          label="읽기 전용"
          value="이 값은 수정할 수 없습니다"
          isEditable={false}
        />
        <LabeledInfoField
          label="편집 가능"
          value={value1}
          isEditable={true}
          onChange={setValue1}
          placeholder="시간을 입력하세요"
        />
        <LabeledInfoField
          label="비활성화"
          value="비활성화된 필드"
          isEditable={true}
          disabled={true}
        />
        <LabeledInfoField
          label="빈 값"
          value={value2}
          isEditable={true}
          onChange={setValue2}
          placeholder="값을 입력하세요"
        />
      </div>
    );
  },
};
