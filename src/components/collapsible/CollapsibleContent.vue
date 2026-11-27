<script setup lang="ts">
import type { CollapsibleContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CollapsibleContent, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { collapsibleContentClass } from './index'

const props = defineProps<CollapsibleContentProps & {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CollapsibleContent
    data-slot="collapsible-content"
    v-bind="forwardedProps"
    :class="cn(collapsibleContentClass, props.class)"
  >
    <slot />
  </CollapsibleContent>
</template>
