<script setup lang="ts">
import { ElfInput, ElfLabel } from 'elfui'
</script>

<template>
  <div class="grid w-72 gap-2">
    <ElfLabel for="label-team-name">
      Team name
      <span aria-hidden="true" class="text-[color-mix(in_oklab,var(--color-destructive)_55%,white)]">*</span>
    </ElfLabel>
    <ElfInput id="label-team-name" required placeholder="Novatron Robotics" />
  </div>
</template>
