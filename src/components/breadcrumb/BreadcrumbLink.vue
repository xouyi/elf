<script setup lang="ts">
import type { BreadcrumbLinkProps } from './index'
import { Primitive } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<BreadcrumbLinkProps>(), {
  as: 'a',
})
</script>

<template>
  <Primitive
    data-slot="breadcrumb-link"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('rounded-sm transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50', props.class)"
  >
    <slot />
  </Primitive>
</template>
