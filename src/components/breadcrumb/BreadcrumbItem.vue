<script setup lang="ts">
import type { BreadcrumbItemProps } from './index'
import { cn } from '../../lib/utils'

const props = defineProps<BreadcrumbItemProps>()
</script>

<template>
  <li
    data-slot="breadcrumb-item"
    :class="cn('inline-flex items-center gap-1.5', props.class)"
  >
    <slot />
  </li>
</template>
