<script setup lang="ts">
import { ElfButton, ElfCollapsible, ElfCollapsibleContent, ElfCollapsibleTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfCollapsible disabled class="w-full max-w-sm space-y-2">
    <ElfCollapsibleTrigger as-child>
      <ElfButton variant="outline">
        Advanced settings (locked)
      </ElfButton>
    </ElfCollapsibleTrigger>
    <ElfCollapsibleContent class="rounded-md border px-4 py-3 text-sm">
      Not reachable while disabled.
    </ElfCollapsibleContent>
  </ElfCollapsible>
</template>
