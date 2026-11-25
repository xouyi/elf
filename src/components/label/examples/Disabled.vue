<script setup lang="ts">
import { ElfInput, ElfLabel } from '@xouyi/elfui'
</script>

<template>
  <!-- The input comes first and carries `peer`, so the label can dim itself with `peer-disabled`. -->
  <div class="flex w-72 flex-col-reverse gap-2">
    <ElfInput id="label-member-id" class="peer" disabled model-value="FRC-10202" />
    <ElfLabel for="label-member-id">
      Member ID
    </ElfLabel>
  </div>
</template>
