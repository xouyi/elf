<script setup lang="ts">
import type { MenubarContentEmits } from 'reka-ui'
import type { MenubarContentProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { MenubarContent, MenubarPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuContentClass } from '../dropdown-menu'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenubarContentProps>(), {
  align: 'start',
  alignOffset: -4,
  sideOffset: 8,
})
const emits = defineEmits<MenubarContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <MenubarPortal>
    <MenubarContent
      data-slot="menubar-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(
        menuContentClass,
        'min-w-48 max-h-(--reka-menubar-content-available-height) origin-(--reka-menubar-content-transform-origin)',
        props.class,
      )"
    >
      <slot />
    </MenubarContent>
  </MenubarPortal>
</template>
