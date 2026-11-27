<script setup lang="ts">
import { ElfButton, ElfSheet, ElfSheetClose, ElfSheetContent, ElfSheetDescription, ElfSheetFooter, ElfSheetHeader, ElfSheetTitle, ElfSheetTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfSheet>
    <ElfSheetTrigger as-child>
      <ElfButton variant="outline">
        Set quantity
      </ElfButton>
    </ElfSheetTrigger>
    <!-- The bottom sheet spans the screen and keeps its content above the home indicator (safe-area padding). -->
    <ElfSheetContent side="bottom">
      <ElfSheetHeader>
        <ElfSheetTitle>Set quantity</ElfSheetTitle>
        <ElfSheetDescription>How many units are on the shelf?</ElfSheetDescription>
      </ElfSheetHeader>
      <div class="flex gap-2">
        <ElfSheetClose v-for="n in [1, 2, 5, 10]" :key="n" as-child>
          <ElfButton variant="secondary" class="h-10 flex-1">
            {{ n }}
          </ElfButton>
        </ElfSheetClose>
      </div>
      <ElfSheetFooter>
        <ElfSheetClose as-child>
          <ElfButton variant="outline" class="max-sm:h-10">
            Cancel
          </ElfButton>
        </ElfSheetClose>
      </ElfSheetFooter>
    </ElfSheetContent>
  </ElfSheet>
</template>
