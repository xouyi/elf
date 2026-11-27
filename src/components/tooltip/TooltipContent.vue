<script setup lang="ts">
import type { TooltipContentEmits } from 'reka-ui'
import type { TooltipContentProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { TooltipContent, TooltipPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipContentProps>(), {
  sideOffset: 6,
})
const emits = defineEmits<TooltipContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(
        'z-50 w-fit max-w-[min(20rem,calc(100vw-1rem))] origin-(--reka-tooltip-content-transform-origin) rounded-md border bg-popover px-3 py-1.5 text-xs text-balance text-popover-foreground shadow-md',
        'data-[state=closed]:animate-[elf-fade-out_100ms_ease-in_forwards] data-[state=delayed-open]:animate-[elf-fade-in_120ms_ease-out] data-[state=instant-open]:animate-[elf-fade-in_120ms_ease-out] motion-reduce:animate-none!',
        props.class,
      )"
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
