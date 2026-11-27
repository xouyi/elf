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
    data-slot="sidebar-header"
    :class="cn('flex shrink-0 flex-col gap-2 p-2', props.class)"
  >
    <slot />
  </div>
</template>
