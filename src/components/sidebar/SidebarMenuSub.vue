<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ul
    data-slot="sidebar-menu-sub"
    :class="cn('mx-3.5 flex min-w-0 flex-col gap-1 border-l border-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden', props.class)"
  >
    <slot />
  </ul>
</template>
