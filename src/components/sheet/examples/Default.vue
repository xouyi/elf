<script setup lang="ts">
import { ElfButton, ElfField, ElfFieldControl, ElfInput, ElfSheet, ElfSheetClose, ElfSheetContent, ElfSheetDescription, ElfSheetFooter, ElfSheetHeader, ElfSheetTitle, ElfSheetTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfSheet>
    <ElfSheetTrigger as-child>
      <ElfButton variant="outline">
        Edit item
      </ElfButton>
    </ElfSheetTrigger>
    <ElfSheetContent>
      <ElfSheetHeader>
        <ElfSheetTitle>Edit item</ElfSheetTitle>
        <ElfSheetDescription>Change the name and quantity. Save when you are done.</ElfSheetDescription>
      </ElfSheetHeader>
      <ElfField label="Name">
        <ElfFieldControl>
          <ElfInput default-value="Swerve module" />
        </ElfFieldControl>
      </ElfField>
      <ElfField label="Quantity">
        <ElfFieldControl>
          <ElfInput type="number" default-value="4" />
        </ElfFieldControl>
      </ElfField>
      <ElfSheetFooter>
        <ElfSheetClose as-child>
          <ElfButton variant="outline">
            Cancel
          </ElfButton>
        </ElfSheetClose>
        <ElfButton>Save</ElfButton>
      </ElfSheetFooter>
    </ElfSheetContent>
  </ElfSheet>
</template>
