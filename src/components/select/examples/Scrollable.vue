<script setup lang="ts">
import { ElfSelect, ElfSelectContent, ElfSelectItem, ElfSelectTrigger, ElfSelectValue } from '@xouyi/elfui'

const timezones = [
  'UTC-08:00 Los Angeles',
  'UTC-07:00 Denver',
  'UTC-06:00 Chicago',
  'UTC-05:00 New York',
  'UTC-03:00 Sao Paulo',
  'UTC+00:00 London',
  'UTC+01:00 Berlin',
  'UTC+02:00 Athens',
  'UTC+03:00 Istanbul',
  'UTC+04:00 Dubai',
  'UTC+05:30 Mumbai',
  'UTC+08:00 Singapore',
  'UTC+09:00 Tokyo',
  'UTC+10:00 Sydney',
  'UTC+12:00 Auckland',
]
</script>

<template>
  <ElfSelect default-value="UTC+03:00 Istanbul">
    <ElfSelectTrigger class="w-64" aria-label="Time zone">
      <ElfSelectValue />
    </ElfSelectTrigger>
    <ElfSelectContent class="max-h-48">
      <ElfSelectItem v-for="zone in timezones" :key="zone" :value="zone">
        {{ zone }}
      </ElfSelectItem>
    </ElfSelectContent>
  </ElfSelect>
</template>
