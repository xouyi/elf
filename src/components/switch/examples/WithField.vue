<script setup lang="ts">
import { ElfField, ElfFieldControl, ElfFieldDescription, ElfFieldLabel, ElfSwitch } from '@xouyi/elfui'
import { ref } from 'vue'

const digest = ref(true)
const sms = ref(false)
</script>

<template>
  <div class="grid w-80 gap-6">
    <ElfField>
      <div class="flex items-center justify-between gap-4">
        <ElfFieldLabel>Weekly digest</ElfFieldLabel>
        <ElfFieldControl>
          <ElfSwitch v-model="digest" />
        </ElfFieldControl>
      </div>
      <ElfFieldDescription>One email every Monday.</ElfFieldDescription>
    </ElfField>
    <ElfField disabled>
      <div class="flex items-center justify-between gap-4">
        <ElfFieldLabel>SMS alerts</ElfFieldLabel>
        <ElfFieldControl>
          <ElfSwitch v-model="sms" />
        </ElfFieldControl>
      </div>
      <ElfFieldDescription>Not available on your plan.</ElfFieldDescription>
    </ElfField>
  </div>
</template>
