<script setup lang="ts">
import type { StepperSeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { StepperSeparator, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<StepperSeparatorProps & {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <StepperSeparator
    data-slot="stepper-separator"
    v-bind="forwardedProps"
    :class="cn('shrink-0 bg-border transition-colors motion-reduce:transition-none data-[state=completed]:bg-primary data-[orientation=horizontal]:h-px data-[orientation=horizontal]:min-w-4 data-[orientation=horizontal]:flex-1 data-[orientation=vertical]:ml-4 data-[orientation=vertical]:min-h-6 data-[orientation=vertical]:w-px', props.class)"
  />
</template>
