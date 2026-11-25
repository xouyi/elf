<script setup lang="ts">
import { ElfSpinner } from '@xouyi/elfui'
</script>

<template>
  <div class="flex w-72 flex-col items-center gap-3 border border-border p-8 text-sm text-muted-foreground">
    <ElfSpinner size="xl" class="text-primary" label="Loading the match schedule" />
    <p aria-hidden="true">
      Loading the match schedule
    </p>
  </div>
</template>
