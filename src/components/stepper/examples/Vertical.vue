<script setup lang="ts">
import { ElfStepper, ElfStepperDescription, ElfStepperIndicator, ElfStepperItem, ElfStepperSeparator, ElfStepperTitle, ElfStepperTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfStepper aria-label="Provisioning" orientation="vertical" :default-value="2" class="w-full max-w-xs gap-0">
    <ElfStepperItem :step="1" class="gap-0">
      <ElfStepperTrigger>
        <ElfStepperIndicator />
        <ElfStepperTitle>Account</ElfStepperTitle>
      </ElfStepperTrigger>
      <div class="flex">
        <ElfStepperSeparator />
        <ElfStepperDescription class="py-2 pl-6">
          Username and password
        </ElfStepperDescription>
      </div>
    </ElfStepperItem>
    <ElfStepperItem :step="2" class="gap-0">
      <ElfStepperTrigger>
        <ElfStepperIndicator />
        <ElfStepperTitle>Roles</ElfStepperTitle>
      </ElfStepperTrigger>
      <div class="flex">
        <ElfStepperSeparator />
        <ElfStepperDescription class="py-2 pl-6">
          Choose what they can do
        </ElfStepperDescription>
      </div>
    </ElfStepperItem>
    <ElfStepperItem :step="3" class="gap-0">
      <ElfStepperTrigger>
        <ElfStepperIndicator />
        <ElfStepperTitle>Confirm</ElfStepperTitle>
      </ElfStepperTrigger>
      <ElfStepperDescription class="py-2 pl-10">
        Review and create
      </ElfStepperDescription>
    </ElfStepperItem>
  </ElfStepper>
</template>
