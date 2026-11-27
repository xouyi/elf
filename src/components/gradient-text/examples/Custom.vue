<script setup lang="ts">
import { ElfGradientText } from '@xouyi/elfui'
</script>

<template>
  <div class="grid gap-2 text-2xl font-semibold tracking-tight">
    <ElfGradientText from="var(--elf-primary)" to="var(--elf-destructive-text)" direction="br">
      Primary into destructive text
    </ElfGradientText>
    <ElfGradientText from="var(--elf-success-text)" via="var(--elf-primary)" to="var(--elf-warning-text)">
      Three stops from theme tokens
    </ElfGradientText>
  </div>
</template>
