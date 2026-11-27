<script setup lang="ts">
import type { MenubarCheckboxItemEmits } from 'reka-ui'
import type { MenubarCheckboxItemProps } from './index'
import { Check } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { MenubarCheckboxItem, MenubarItemIndicator, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuItemVariants } from '../dropdown-menu'

const props = defineProps<MenubarCheckboxItemProps>()
const emits = defineEmits<MenubarCheckboxItemEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <MenubarCheckboxItem
    data-slot="menubar-checkbox-item"
    v-bind="forwarded"
    :class="cn(menuItemVariants(), 'pr-2 pl-8', props.class)"
  >
    <span class="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
      <MenubarItemIndicator>
        <Check class="size-4" />
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarCheckboxItem>
</template>
