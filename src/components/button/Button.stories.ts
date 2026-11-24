import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Plus } from '@lucide/vue'
import { bothThemes } from '../../../.storybook/both-themes'
import { Button } from '.'

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const
const sizes = ['sm', 'default', 'lg'] as const

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: variants },
    size: { control: 'select', options: [...sizes, 'icon'] },
    as: { control: 'text' },
    asChild: { control: 'boolean' },
  },
  args: { variant: 'default', size: 'default' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Button</Button>',
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Button },
    setup: () => ({ variants }),
    template: '<div class="flex flex-wrap gap-3"><Button v-for="v in variants" :key="v" :variant="v">{{ v }}</Button></div>',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Button, Plus },
    setup: () => ({ sizes }),
    template: `<div class="flex flex-wrap items-center gap-3">
      <Button v-for="s in sizes" :key="s" :size="s">{{ s }}</Button>
      <Button size="icon" aria-label="Add"><Plus /></Button>
    </div>`,
  }),
}

export const WithIcon: Story = {
  render: () => ({
    components: { Button, Plus },
    template: '<Button><Plus /> New item</Button>',
  }),
}

export const Disabled: Story = {
  render: () => ({ components: { Button }, template: '<Button disabled>Disabled</Button>' }),
}

export const AsLink: Story = {
  name: 'As child (link)',
  render: () => ({
    components: { Button },
    template: '<Button as-child><a href="#docs">Documentation</a></Button>',
  }),
}

export const BothThemes: Story = {
  render: bothThemes(
    { Button },
    '<div class="flex flex-wrap gap-2"><Button v-for="v in variants" :key="v" :variant="v">{{ v }}</Button></div>',
    () => ({ variants }),
  ),
  parameters: { layout: 'padded' },
}
