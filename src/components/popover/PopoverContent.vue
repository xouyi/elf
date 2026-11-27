<script setup lang="ts">
import type { PopoverContentEmits } from 'reka-ui'
import type { PopoverContentProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { PopoverContent, PopoverPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { popoverPanelClass } from './styles'

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
        popoverPanelClass,
        'max-h-(--reka-popover-content-available-height) w-72 origin-(--reka-popover-content-transform-origin)',
        props.class,
      )"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
