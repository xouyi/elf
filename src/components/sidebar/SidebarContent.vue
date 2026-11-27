<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'
import { ScrollArea } from '../scroll-area'

const props = defineProps<{
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ScrollArea
    data-slot="sidebar-content"
    :class="cn('min-h-0 flex-1 group-data-[collapsible=icon]:overflow-hidden', props.class)"
    viewport-class="[&>div]:block!"
  >
    <slot />
  </ScrollArea>
</template>
