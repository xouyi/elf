<script setup lang="ts">
import { ElfTable, ElfTableBody, ElfTableCell, ElfTableHead, ElfTableHeader, ElfTableRow } from '@xouyi/elfui'

const rows = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, event: `Event log entry ${i + 1}`, level: i % 4 === 0 ? 'Warning' : 'Info' }))
</script>

<template>
  <ElfTable caption="Event log" sticky-header container-class="max-h-60">
    <ElfTableHeader>
      <ElfTableRow>
        <ElfTableHead>#</ElfTableHead>
        <ElfTableHead>Event</ElfTableHead>
        <ElfTableHead>Level</ElfTableHead>
      </ElfTableRow>
    </ElfTableHeader>
    <ElfTableBody>
      <ElfTableRow v-for="r in rows" :key="r.id">
        <ElfTableCell>{{ r.id }}</ElfTableCell>
        <ElfTableCell>{{ r.event }}</ElfTableCell>
        <ElfTableCell>{{ r.level }}</ElfTableCell>
      </ElfTableRow>
    </ElfTableBody>
  </ElfTable>
</template>
