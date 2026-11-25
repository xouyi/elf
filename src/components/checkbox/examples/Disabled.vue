<script setup lang="ts">
import { ElfCheckbox, ElfLabel } from '@xouyi/elfui'
</script>

<template>
  <div class="grid gap-3">
    <div class="flex items-center gap-3">
      <ElfCheckbox id="checkbox-off" disabled />
      <ElfLabel for="checkbox-off">
        Receive match reminders
      </ElfLabel>
    </div>
    <div class="flex items-center gap-3">
      <ElfCheckbox id="checkbox-on" disabled default-value />
      <ElfLabel for="checkbox-on">
        Member of the pit crew
      </ElfLabel>
    </div>
  </div>
</template>
