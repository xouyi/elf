<script setup lang="ts">
import { ElfSelect, ElfSelectContent, ElfSelectItem, ElfSelectTrigger, ElfSelectValue } from '@xouyi/elfui'
</script>

<template>
  <div class="grid w-64 gap-4">
    <ElfSelect default-value="a">
      <ElfSelectTrigger size="sm" aria-label="Small select">
        <ElfSelectValue />
      </ElfSelectTrigger>
      <ElfSelectContent>
        <ElfSelectItem value="a">
          Small trigger
        </ElfSelectItem>
      </ElfSelectContent>
    </ElfSelect>
    <ElfSelect>
      <ElfSelectTrigger invalid aria-label="Invalid select">
        <ElfSelectValue placeholder="Invalid select" />
      </ElfSelectTrigger>
      <ElfSelectContent>
        <ElfSelectItem value="a">
          Option
        </ElfSelectItem>
      </ElfSelectContent>
    </ElfSelect>
    <ElfSelect disabled default-value="a">
      <ElfSelectTrigger aria-label="Disabled select">
        <ElfSelectValue />
      </ElfSelectTrigger>
      <ElfSelectContent>
        <ElfSelectItem value="a">
          Disabled select
        </ElfSelectItem>
      </ElfSelectContent>
    </ElfSelect>
  </div>
</template>
