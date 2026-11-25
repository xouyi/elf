<script setup lang="ts">
import type { KbdProps } from './index'
import { Primitive } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<KbdProps>(), {
  as: 'kbd',
})
</script>

<template>
  <Primitive
    data-slot="kbd"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'pointer-events-none inline-flex h-5 min-w-5 w-fit items-center justify-center gap-1 rounded-sm border border-border bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none',
      '[&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-3',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>
