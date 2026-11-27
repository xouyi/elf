<script setup lang="ts">
import type { MenubarRootEmits } from 'reka-ui'
import type { MenubarProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { MenubarRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<MenubarProps>(), {
  loop: true,
})
const emits = defineEmits<MenubarRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <MenubarRoot
    v-slot="slotProps"
    data-slot="menubar"
    v-bind="forwarded"
    :class="cn('flex h-10 w-fit max-w-full items-center gap-1 rounded-md border bg-background p-1 shadow-xs md:h-9', props.class)"
  >
    <slot v-bind="slotProps" />
  </MenubarRoot>
</template>
