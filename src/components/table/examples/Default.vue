<script setup lang="ts">
import { ElfBadge, ElfTable, ElfTableBody, ElfTableCell, ElfTableFooter, ElfTableHead, ElfTableHeader, ElfTableRow } from '@xouyi/elfui'

const matches = [
  { id: 'Q12', opponent: 'Team 6328', score: 142, result: 'Won' },
  { id: 'Q18', opponent: 'Team 254', score: 118, result: 'Lost' },
  { id: 'Q24', opponent: 'Team 1678', score: 131, result: 'Won' },
]
</script>

<template>
  <ElfTable caption="Qualification matches" class="min-w-[28rem]">
    <ElfTableHeader>
      <ElfTableRow>
        <ElfTableHead>Match</ElfTableHead>
        <ElfTableHead>Opponent</ElfTableHead>
        <ElfTableHead>Result</ElfTableHead>
        <ElfTableHead class="text-right">
          Score
        </ElfTableHead>
      </ElfTableRow>
    </ElfTableHeader>
    <ElfTableBody>
      <ElfTableRow v-for="m in matches" :key="m.id">
        <ElfTableCell class="font-medium">
          {{ m.id }}
        </ElfTableCell>
        <ElfTableCell>{{ m.opponent }}</ElfTableCell>
        <ElfTableCell>
          <ElfBadge :variant="m.result === 'Won' ? 'success' : 'secondary'">
            {{ m.result }}
          </ElfBadge>
        </ElfTableCell>
        <ElfTableCell class="text-right">
          {{ m.score }}
        </ElfTableCell>
      </ElfTableRow>
    </ElfTableBody>
    <ElfTableFooter>
      <ElfTableRow>
        <ElfTableCell :colspan="3">
          Total points
        </ElfTableCell>
        <ElfTableCell class="text-right">
          391
        </ElfTableCell>
      </ElfTableRow>
    </ElfTableFooter>
  </ElfTable>
</template>
