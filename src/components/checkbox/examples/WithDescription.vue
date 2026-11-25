<script setup lang="ts">
import { ElfCheckbox, ElfLabel } from '@xouyi/elfui'
import { ref } from 'vue'

const digest = ref<boolean | 'indeterminate'>(true)
</script>

<template>
  <div class="flex w-80 items-start gap-3">
    <ElfCheckbox id="checkbox-digest" v-model="digest" aria-describedby="checkbox-digest-help" class="mt-0.5" />
    <div class="grid gap-1.5">
      <ElfLabel for="checkbox-digest">
        Weekly digest
      </ElfLabel>
      <p id="checkbox-digest-help" class="text-sm text-muted-foreground">
        One email every Monday with scheduled practice sessions and open tasks.
      </p>
    </div>
  </div>
</template>
