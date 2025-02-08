import type { Meta, StoryObj } from '@storybook/react';
import Logo from './';

const meta = {
  title: 'Components/common/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xSmall', 'small', 'xMedium', 'medium', 'large'],
      description: 'Logo size variant',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    size: 'medium',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-2">
        <Logo size="xSmall" />
        <span className="text-sm text-gray-500">xSmall (38x26)</span>
      </div>
      <div className="flex items-center gap-2">
        <Logo size="small" />
        <span className="text-sm text-gray-500">small (49x34)</span>
      </div>
      <div className="flex items-center gap-2">
        <Logo size="xMedium" />
        <span className="text-sm text-gray-500">xMedium (78x55)</span>
      </div>
      <div className="flex items-center gap-2">
        <Logo size="medium" />
        <span className="text-sm text-gray-500">medium (118x82)</span>
      </div>
      <div className="flex items-center gap-2">
        <Logo size="large" />
        <span className="text-sm text-gray-500">large (228x159)</span>
      </div>
    </div>
  ),
};
