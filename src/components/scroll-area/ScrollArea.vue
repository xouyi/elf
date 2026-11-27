<script setup lang="ts">
import type { ScrollAreaProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import ScrollBar from './ScrollBar.vue'

const props = withDefaults(defineProps<ScrollAreaProps>(), {
  orientation: 'vertical',
})
const delegatedProps = reactiveOmit(props, 'class', 'orientation', 'label', 'viewportClass')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <ScrollAreaRoot
    data-slot="scroll-area"
    v-bind="forwarded"
    :class="cn('relative overflow-hidden', props.class)"
  >
    <ScrollAreaViewport
      data-slot="scroll-area-viewport"
      :role="props.label ? 'region' : undefined"
      :aria-label="props.label"
      :class="cn('size-full rounded-[inherit] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset', props.viewportClass)"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollBar v-if="props.orientation !== 'horizontal'" orientation="vertical" />
    <ScrollBar v-if="props.orientation !== 'vertical'" orientation="horizontal" />
    <ScrollAreaCorner v-if="props.orientation === 'both'" />
  </ScrollAreaRoot>
</template>
