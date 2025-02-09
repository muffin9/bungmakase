import type { Meta, StoryObj } from '@storybook/react';
import StoreInfo from './index';
import { storeData } from '@/constants/dummy';

const meta: Meta<typeof StoreInfo> = {
  title: 'components/common/StoreInfo',
  component: StoreInfo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '가게 정보를 표시하는 컴포넌트입니다. 가게 이름, 영업시간, 별점, 거리 등의 정보를 보여줍니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    store: {
      description: '가게 정보 객체',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StoreInfo>;

export const Default: Story = {
  args: {
    store: storeData[0],
  },
};

export const LongStoreName: Story = {
  args: {
    store: {
      ...storeData[0],
      name: '아주 긴 가게 이름을 가진 붕어빵 맛집 입니다 truncate 테스트',
    },
  },
};

export const Closed: Story = {
  args: {
    store: {
      ...storeData[0],
      businessHours: '영업종료',
    },
  },
};

export const FarDistance: Story = {
  args: {
    store: {
      ...storeData[0],
      distance: '2.5km',
    },
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  args: {
    store: storeData[0],
  },
};
