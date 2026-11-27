<script setup lang="ts">
import { ElfStepper, ElfStepperIndicator, ElfStepperItem, ElfStepperSeparator, ElfStepperTitle, ElfStepperTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfStepper :linear="false" aria-label="Sections" class="w-full max-w-lg">
    <ElfStepperItem :step="1">
      <ElfStepperTrigger>
        <ElfStepperIndicator />
        <ElfStepperTitle>Basics</ElfStepperTitle>
      </ElfStepperTrigger>
      <ElfStepperSeparator />
    </ElfStepperItem>
    <ElfStepperItem :step="2">
      <ElfStepperTrigger>
        <ElfStepperIndicator />
        <ElfStepperTitle>Media</ElfStepperTitle>
      </ElfStepperTrigger>
      <ElfStepperSeparator />
    </ElfStepperItem>
    <ElfStepperItem :step="3">
      <ElfStepperTrigger>
        <ElfStepperIndicator />
        <ElfStepperTitle>Publish</ElfStepperTitle>
      </ElfStepperTrigger>
    </ElfStepperItem>
  </ElfStepper>
</template>
