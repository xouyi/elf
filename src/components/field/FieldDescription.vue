<script setup lang="ts">
import type { FieldDescriptionProps } from './index'
import { onBeforeUnmount } from 'vue'
import { cn } from '../../lib/utils'
import { useFieldContext } from './context'

const props = defineProps<FieldDescriptionProps>()
const field = useFieldContext()
const unregister = field?.register('description')
onBeforeUnmount(() => unregister?.())
</script>

<template>
  <p
    :id="field?.descriptionId"
    data-slot="field-description"
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </p>
</template>
