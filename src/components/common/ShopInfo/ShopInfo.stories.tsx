import type { Meta, StoryObj } from '@storybook/react';
import ShopInfo from './index';
import { storeData } from '@/constants/dummy';

const meta: Meta<typeof ShopInfo> = {
  title: 'components/common/ShopInfo',
  component: ShopInfo,
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
    shop: {
      description: '가게 정보 객체',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShopInfo>;

export const Default: Story = {
  args: {
    shop: storeData[0],
  },
};

export const LongStoreName: Story = {
  args: {
    shop: {
      ...storeData[0],
      shopName: '아주 긴 가게 이름을 가진 붕어빵 맛집 입니다 truncate 테스트',
    },
  },
};

export const Closed: Story = {
  args: {
    shop: {
      ...storeData[0],
      endTime: '영업종료',
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
    shop: storeData[0],
  },
};
