<script setup lang="ts">
import type { StepperDescriptionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { StepperDescription, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<StepperDescriptionProps & {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>(), { as: 'span' })
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <StepperDescription
    data-slot="stepper-description"
    v-bind="forwardedProps"
    :class="cn('block text-xs text-muted-foreground', props.class)"
  >
    <slot />
  </StepperDescription>
</template>
