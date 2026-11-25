<script setup lang="ts">
import { ElfButton, ElfSkeleton, ElfVisuallyHidden } from '@elf/ui'
import { ref } from 'vue'

const loading = ref(true)
</script>

<template>
  <div class="grid w-72 gap-3">
    <div :aria-busy="loading" class="grid gap-2">
      <template v-if="loading">
        <ElfVisuallyHidden role="status">
          Loading profile
        </ElfVisuallyHidden>
        <ElfSkeleton class="h-5 w-40" />
        <ElfSkeleton class="h-4 w-56" />
      </template>
      <template v-else>
        <h4 class="text-sm leading-none font-medium">
          Ayşe Demir
        </h4>
        <p class="text-sm text-muted-foreground">
          Team captain, Istanbul
        </p>
      </template>
    </div>
    <ElfButton variant="outline" size="sm" class="w-fit" @click="loading = !loading">
      {{ loading ? 'Show loaded content' : 'Show loading state' }}
    </ElfButton>
  </div>
</template>
