<script setup lang="ts">
import type { DropdownMenuCheckboxItemEmits } from 'reka-ui'
import type { DropdownMenuCheckboxItemProps } from './index'
import { Check } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuCheckboxItem, DropdownMenuItemIndicator, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuItemVariants } from './styles'

const props = defineProps<DropdownMenuCheckboxItemProps>()
const emits = defineEmits<DropdownMenuCheckboxItemEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuCheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    v-bind="forwarded"
    :class="cn(menuItemVariants(), 'pr-2 pl-8', props.class)"
  >
    <span class="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
      <DropdownMenuItemIndicator>
        <Check class="size-4" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
