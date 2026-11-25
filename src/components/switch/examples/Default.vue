<script setup lang="ts">
import { ElfLabel, ElfSwitch } from '@xouyi/elfui'
import { ref } from 'vue'

const reminders = ref(true)
</script>

<template>
  <div class="flex items-center gap-3">
    <ElfSwitch id="switch-reminders" v-model="reminders" />
    <ElfLabel for="switch-reminders">
      Match reminders
    </ElfLabel>
  </div>
</template>
