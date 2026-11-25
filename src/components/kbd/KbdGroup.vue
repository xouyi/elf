<script setup lang="ts">
import type { KbdGroupProps } from './index'
import { Primitive } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<KbdGroupProps>(), {
  as: 'kbd',
})
</script>

<template>
  <Primitive
    data-slot="kbd-group"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('inline-flex items-center gap-1', props.class)"
  >
    <slot />
  </Primitive>
</template>
