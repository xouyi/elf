<script setup lang="ts">
import { ElfButton, ElfDialog, ElfDialogClose, ElfDialogContent, ElfDialogDescription, ElfDialogFooter, ElfDialogHeader, ElfDialogTitle, ElfDialogTrigger, ElfInput } from '@elf/ui'
</script>

<template>
  <ElfDialog>
    <ElfDialogTrigger as-child>
      <ElfButton variant="outline">
        Edit profile
      </ElfButton>
    </ElfDialogTrigger>
    <ElfDialogContent>
      <ElfDialogHeader>
        <ElfDialogTitle>Edit profile</ElfDialogTitle>
        <ElfDialogDescription>Update your display name. Save when you are done.</ElfDialogDescription>
      </ElfDialogHeader>
      <ElfInput aria-label="Display name" placeholder="Display name" />
      <ElfDialogFooter>
        <ElfDialogClose as-child>
          <ElfButton variant="outline">
            Cancel
          </ElfButton>
        </ElfDialogClose>
        <ElfButton>Save</ElfButton>
      </ElfDialogFooter>
    </ElfDialogContent>
  </ElfDialog>
</template>
