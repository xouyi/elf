<script setup lang="ts">
import { ElfHoverCard, ElfHoverCardContent, ElfHoverCardTrigger } from '@xouyi/elfui'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ElfHoverCard v-model:open="open">
      <ElfHoverCardTrigger as-child>
        <a href="#team" class="text-sm text-primary underline underline-offset-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50">Team Novatron</a>
      </ElfHoverCardTrigger>
      <ElfHoverCardContent class="w-64">
        <p class="text-sm">
          FRC Team 10202, Istanbul.
        </p>
      </ElfHoverCardContent>
    </ElfHoverCard>
    <p class="text-sm text-muted-foreground">
      open = {{ open }}
    </p>
  </div>
</template>
