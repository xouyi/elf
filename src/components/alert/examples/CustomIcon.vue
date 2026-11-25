<script setup lang="ts">
import { ElfAlert, ElfAlertDescription, ElfAlertTitle } from '@xouyi/elfui'
import { Rocket } from '@lucide/vue'
</script>

<template>
  <div class="grid max-w-lg gap-4">
    <ElfAlert>
      <template #icon>
        <Rocket />
      </template>
      <ElfAlertTitle>New season kickoff</ElfAlertTitle>
      <ElfAlertDescription>The game manual is out. Read it before Thursday's meeting.</ElfAlertDescription>
    </ElfAlert>
    <ElfAlert :show-icon="false" role="none">
      <ElfAlertTitle>Title only, no icon</ElfAlertTitle>
    </ElfAlert>
  </div>
</template>
