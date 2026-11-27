<script setup lang="ts">
import type { AccordionTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ChevronDown } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionHeader, AccordionTrigger, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<AccordionTriggerProps & {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <AccordionHeader data-slot="accordion-header" class="flex">
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="forwardedProps"
      :class="cn('flex min-h-10 flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium outline-none transition-all hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180', props.class)"
    >
      <slot />
      <slot name="icon">
        <ChevronDown aria-hidden="true" class="pointer-events-none mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none" />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
