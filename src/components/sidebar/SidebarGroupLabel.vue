<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<PrimitiveProps & {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>(), {
  as: 'div',
})
</script>

<template>
  <Primitive
    data-slot="sidebar-group-label"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-muted-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50 group-data-[collapsible=icon]:hidden [&>svg]:size-4 [&>svg]:shrink-0', props.class)"
  >
    <slot />
  </Primitive>
</template>
