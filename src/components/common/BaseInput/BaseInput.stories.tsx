import type { Meta, StoryObj } from '@storybook/react';
import { BaseInput } from './index';
import { Eye, InfoIcon } from 'lucide-react';

const meta = {
  title: 'components/common/BaseInput',
  component: BaseInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BaseInput>;

export default meta;
type Story = StoryObj<typeof BaseInput>;

export const NoPlaceHolder: Story = {
  args: {
    className: 'bg-[#f2f2f2]',
  },
};

export const Default: Story = {
  args: {
    placeholder: '기본 입력창',
  },
};

export const WithLabel: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
  },
};

export const WithEndIcon: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    type: 'password',
    endIcon: <Eye className="h-4 w-4" />,
  },
};

export const WithError: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    error: '올바른 이메일을 입력해주세요',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    type: 'password',
    helperText: (
      <div className="flex items-center gap-1">
        <InfoIcon className="h-4 w-4" />
        <span>이메일은 추후 변경이 불가합니다.</span>
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화된 입력창',
    placeholder: '입력할 수 없습니다',
    disabled: true,
  },
};

export const WithSuccess: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    value: 'test@example.com',
    correct: '사용 가능한 이메일입니다',
  },
};

export const WithErrorAndIcon: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    value: 'invalid-email',
    endIcon: <Eye className="h-4 w-4" />,
    error: '올바른 이메일 형식이 아닙니다',
  },
};
