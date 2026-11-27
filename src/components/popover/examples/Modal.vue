<script setup lang="ts">
import { ElfButton, ElfPopover, ElfPopoverContent, ElfPopoverTrigger } from '@xouyi/elfui'
</script>

<template>
  <!-- modal traps focus and makes the page behind inert, like a dialog anchored to its trigger. -->
  <ElfPopover modal>
    <ElfPopoverTrigger as-child>
      <ElfButton variant="outline">
        Modal popover
      </ElfButton>
    </ElfPopoverTrigger>
    <ElfPopoverContent class="grid gap-3">
      <p class="text-sm">
        Focus stays inside until you press Escape or choose an action.
      </p>
      <ElfButton size="sm" variant="secondary">
        Confirm
      </ElfButton>
    </ElfPopoverContent>
  </ElfPopover>
</template>
