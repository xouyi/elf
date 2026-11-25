<script setup lang="ts">
import type { SelectRootEmits, SelectRootProps } from 'reka-ui'
import { SelectRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useFieldContext } from '../field'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

// Inside an ElfField the select also reports the field's required state (aria-required on the trigger).
const field = useFieldContext()
const required = computed(() => props.required || Boolean(field?.required.value))

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectRoot v-slot="slotProps" v-bind="forwarded" :required="required">
    <slot v-bind="slotProps" />
  </SelectRoot>
</template>
