<script setup lang="ts">
import type { FocusOutsideEvent, PointerDownOutsideEvent } from 'reka-ui'
import type { HoverCardContentProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { HoverCardContent, HoverCardPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { popoverPanelClass } from '../popover'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<HoverCardContentProps>(), {
  sideOffset: 4,
  align: 'center',
})
const emits = defineEmits<{
  /** Called when Escape is pressed. Can be prevented. */
  escapeKeyDown: [event: KeyboardEvent]
  /** Called when a pointer is pressed outside the card. Can be prevented. */
  pointerDownOutside: [event: PointerDownOutsideEvent]
  /** Called when focus moves outside the card. Can be prevented. */
  focusOutside: [event: FocusOutsideEvent]
  /** Called for either of the two outside interactions. Can be prevented. */
  interactOutside: [event: PointerDownOutsideEvent | FocusOutsideEvent]
}>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <HoverCardPortal>
    <HoverCardContent
      data-slot="hover-card-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(
        popoverPanelClass,
        'max-h-(--reka-hover-card-content-available-height) w-72 origin-(--reka-hover-card-content-transform-origin)',
        props.class,
      )"
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>
