<script setup lang="ts">
import { ElfAlertDialog, ElfAlertDialogAction, ElfAlertDialogCancel, ElfAlertDialogContent, ElfAlertDialogDescription, ElfAlertDialogFooter, ElfAlertDialogHeader, ElfAlertDialogTitle, ElfAlertDialogTrigger, ElfButton } from '@xouyi/elfui'
</script>

<template>
  <ElfAlertDialog>
    <ElfAlertDialogTrigger as-child>
      <ElfButton variant="destructive">
        Delete match log
      </ElfButton>
    </ElfAlertDialogTrigger>
    <ElfAlertDialogContent>
      <ElfAlertDialogHeader>
        <ElfAlertDialogTitle>Delete this match log?</ElfAlertDialogTitle>
        <ElfAlertDialogDescription>
          This permanently removes the log and its scouting notes. This action cannot be undone.
        </ElfAlertDialogDescription>
      </ElfAlertDialogHeader>
      <ElfAlertDialogFooter>
        <ElfAlertDialogCancel>Keep it</ElfAlertDialogCancel>
        <ElfAlertDialogAction variant="destructive">
          Delete
        </ElfAlertDialogAction>
      </ElfAlertDialogFooter>
    </ElfAlertDialogContent>
  </ElfAlertDialog>
</template>
