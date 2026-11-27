<script setup lang="ts">
import type { ContextMenuCheckboxItemEmits } from 'reka-ui'
import type { ContextMenuCheckboxItemProps } from './index'
import { Check } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { ContextMenuCheckboxItem, ContextMenuItemIndicator, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuItemVariants } from '../dropdown-menu'

const props = defineProps<ContextMenuCheckboxItemProps>()
const emits = defineEmits<ContextMenuCheckboxItemEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuCheckboxItem
    data-slot="context-menu-checkbox-item"
    v-bind="forwarded"
    :class="cn(menuItemVariants(), 'pr-2 pl-8', props.class)"
  >
    <span class="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
      <ContextMenuItemIndicator>
        <Check class="size-4" />
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuCheckboxItem>
</template>
