<script setup lang="ts">
import type { StepperItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { StepperItem, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<StepperItemProps & {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <StepperItem
    v-slot="slotProps"
    data-slot="stepper-item"
    v-bind="forwardedProps"
    :class="cn('group/step flex min-w-0 gap-2 data-[orientation=horizontal]:flex-1 data-[orientation=horizontal]:items-center data-[orientation=horizontal]:last:flex-none data-[orientation=vertical]:flex-col', props.class)"
  >
    <slot v-bind="slotProps" />
  </StepperItem>
</template>
