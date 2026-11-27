<script setup lang="ts">
import type { DropdownMenuRadioItemEmits } from 'reka-ui'
import type { DropdownMenuRadioItemProps } from './index'
import { Circle } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuItemVariants } from './styles'

const props = defineProps<DropdownMenuRadioItemProps>()
const emits = defineEmits<DropdownMenuRadioItemEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuRadioItem
    data-slot="dropdown-menu-radio-item"
    v-bind="forwarded"
    :class="cn(menuItemVariants(), 'pr-2 pl-8', props.class)"
  >
    <span class="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
      <DropdownMenuItemIndicator>
        <Circle class="size-2 fill-current" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>
