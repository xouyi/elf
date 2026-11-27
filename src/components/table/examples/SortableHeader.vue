<script setup lang="ts">
import type { TableSort } from '@xouyi/elfui'
import { ArrowDown, ArrowUp, ChevronsUpDown } from '@lucide/vue'
import { computed, ref } from 'vue'
import { ElfButton, ElfTable, ElfTableBody, ElfTableCell, ElfTableHead, ElfTableHeader, ElfTableRow } from '@xouyi/elfui'

type Key = 'name' | 'points'
const rows = [
  { name: 'Swerve drive', points: 40 },
  { name: 'Climber', points: 25 },
  { name: 'Intake', points: 18 },
]
const key = ref<Key>('name')
const asc = ref(true)

const sorted = computed(() => [...rows].sort((a, b) => {
  const d = a[key.value] > b[key.value] ? 1 : a[key.value] < b[key.value] ? -1 : 0
  return asc.value ? d : -d
}))

function sortOf(k: Key): TableSort {
  return key.value === k ? (asc.value ? 'ascending' : 'descending') : 'none'
}
function toggle(k: Key) {
  if (key.value === k) {
    asc.value = !asc.value
  }
  else {
    key.value = k
    asc.value = true
  }
}
</script>

<template>
  <ElfTable caption="Subsystems by points">
    <ElfTableHeader>
      <ElfTableRow>
        <ElfTableHead :sort="sortOf('name')">
          <ElfButton variant="ghost" size="sm" class="-ml-3" @click="toggle('name')">
            Subsystem
            <ArrowUp v-if="sortOf('name') === 'ascending'" aria-hidden="true" />
            <ArrowDown v-else-if="sortOf('name') === 'descending'" aria-hidden="true" />
            <ChevronsUpDown v-else aria-hidden="true" />
          </ElfButton>
        </ElfTableHead>
        <ElfTableHead :sort="sortOf('points')" class="text-right">
          <ElfButton variant="ghost" size="sm" class="-mr-3" @click="toggle('points')">
            Points
            <ArrowUp v-if="sortOf('points') === 'ascending'" aria-hidden="true" />
            <ArrowDown v-else-if="sortOf('points') === 'descending'" aria-hidden="true" />
            <ChevronsUpDown v-else aria-hidden="true" />
          </ElfButton>
        </ElfTableHead>
      </ElfTableRow>
    </ElfTableHeader>
    <ElfTableBody>
      <ElfTableRow v-for="r in sorted" :key="r.name">
        <ElfTableCell>{{ r.name }}</ElfTableCell>
        <ElfTableCell class="text-right">
          {{ r.points }}
        </ElfTableCell>
      </ElfTableRow>
    </ElfTableBody>
  </ElfTable>
</template>
