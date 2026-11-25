<script setup lang="ts">
import type { LabelProps } from './index'
import { Label } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<LabelProps>()
</script>

<template>
  <Label
    data-slot="label"
    :for="props.for"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'flex items-center gap-2 text-sm leading-none font-medium text-foreground select-none',
      'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      props.class,
    )"
  >
    <slot />
  </Label>
</template>
