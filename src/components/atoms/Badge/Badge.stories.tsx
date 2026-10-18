import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Status',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Complete',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'In progress',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Failed',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};
