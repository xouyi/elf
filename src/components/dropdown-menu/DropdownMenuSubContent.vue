<script setup lang="ts">
import type { DropdownMenuSubContentEmits } from 'reka-ui'
import type { DropdownMenuSubContentProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuSubContent, DropdownMenuPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuContentClass } from './styles'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownMenuSubContentProps>(), {
  sideOffset: 2,
  alignOffset: -4,
})
const emits = defineEmits<DropdownMenuSubContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuSubContent
      data-slot="dropdown-menu-sub-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(
        menuContentClass,
        'max-h-(--reka-dropdown-menu-content-available-height) origin-(--reka-dropdown-menu-content-transform-origin)',
        props.class,
      )"
    >
      <slot />
    </DropdownMenuSubContent>
  </DropdownMenuPortal>
</template>
