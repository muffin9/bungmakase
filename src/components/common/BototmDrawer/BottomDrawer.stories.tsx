import type { Meta, StoryObj } from '@storybook/react';

import { BottomDrawer, DrawerClose } from '.';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'components/common/BottomDrawer',
  component: BottomDrawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
  argTypes: {
    triggerElement: {
      control: false,
      description: 'Drawer가 열리게 하는 트리거 버튼',
    },
    className: {
      control: false,
      description: 'custom class',
    },
    children: {
      control: false,
      description: `Bottom Drawer 내에는 보여줄 컴포넌트`,
    },
  },
} satisfies Meta<typeof BottomDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    triggerElement: <Button variant="default">추가하기</Button>,
    className: 'm-auto',
    children: (
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-light">
            이용해 본 붕어빵 가게가 있다면
          </span>
          <span className="text-sm">후기쓰기</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-light">
            새로운 붕어빵 맛집을 찾았다면
          </span>
          <span className="text-sm">가게 추가하기</span>
        </div>
      </div>
    ),
  },
};

export const WithButton: Story = {
  args: {
    triggerElement: <Button variant="default">추가하기</Button>,
    className: 'm-auto',
    children: (
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-light">
            이용해 본 붕어빵 가게가 있다면
          </span>
          <span className="text-sm">후기쓰기</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-light">
            새로운 붕어빵 맛집을 찾았다면
          </span>
          <span className="text-sm">가게 추가하기</span>
        </div>
        <div className="flex gap-4">
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="bg-[#EBEBEB] text-black border-none"
            >
              취소
            </Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button>확인</Button>
          </DrawerClose>
        </div>
      </div>
    ),
  },
};
