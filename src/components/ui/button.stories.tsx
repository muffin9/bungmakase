import type { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonProps } from './button';

const meta: Meta<ButtonProps> = {
  title: 'components/ui/button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
  args: {
    variant: 'default',
    size: 'default',
    fontWeight: 'default',
    children: 'Button',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'gray', 'outline'],
    },
    size: {
      control: 'select',
      options: ['default', 'xs'],
    },
    fontWeight: {
      control: 'select',
      options: ['default', 'bold'],
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Gray: Story = {
  args: {
    variant: 'gray',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Small: Story = {
  args: {
    size: 'xs',
  },
};
export const Bold: Story = {
  args: {
    fontWeight: 'bold',
  },
};
