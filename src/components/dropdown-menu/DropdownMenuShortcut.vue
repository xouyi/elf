<script setup lang="ts">
import type { DropdownMenuShortcutProps } from './index'
import { cn } from '../../lib/utils'
import { menuShortcutClass } from './styles'

const props = defineProps<DropdownMenuShortcutProps>()
</script>

<template>
  <span
    data-slot="dropdown-menu-shortcut"
    :class="cn(menuShortcutClass, props.class)"
  >
    <slot />
  </span>
</template>
