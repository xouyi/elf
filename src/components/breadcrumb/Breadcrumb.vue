<script setup lang="ts">
import type { BreadcrumbProps } from './index'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  ariaLabel: 'Breadcrumb',
})
</script>

<template>
  <nav
    data-slot="breadcrumb"
    :aria-label="props.ariaLabel"
    :class="cn(props.class)"
  >
    <slot />
  </nav>
</template>
