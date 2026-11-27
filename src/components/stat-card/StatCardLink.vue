<script setup lang="ts">
import type { StatCardLinkProps } from './index'
import { Primitive } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<StatCardLinkProps>(), {
  as: 'a',
})
</script>

<template>
  <Primitive
    data-slot="stat-card-link"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('outline-none after:absolute after:inset-0 after:content-[\'\']', props.class)"
  >
    <slot />
  </Primitive>
</template>
