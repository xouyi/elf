<script setup lang="ts">
import type { StepperTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { StepperTitle, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<StepperTitleProps & {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>(), { as: 'span' })
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <StepperTitle
    data-slot="stepper-title"
    v-bind="forwardedProps"
    :class="cn('block text-sm leading-tight font-medium text-foreground', props.class)"
  >
    <slot />
  </StepperTitle>
</template>
