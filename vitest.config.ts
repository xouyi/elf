import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [vue()],
        test: { name: 'unit', environment: 'happy-dom', include: ['src/**/*.test.ts'] },
      },
    ],
  },
})
