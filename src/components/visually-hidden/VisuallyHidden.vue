<script setup lang="ts">
import type { VisuallyHiddenProps } from './index'
import { VisuallyHidden } from 'reka-ui'

const props = withDefaults(defineProps<VisuallyHiddenProps>(), {
  as: 'span',
  feature: 'focusable',
})
</script>

<template>
  <VisuallyHidden
    data-slot="visually-hidden"
    :as="props.as"
    :as-child="props.asChild"
    :feature="props.feature"
    :class="props.class"
  >
    <slot />
  </VisuallyHidden>
</template>
