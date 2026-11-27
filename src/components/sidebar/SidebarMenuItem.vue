<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li
    data-slot="sidebar-menu-item"
    :class="cn('group/menu-item relative [&:has([data-slot=sidebar-menu-badge])>[data-slot=sidebar-menu-button]]:pr-9', props.class)"
  >
    <slot />
  </li>
</template>
