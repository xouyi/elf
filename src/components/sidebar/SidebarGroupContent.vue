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
    data-slot="sidebar-group-content"
    :class="cn('w-full text-sm', props.class)"
  >
    <slot />
  </div>
</template>
