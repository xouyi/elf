import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/vue3-vite'
import * as projectAnnotations from './preview'

// The theme under test is injected per Vitest project (see vitest.config.ts).
const theme = import.meta.env.VITE_ELF_THEME ?? 'elf'

setProjectAnnotations([
  a11yAddonAnnotations,
  projectAnnotations,
  { initialGlobals: { theme } },
])
