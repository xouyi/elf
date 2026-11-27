<script setup lang="ts">
import { ElfTable, ElfTableBody, ElfTableCell, ElfTableHead, ElfTableHeader, ElfTableRow } from '@xouyi/elfui'

const densities = ['compact', 'default', 'comfortable'] as const
const rows = [
  { part: 'Swerve module', stock: 8 },
  { part: 'Battery 12 V', stock: 14 },
]
</script>

<template>
  <div class="grid gap-6">
    <ElfTable v-for="d in densities" :key="d" :caption="`Parts, ${d} density`" :density="d">
      <ElfTableHeader>
        <ElfTableRow>
          <ElfTableHead>Part</ElfTableHead>
          <ElfTableHead class="text-right">
            In stock
          </ElfTableHead>
        </ElfTableRow>
      </ElfTableHeader>
      <ElfTableBody>
        <ElfTableRow v-for="r in rows" :key="r.part">
          <ElfTableCell>{{ r.part }}</ElfTableCell>
          <ElfTableCell class="text-right">
            {{ r.stock }}
          </ElfTableCell>
        </ElfTableRow>
      </ElfTableBody>
    </ElfTable>
  </div>
</template>
