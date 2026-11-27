<script setup lang="ts">
import type { ContextMenuContentEmits } from 'reka-ui'
import type { ContextMenuContentProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { ContextMenuContent, ContextMenuPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuContentClass } from '../dropdown-menu'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ContextMenuContentProps>()
const emits = defineEmits<ContextMenuContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuContent
      data-slot="context-menu-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(
        menuContentClass,
        'max-h-(--reka-context-menu-content-available-height) origin-(--reka-context-menu-content-transform-origin)',
        props.class,
      )"
    >
      <slot />
    </ContextMenuContent>
  </ContextMenuPortal>
</template>
