<script setup lang="ts">
import {
  ElfSelect,
  ElfSelectContent,
  ElfSelectGroup,
  ElfSelectItem,
  ElfSelectLabel,
  ElfSelectSeparator,
  ElfSelectTrigger,
  ElfSelectValue,
} from '@xouyi/elfui'
</script>

<template>
  <ElfSelect default-value="istanbul">
    <ElfSelectTrigger class="w-64" aria-label="Event location">
      <ElfSelectValue placeholder="Choose an event" />
    </ElfSelectTrigger>
    <ElfSelectContent>
      <ElfSelectGroup>
        <ElfSelectLabel>Turkey</ElfSelectLabel>
        <ElfSelectItem value="istanbul">
          Istanbul Regional
        </ElfSelectItem>
        <ElfSelectItem value="ankara">
          Ankara Regional
        </ElfSelectItem>
      </ElfSelectGroup>
      <ElfSelectSeparator />
      <ElfSelectGroup>
        <ElfSelectLabel>Europe</ElfSelectLabel>
        <ElfSelectItem value="rotterdam">
          Rotterdam District
        </ElfSelectItem>
        <ElfSelectItem value="lyon" disabled>
          Lyon District (full)
        </ElfSelectItem>
      </ElfSelectGroup>
    </ElfSelectContent>
  </ElfSelect>
</template>
