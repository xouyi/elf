<script setup lang="ts">
import { ElfLabel, ElfRadioGroup, ElfRadioGroupItem } from '@xouyi/elfui'
</script>

<template>
  <div class="grid gap-6">
    <ElfRadioGroup default-value="a" aria-label="One option disabled">
      <div class="flex items-center gap-3">
        <ElfRadioGroupItem id="radio-dis-a" value="a" />
        <ElfLabel for="radio-dis-a">
          Available
        </ElfLabel>
      </div>
      <div class="flex items-center gap-3">
        <ElfRadioGroupItem id="radio-dis-b" value="b" disabled />
        <ElfLabel for="radio-dis-b">
          Sold out
        </ElfLabel>
      </div>
    </ElfRadioGroup>
    <ElfRadioGroup default-value="c" disabled aria-label="Whole group disabled">
      <div class="flex items-center gap-3">
        <ElfRadioGroupItem id="radio-dis-c" value="c" />
        <ElfLabel for="radio-dis-c">
          Locked choice
        </ElfLabel>
      </div>
      <div class="flex items-center gap-3">
        <ElfRadioGroupItem id="radio-dis-d" value="d" />
        <ElfLabel for="radio-dis-d">
          Other locked choice
        </ElfLabel>
      </div>
    </ElfRadioGroup>
  </div>
</template>
