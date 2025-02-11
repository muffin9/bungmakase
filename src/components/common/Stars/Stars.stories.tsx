import type { Meta, StoryObj } from '@storybook/react';
import Star from './index';

const meta: Meta<typeof Star> = {
  title: 'components/common/Stars',
  component: Star,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '별점을 표시하는 컴포넌트입니다. 다양한 크기와 점수를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    starSize: {
      description: '별의 크기',
      control: 'select',
      options: ['xSmall', 'small', 'medium', 'large', 'xLarge'],
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    starScore: {
      description: '별점 (0-5)',
      control: { type: 'number', min: 0, max: 5, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Star>;

// 기본 스토리
export const Default: Story = {
  args: {
    starSize: 'medium',
    starScore: 3,
  },
};

// 크기별 스토리
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">xSmall:</span>
        <Star starSize="xSmall" starScore={5} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Small:</span>
        <Star starSize="small" starScore={4} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Medium:</span>
        <Star starSize="medium" starScore={3} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Large:</span>
        <Star starSize="large" starScore={2} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">xLarge:</span>
        <Star starSize="xLarge" starScore={1} />
      </div>
    </div>
  ),
};

// 점수별 스토리
export const AllScores: Story = {
  render: () => (
    <div className="space-y-4">
      {[5, 4, 3, 2, 1, 0].map((score) => (
        <div key={score} className="flex items-center gap-4">
          <span className="w-16 text-sm">{score} stars:</span>
          <Star starSize="medium" starScore={score} />
        </div>
      ))}
    </div>
  ),
};
