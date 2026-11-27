<script setup lang="ts">
import { ElfButton, ElfInput, ElfLabel, ElfPopover, ElfPopoverContent, ElfPopoverTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfPopover>
    <ElfPopoverTrigger as-child>
      <ElfButton variant="outline">
        Rename item
      </ElfButton>
    </ElfPopoverTrigger>
    <ElfPopoverContent>
      <div class="grid gap-3">
        <p class="text-sm font-medium">
          Rename item
        </p>
        <div class="grid gap-2">
          <ElfLabel for="popover-name">
            Name
          </ElfLabel>
          <ElfInput id="popover-name" default-value="Battery 12V" />
        </div>
      </div>
    </ElfPopoverContent>
  </ElfPopover>
</template>
