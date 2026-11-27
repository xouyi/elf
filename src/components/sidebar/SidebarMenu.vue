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
    data-slot="sidebar-menu"
    :class="cn('flex w-full min-w-0 flex-col gap-1', props.class)"
  >
    <slot />
  </ul>
</template>
