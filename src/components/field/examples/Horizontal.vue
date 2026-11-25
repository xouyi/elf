<script setup lang="ts">
import { ElfField, ElfFieldControl, ElfInput } from '@elf/ui'
</script>

<template>
  <div class="grid w-full max-w-xl gap-5">
    <ElfField label="Display name" description="Visible to other team members." orientation="horizontal">
      <ElfFieldControl>
        <ElfInput model-value="Ayşe Demir" />
      </ElfFieldControl>
    </ElfField>
    <ElfField label="Member ID" description="Assigned by the team lead." orientation="horizontal" disabled>
      <ElfFieldControl>
        <ElfInput model-value="FRC-10202-014" />
      </ElfFieldControl>
    </ElfField>
  </div>
</template>
