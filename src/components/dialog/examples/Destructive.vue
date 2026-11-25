<script setup lang="ts">
import { ElfButton, ElfDialog, ElfDialogContent, ElfDialogDescription, ElfDialogFooter, ElfDialogHeader, ElfDialogTitle, ElfDialogTrigger } from '@elf/ui'
</script>

<template>
  <ElfDialog>
    <ElfDialogTrigger as-child>
      <ElfButton variant="destructive">
        Delete match log
      </ElfButton>
    </ElfDialogTrigger>
    <ElfDialogContent>
      <ElfDialogHeader>
        <ElfDialogTitle>Delete match log?</ElfDialogTitle>
        <ElfDialogDescription>This action cannot be undone.</ElfDialogDescription>
      </ElfDialogHeader>
      <ElfDialogFooter show-close-button>
        <ElfButton variant="destructive">
          Delete
        </ElfButton>
      </ElfDialogFooter>
    </ElfDialogContent>
  </ElfDialog>
</template>
