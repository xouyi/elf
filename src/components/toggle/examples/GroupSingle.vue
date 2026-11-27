<script setup lang="ts">
import { ElfToggleGroup, ElfToggleGroupItem } from '@xouyi/elfui'
import { ref } from 'vue'

const sort = ref('newest')
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <ElfToggleGroup v-model="sort" type="single" variant="outline" aria-label="Sort posts">
      <ElfToggleGroupItem value="newest">
        Newest
      </ElfToggleGroupItem>
      <ElfToggleGroupItem value="top">
        Top
      </ElfToggleGroupItem>
      <ElfToggleGroupItem value="unanswered">
        Unanswered
      </ElfToggleGroupItem>
    </ElfToggleGroup>
    <p class="text-sm text-muted-foreground">
      Sorted by: {{ sort || 'nothing' }}
    </p>
  </div>
</template>
