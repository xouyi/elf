<script setup lang="ts">
import { createDataTableColumnHelper, ElfButton, ElfDataTable } from '@xouyi/elfui'
import { ref } from 'vue'

interface Match {
  id: string
  event: string
  opponent: string
  score: number
  result: string
}

const matches: Match[] = [
  { id: 'Q12', event: 'Istanbul Regional', opponent: 'Team 6328', score: 142, result: 'Won' },
  { id: 'Q18', event: 'Istanbul Regional', opponent: 'Team 254', score: 118, result: 'Lost' },
  { id: 'Q24', event: 'Istanbul Regional', opponent: 'Team 1678', score: 131, result: 'Won' },
  { id: 'Q31', event: 'Istanbul Regional', opponent: 'Team 2910', score: 125, result: 'Won' },
  { id: 'P2', event: 'Playoffs', opponent: 'Team 118', score: 99, result: 'Lost' },
  { id: 'P5', event: 'Playoffs', opponent: 'Team 1114', score: 150, result: 'Won' },
]

const col = createDataTableColumnHelper<Match>()
const columns = [
  col.accessor('id', { header: 'Match' }),
  col.accessor('event', { header: 'Event' }),
  col.accessor('opponent', { header: 'Opponent' }),
  col.accessor('result', { header: 'Result' }),
  col.accessor('score', { header: 'Score' }),
]

const search = ref('')
const visibility = ref<Record<string, boolean>>({ event: false })
</script>

<template>
  <ElfDataTable
    v-model:global-filter="search"
    v-model:column-visibility="visibility"
    caption="Match results"
    :columns="columns"
    :data="matches"
    row-key="id"
    searchable
    column-toggle
  >
    <template #actions>
      <ElfButton variant="outline" @click="search = 'Won'">
        Wins only
      </ElfButton>
    </template>
  </ElfDataTable>
</template>
