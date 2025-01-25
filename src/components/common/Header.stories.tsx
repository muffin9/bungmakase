import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta = {
  title: 'Components/Common/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

// 기본 상태
export const Default: Story = {
  args: {
    // 필요한 props가 있다면 여기에 추가
  },
};

// 로그인 상태
export const LoggedIn: Story = {
  args: {
    // 로그인 상태에서 필요한 props
  },
};
