<script setup lang="ts">
import { ElfAlertDialog, ElfAlertDialogAction, ElfAlertDialogCancel, ElfAlertDialogContent, ElfAlertDialogDescription, ElfAlertDialogFooter, ElfAlertDialogHeader, ElfAlertDialogTitle, ElfAlertDialogTrigger, ElfButton } from '@xouyi/elfui'
</script>

<template>
  <ElfAlertDialog>
    <ElfAlertDialogTrigger as-child>
      <ElfButton variant="outline">
        Publish roster
      </ElfButton>
    </ElfAlertDialogTrigger>
    <ElfAlertDialogContent>
      <ElfAlertDialogHeader>
        <ElfAlertDialogTitle>Publish the roster?</ElfAlertDialogTitle>
        <ElfAlertDialogDescription>Every member will be notified and the draft is locked.</ElfAlertDialogDescription>
      </ElfAlertDialogHeader>
      <ElfAlertDialogFooter>
        <ElfAlertDialogCancel>Cancel</ElfAlertDialogCancel>
        <ElfAlertDialogAction>Publish</ElfAlertDialogAction>
      </ElfAlertDialogFooter>
    </ElfAlertDialogContent>
  </ElfAlertDialog>
</template>
