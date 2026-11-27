<script setup lang="ts">
import { ElfTable, ElfTableBody, ElfTableCell, ElfTableHead, ElfTableHeader, ElfTableRow } from '@xouyi/elfui'
</script>

<template>
  <div class="grid gap-2">
    <h3 class="text-sm font-medium">
      Battery log
    </h3>
    <ElfTable caption="Battery log" caption-hidden>
      <ElfTableHeader>
        <ElfTableRow>
          <ElfTableHead>Battery</ElfTableHead>
          <ElfTableHead class="text-right">
            Voltage
          </ElfTableHead>
        </ElfTableRow>
      </ElfTableHeader>
      <ElfTableBody>
        <ElfTableRow selected>
          <ElfTableCell>B-01</ElfTableCell>
          <ElfTableCell class="text-right">
            12.4 V
          </ElfTableCell>
        </ElfTableRow>
        <ElfTableRow>
          <ElfTableCell>B-02</ElfTableCell>
          <ElfTableCell class="text-right">
            12.1 V
          </ElfTableCell>
        </ElfTableRow>
      </ElfTableBody>
    </ElfTable>
  </div>
</template>
