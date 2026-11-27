<script setup lang="ts">
import type { StepperIndicatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Check } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { injectStepperItemContext, StepperIndicator, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<StepperIndicatorProps & {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
const item = injectStepperItemContext()
</script>

<template>
  <StepperIndicator
    data-slot="stepper-indicator"
    aria-hidden="true"
    v-bind="forwardedProps"
    :data-state="item.state.value"
    :data-step="item.step.value"
    :class="cn('flex size-8 shrink-0 items-center justify-center rounded-full border border-input bg-muted text-sm font-medium text-muted-foreground transition-colors motion-reduce:transition-none data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:ring-3 data-[state=active]:ring-ring/30 data-[state=completed]:border-primary data-[state=completed]:bg-primary data-[state=completed]:text-primary-foreground before:content-[attr(data-step)] data-[state=completed]:before:content-none [&_svg]:size-4', props.class)"
  >
    <slot :step="item.step.value" :state="item.state.value">
      <Check v-if="item.state.value === 'completed'" />
      <!-- The step number is generated content (see `before:`), so it is not part of the text that axe compares with the name. -->
      <span v-else />
    </slot>
  </StepperIndicator>
</template>
