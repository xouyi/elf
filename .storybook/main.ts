import type { StorybookConfig } from '@storybook/vue3-vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.ts'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-vitest'],
  framework: '@storybook/vue3-vite',
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), vue(), tailwindcss()]
    // GitHub Pages serves the docs under /elf/; locally and on other hosts use '/'.
    config.base = process.env.STORYBOOK_BASE ?? '/'
    return config
  },
}

export default config
