<script setup lang="ts">
import { ElfPagination, ElfPaginationContent, ElfPaginationEllipsis, ElfPaginationItem, ElfPaginationNext, ElfPaginationPrev } from '@xouyi/elfui'
import { ref } from 'vue'

const page = ref(5)
</script>

<template>
  <div class="grid w-full gap-3">
    <ElfPagination v-model:page="page" :total="100" :items-per-page="10">
      <ElfPaginationContent v-slot="{ items }">
        <ElfPaginationPrev />
        <template v-for="(item, i) in items" :key="i">
          <ElfPaginationItem v-if="item.type === 'page'" :value="item.value" />
          <ElfPaginationEllipsis v-else />
        </template>
        <ElfPaginationNext />
      </ElfPaginationContent>
    </ElfPagination>
    <p class="text-center text-sm text-muted-foreground">
      Page {{ page }} of 10
    </p>
  </div>
</template>
