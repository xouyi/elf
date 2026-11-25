<script setup lang="ts">
import { ElfAlert, ElfAlertDescription, ElfAlertTitle } from '@xouyi/elfui'
</script>

<template>
  <div class="grid max-w-lg gap-4">
    <ElfAlert>
      <ElfAlertTitle>Heads up</ElfAlertTitle>
      <ElfAlertDescription>Registration for the Istanbul Regional opens next week.</ElfAlertDescription>
    </ElfAlert>
    <ElfAlert variant="success">
      <ElfAlertTitle>Robot inspection passed</ElfAlertTitle>
      <ElfAlertDescription>You are cleared to queue for your first match.</ElfAlertDescription>
    </ElfAlert>
    <ElfAlert variant="warning">
      <ElfAlertTitle>Battery 3 is below 12 V</ElfAlertTitle>
      <ElfAlertDescription>Swap it for a charged battery before the next match.</ElfAlertDescription>
    </ElfAlert>
    <ElfAlert variant="destructive">
      <ElfAlertTitle>Could not save the schedule</ElfAlertTitle>
      <ElfAlertDescription>Check your connection and try again.</ElfAlertDescription>
    </ElfAlert>
  </div>
</template>
