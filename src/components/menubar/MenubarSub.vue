<script setup lang="ts">
import type { MenubarSubEmits, MenubarSubProps } from 'reka-ui'
import { MenubarSub, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<MenubarSubProps>()
const emits = defineEmits<MenubarSubEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <MenubarSub
    v-slot="slotProps"
    data-slot="menubar-sub"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </MenubarSub>
</template>
