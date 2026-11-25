<script setup lang="ts">
import { ElfField, ElfFieldControl, ElfInput } from '@elf/ui'
</script>

<template>
  <ElfField label="Team number" description="The FRC team you are registering for." required class="w-80">
    <ElfFieldControl>
      <ElfInput inputmode="numeric" model-value="10202" />
    </ElfFieldControl>
  </ElfField>
</template>
