import type { Preview } from '@storybook/vue3-vite'
import './preview.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Elf theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'elf', title: 'Elf' },
          { value: 'novatron', title: 'Novatron' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'elf' },
  decorators: [
    (story, context) => {
      const theme = (context.globals.theme as string) ?? 'elf'
      document.documentElement.dataset.theme = theme
      document.body.style.backgroundColor = 'var(--elf-background)'
      document.body.style.color = 'var(--elf-foreground)'
      return { components: { story }, template: '<story />' }
    },
  ],
  parameters: {
    layout: 'centered',
    backgrounds: { disabled: true },
    controls: { matchers: { color: /(background|color)$/i } },
    a11y: { test: 'error' },
    docs: { canvas: { sourceState: 'shown' } },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Guide', ['Getting started', 'Theming', 'Using without Nuxt', 'Registry'],
          'Components', ['Overview', '*'],
          'Resources', ['For AI assistants', 'Contributing', 'Changelog'],
        ],
      },
    },
  },
  tags: ['autodocs'],
}

export default preview
