<script setup lang="ts">
import type { PopoverContentEmits } from 'reka-ui'
import type { PopoverContentProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { PopoverContent, PopoverPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopoverContentProps>(), {
  sideOffset: 4,
  align: 'center',
})
const emits = defineEmits<PopoverContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      data-slot="popover-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(
        'z-50 max-h-(--reka-popover-content-available-height) w-72 max-w-[calc(100vw-1rem)] origin-(--reka-popover-content-transform-origin) overflow-y-auto rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
        'data-[state=closed]:animate-[elf-fade-out_100ms_ease-in_forwards] data-[state=open]:animate-[elf-zoom-in_120ms_ease-out] motion-reduce:animate-none!',
        props.class,
      )"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
