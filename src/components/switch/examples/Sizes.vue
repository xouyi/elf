<script setup lang="ts">
import { ElfLabel, ElfSwitch } from '@xouyi/elfui'
</script>

<template>
  <div class="grid gap-4">
    <div class="flex items-center gap-3">
      <ElfSwitch id="switch-default" default-value />
      <ElfLabel for="switch-default">
        Default size
      </ElfLabel>
    </div>
    <div class="flex items-center gap-3">
      <ElfSwitch id="switch-sm" size="sm" default-value />
      <ElfLabel for="switch-sm">
        Small size
      </ElfLabel>
    </div>
  </div>
</template>
