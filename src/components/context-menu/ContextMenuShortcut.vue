<script setup lang="ts">
import type { ContextMenuShortcutProps } from './index'
import { cn } from '../../lib/utils'
import { menuShortcutClass } from '../dropdown-menu'

const props = defineProps<ContextMenuShortcutProps>()
</script>

<template>
  <span
    data-slot="context-menu-shortcut"
    :class="cn(menuShortcutClass, props.class)"
  >
    <slot />
  </span>
</template>
