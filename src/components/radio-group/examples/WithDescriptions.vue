<script setup lang="ts">
import { ElfLabel, ElfRadioGroup, ElfRadioGroupItem } from '@xouyi/elfui'
import { ref } from 'vue'

const plan = ref('standard')
const plans = [
  { value: 'standard', label: 'Standard', text: 'Practice sessions on weekdays after school.' },
  { value: 'extended', label: 'Extended', text: 'Weekdays plus Saturday build days.' },
  { value: 'competition', label: 'Competition', text: 'Everything above, plus travel to events.' },
]
</script>

<template>
  <ElfRadioGroup v-model="plan" aria-label="Attendance plan" class="w-96">
    <div v-for="item in plans" :key="item.value" class="flex items-start gap-3">
      <ElfRadioGroupItem
        :id="`radio-plan-${item.value}`"
        :value="item.value"
        :aria-describedby="`radio-plan-${item.value}-text`"
        class="mt-0.5"
      />
      <div class="grid gap-1.5">
        <ElfLabel :for="`radio-plan-${item.value}`">
          {{ item.label }}
        </ElfLabel>
        <p :id="`radio-plan-${item.value}-text`" class="text-sm text-muted-foreground">
          {{ item.text }}
        </p>
      </div>
    </div>
  </ElfRadioGroup>
</template>
