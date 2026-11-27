<script setup lang="ts">
import { ElfScrollArea } from '@xouyi/elfui'

const rows = Array.from({ length: 20 }, (_, r) => r + 1)
const cols = Array.from({ length: 12 }, (_, c) => c + 1)
</script>

<template>
  <ElfScrollArea orientation="both" label="Score grid" class="h-56 w-full max-w-md rounded-md border">
    <table class="text-sm">
      <caption class="sr-only">
        Match scores by round and station
      </caption>
      <thead>
        <tr>
          <th scope="col" class="px-3 py-2 text-left font-medium whitespace-nowrap">
            Round
          </th>
          <th v-for="c in cols" :key="c" scope="col" class="px-3 py-2 text-left font-medium whitespace-nowrap">
            Station {{ c }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r" class="border-t">
          <th scope="row" class="px-3 py-2 text-left font-medium">
            {{ r }}
          </th>
          <td v-for="c in cols" :key="c" class="px-3 py-2 text-muted-foreground">
            {{ r * c }}
          </td>
        </tr>
      </tbody>
    </table>
  </ElfScrollArea>
</template>
