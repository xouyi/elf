import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { bothThemes } from '../../../.storybook/both-themes'
import { Badge } from '.'

const variants = ['default', 'secondary', 'outline', 'destructive', 'success', 'warning'] as const

const meta = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: { variant: { control: 'select', options: variants } },
  args: { variant: 'default' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({ components: { Badge }, setup: () => ({ args }), template: '<Badge v-bind="args">Badge</Badge>' }),
}

export const Variants: Story = {
  render: () => ({
    components: { Badge },
    setup: () => ({ variants }),
    template: '<div class="flex flex-wrap gap-2"><Badge v-for="v in variants" :key="v" :variant="v">{{ v }}</Badge></div>',
  }),
}

export const BothThemes: Story = {
  render: bothThemes(
    { Badge },
    '<div class="flex flex-wrap gap-2"><Badge v-for="v in variants" :key="v" :variant="v">{{ v }}</Badge></div>',
    () => ({ variants }),
  ),
  parameters: { layout: 'padded' },
}
