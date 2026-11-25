<script setup lang="ts">
import { ElfField, ElfFieldControl, ElfInput } from 'elfui'
</script>

<template>
  <ElfField label="Email" description="We only use it to send match reminders." class="w-80">
    <ElfFieldControl>
      <ElfInput type="email" placeholder="you@example.com" />
    </ElfFieldControl>
  </ElfField>
</template>
