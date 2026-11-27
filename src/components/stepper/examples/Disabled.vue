<script setup lang="ts">
import { ElfStepper, ElfStepperIndicator, ElfStepperItem, ElfStepperSeparator, ElfStepperTitle, ElfStepperTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfStepper :linear="false" aria-label="Checkout" class="w-full max-w-lg">
    <ElfStepperItem :step="1">
      <ElfStepperTrigger>
        <ElfStepperIndicator />
        <ElfStepperTitle>Cart</ElfStepperTitle>
      </ElfStepperTrigger>
      <ElfStepperSeparator />
    </ElfStepperItem>
    <ElfStepperItem :step="2" disabled>
      <ElfStepperTrigger>
        <ElfStepperIndicator />
        <ElfStepperTitle>Shipping</ElfStepperTitle>
      </ElfStepperTrigger>
      <ElfStepperSeparator />
    </ElfStepperItem>
    <ElfStepperItem :step="3">
      <ElfStepperTrigger>
        <ElfStepperIndicator />
        <ElfStepperTitle>Pay</ElfStepperTitle>
      </ElfStepperTrigger>
    </ElfStepperItem>
  </ElfStepper>
</template>
