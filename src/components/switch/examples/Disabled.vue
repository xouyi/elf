<script setup lang="ts">
import { ElfLabel, ElfSwitch } from '@xouyi/elfui'
</script>

<template>
  <div class="grid gap-4">
    <div class="flex items-center gap-3">
      <ElfSwitch id="switch-dis-off" disabled />
      <ElfLabel for="switch-dis-off">
        Auto-sync (off)
      </ElfLabel>
    </div>
    <div class="flex items-center gap-3">
      <ElfSwitch id="switch-dis-on" disabled default-value />
      <ElfLabel for="switch-dis-on">
        Two-factor sign-in (managed by HQ)
      </ElfLabel>
    </div>
  </div>
</template>
