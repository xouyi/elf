<script setup lang="ts">
import type { MenubarSubContentEmits } from 'reka-ui'
import type { MenubarSubContentProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { MenubarSubContent, MenubarPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuContentClass } from '../dropdown-menu'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenubarSubContentProps>(), {
  sideOffset: 2,
  alignOffset: -4,
})
const emits = defineEmits<MenubarSubContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <MenubarPortal>
    <MenubarSubContent
      data-slot="menubar-sub-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(
        menuContentClass,
        'max-h-(--reka-menubar-content-available-height) origin-(--reka-menubar-content-transform-origin)',
        props.class,
      )"
    >
      <slot />
    </MenubarSubContent>
  </MenubarPortal>
</template>
