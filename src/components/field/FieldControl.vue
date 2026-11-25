<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useFieldContext } from './context'

const field = useFieldContext()

// Only defined attributes are bound: an undefined value would overwrite the child's own attribute.
const controlAttrs = computed(() => {
  if (!field)
    return {}
  const describedBy = [
    field.hasDescription.value ? field.descriptionId : undefined,
    field.hasError.value ? field.errorId : undefined,
  ].filter(Boolean).join(' ')
  return {
    'id': field.id,
    ...(describedBy && { 'aria-describedby': describedBy }),
    ...(field.invalid.value && { 'aria-invalid': 'true' }),
    ...(field.required.value && { 'aria-required': 'true' }),
    ...(field.disabled.value && { disabled: true }),
  }
})
</script>

<template>
  <Primitive as-child v-bind="controlAttrs">
    <slot />
  </Primitive>
</template>
