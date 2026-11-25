<script setup lang="ts">
import type { SkeletonProps } from './index'
import { cn } from '../../lib/utils'

const props = defineProps<SkeletonProps>()
</script>

<template>
  <div
    data-slot="skeleton"
    aria-hidden="true"
    :class="cn('animate-pulse rounded-md bg-accent motion-reduce:animate-none', props.class)"
  />
</template>
