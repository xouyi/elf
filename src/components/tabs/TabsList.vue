<script setup lang="ts">
import type { TabsListProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsList } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<TabsListProps & {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    v-bind="delegatedProps"
    :class="cn('inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-0.75 text-muted-foreground', props.class)"
  >
    <slot />
  </TabsList>
</template>
