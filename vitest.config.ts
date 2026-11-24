import path from 'node:path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

const dirname = import.meta.dirname

/** Runs every story (render + axe a11y) in real Chromium with one Elf theme active. */
function storybookProject(theme: 'elf' | 'novatron') {
  return {
    extends: true as const,
    plugins: [
      // vue() and tailwindcss() come from .storybook/main.ts viteFinal.
      storybookTest({ configDir: path.join(dirname, '.storybook'), tags: { include: ['test'], exclude: ['skip-test'] } }),
    ],
    define: { 'import.meta.env.VITE_ELF_THEME': JSON.stringify(theme) },
    test: {
      name: `storybook-${theme}`,
      browser: {
        enabled: true,
        headless: true,
        provider: playwright(),
        instances: [{ browser: 'chromium' as const }],
      },
      setupFiles: ['./.storybook/vitest.setup.ts'],
    },
  }
}

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [vue()],
        test: { name: 'unit', environment: 'happy-dom', include: ['src/**/*.test.ts'] },
      },
      storybookProject('elf'),
      storybookProject('novatron'),
    ],
  },
})
