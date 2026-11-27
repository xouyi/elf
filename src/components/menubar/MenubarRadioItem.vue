<script setup lang="ts">
import type { MenubarRadioItemEmits } from 'reka-ui'
import type { MenubarRadioItemProps } from './index'
import { Circle } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { MenubarItemIndicator, MenubarRadioItem, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuItemVariants } from '../dropdown-menu'

const props = defineProps<MenubarRadioItemProps>()
const emits = defineEmits<MenubarRadioItemEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <MenubarRadioItem
    data-slot="menubar-radio-item"
    v-bind="forwarded"
    :class="cn(menuItemVariants(), 'pr-2 pl-8', props.class)"
  >
    <span class="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
      <MenubarItemIndicator>
        <Circle class="size-2 fill-current" />
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarRadioItem>
</template>
