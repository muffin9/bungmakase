import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './modal';
import { Button } from './button';
import Image from 'next/image';
import Logo from '../common/Logo';

const meta = {
  title: 'components/ui/modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: { disable: true },
  },
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
  argTypes: {
    triggerElement: {
      control: false,
      description: '모달을 열리도록 하는 트리거 버튼',
    },
    titleElement: {
      control: false,
      description: '타이틀 Element',
    },
    children: {
      control: false,
      description:
        '버튼 컴포넌트들이 올 수 있으며 다른 컴포넌트도 올 수 있게 children으로 받도록 했습니다.',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    triggerElement: <Button>Open Default Modal Button</Button>,
    titleElement: (
      <div>
        <span className="font-bold text-[#9C6403] text-2xl">붕어빵 이름</span>
      </div>
    ),
    children: (
      <div className="flex flex-col items-center gap-8">
        <div className="w-[260px] h-[126px] flex items-center justify-center bg-[#FFEED0] border-solid border-[1px] border-[#FFD285] rounded-lg">
          <Logo size="medium" />
        </div>
        <span className="font-light">태그내용</span>
      </div>
    ),
  },
};

export const BooksModal: Story = {
  args: {
    triggerElement: <Button>Open Books Modal Button</Button>,
    titleElement: (
      <div>
        <span className="font-bold">도감이 저장되었습니다</span>
      </div>
    ),
    children: (
      <div>
        <Image
          src="/images/books.png"
          width={136}
          height={123}
          alt="books image"
        />
      </div>
    ),
  },
};
