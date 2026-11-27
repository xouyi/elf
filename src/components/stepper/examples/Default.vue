<script setup lang="ts">
import { ElfButton, ElfStepper, ElfStepperIndicator, ElfStepperItem, ElfStepperSeparator, ElfStepperTitle, ElfStepperTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfStepper aria-label="New item" :default-value="2" class="w-full max-w-lg flex-col gap-6">
    <template #default="{ nextStep, prevStep, hasNext, hasPrev }">
      <div class="flex w-full">
        <ElfStepperItem :step="1">
          <ElfStepperTrigger>
            <ElfStepperIndicator />
            <ElfStepperTitle>Photo</ElfStepperTitle>
          </ElfStepperTrigger>
          <ElfStepperSeparator />
        </ElfStepperItem>
        <ElfStepperItem :step="2">
          <ElfStepperTrigger>
            <ElfStepperIndicator />
            <ElfStepperTitle>Details</ElfStepperTitle>
          </ElfStepperTrigger>
          <ElfStepperSeparator />
        </ElfStepperItem>
        <ElfStepperItem :step="3">
          <ElfStepperTrigger>
            <ElfStepperIndicator />
            <ElfStepperTitle>Review</ElfStepperTitle>
          </ElfStepperTrigger>
        </ElfStepperItem>
      </div>
      <div class="flex gap-2">
        <ElfButton variant="outline" :disabled="!hasPrev()" @click="prevStep()">
          Back
        </ElfButton>
        <ElfButton :disabled="!hasNext()" @click="nextStep()">
          Next
        </ElfButton>
      </div>
    </template>
  </ElfStepper>
</template>
