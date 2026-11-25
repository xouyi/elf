<script setup lang="ts">
import type { SpinnerProps } from './index'
import { cn } from '../../lib/utils'
import { VisuallyHidden } from '../visually-hidden'
import { spinnerVariants } from './index'

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'default',
  label: 'Loading',
})
</script>

<template>
  <span
    role="status"
    data-slot="spinner"
    :data-size="props.size"
    :class="cn(spinnerVariants({ size: props.size }), props.class)"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      aria-hidden="true"
      class="size-full animate-spin motion-reduce:animate-none"
    >
      <circle cx="12" cy="12" r="9" class="opacity-25" />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </svg>
    <VisuallyHidden>{{ props.label }}</VisuallyHidden>
  </span>
</template>
