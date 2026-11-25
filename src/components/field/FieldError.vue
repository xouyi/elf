<script setup lang="ts">
import type { FieldErrorProps } from './index'
import { onBeforeUnmount } from 'vue'
import { cn } from '../../lib/utils'
import { useFieldContext } from './context'

const props = defineProps<FieldErrorProps>()
const field = useFieldContext()
const unregister = field?.register('error')
onBeforeUnmount(() => unregister?.())
</script>

<template>
  <div
    :id="field?.errorId"
    data-slot="field-error"
    role="alert"
    :class="cn('text-sm text-destructive-text', props.class)"
  >
    <slot />
  </div>
</template>
