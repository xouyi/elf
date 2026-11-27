<script setup lang="ts">
import type { ContextMenuSubContentEmits } from 'reka-ui'
import type { ContextMenuSubContentProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { ContextMenuSubContent, ContextMenuPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuContentClass } from '../dropdown-menu'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuSubContentProps>(), {
  sideOffset: 2,
  alignOffset: -4,
})
const emits = defineEmits<ContextMenuSubContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuSubContent
      data-slot="context-menu-sub-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(
        menuContentClass,
        'max-h-(--reka-context-menu-content-available-height) origin-(--reka-context-menu-content-transform-origin)',
        props.class,
      )"
    >
      <slot />
    </ContextMenuSubContent>
  </ContextMenuPortal>
</template>
