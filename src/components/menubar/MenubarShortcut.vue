<script setup lang="ts">
import type { MenubarShortcutProps } from './index'
import { cn } from '../../lib/utils'
import { menuShortcutClass } from '../dropdown-menu'

const props = defineProps<MenubarShortcutProps>()
</script>

<template>
  <span
    data-slot="menubar-shortcut"
    :class="cn(menuShortcutClass, props.class)"
  >
    <slot />
  </span>
</template>
