<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="sidebar-menu-badge"
    :class="cn('pointer-events-none absolute top-1/2 right-1 flex h-5 min-w-5 -translate-y-1/2 items-center justify-center rounded-md bg-primary px-1 text-xs font-medium text-primary-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden', props.class)"
  >
    <slot />
  </div>
</template>
