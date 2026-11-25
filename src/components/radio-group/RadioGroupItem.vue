<script setup lang="ts">
import type { RadioGroupItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<RadioGroupItemProps & {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    v-bind="forwardedProps"
    :class="cn(
      'peer aspect-square size-4 shrink-0 rounded-full border border-input bg-transparent text-primary transition-[color,box-shadow] outline-none',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:border-primary',
      'aria-invalid:border-destructive aria-invalid:ring-destructive/30 group-aria-invalid/radio-group:border-destructive',
      props.class,
    )"
  >
    <RadioGroupIndicator data-slot="radio-group-indicator" class="flex items-center justify-center">
      <span class="size-2 rounded-full bg-primary" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
