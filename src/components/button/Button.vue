<script setup lang="ts">
import type { ButtonProps } from './index'
import { Primitive } from 'reka-ui'
import { cn } from '../../lib/utils'
import { buttonVariants } from './index'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
  glow: false,
})
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="props.variant"
    :data-size="props.size"
    :data-glow="props.glow ? '' : undefined"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(buttonVariants({ variant: props.variant, size: props.size, glow: props.glow }), props.class)"
  >
    <slot />
  </Primitive>
</template>
