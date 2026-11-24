import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { bothThemes } from '../../../.storybook/both-themes'
import { Input } from '.'

const meta = {
  title: 'Components/Input',
  component: Input,
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Input },
    setup: () => ({ args }),
    template: '<Input v-bind="args" placeholder="Email address" aria-label="Email" class="w-72" />',
  }),
}

export const Disabled: Story = {
  render: () => ({ components: { Input }, template: '<Input disabled placeholder="Disabled" aria-label="Disabled" class="w-72" />' }),
}

export const Invalid: Story = {
  render: () => ({ components: { Input }, template: '<Input aria-invalid="true" model-value="not-an-email" aria-label="Invalid" class="w-72" />' }),
}

export const File: Story = {
  render: () => ({ components: { Input }, template: '<Input type="file" aria-label="File" class="w-72" />' }),
}

export const BothThemes: Story = {
  render: bothThemes(
    { Input },
    '<div class="grid gap-2"><Input placeholder="Default" aria-label="Default" /><Input disabled placeholder="Disabled" aria-label="Disabled" /><Input aria-invalid="true" model-value="Invalid" aria-label="Invalid" /></div>',
  ),
  parameters: { layout: 'padded' },
}
