<script setup lang="ts">
import { ElfButton, ElfStepper, ElfStepperIndicator, ElfStepperItem, ElfStepperSeparator, ElfStepperTitle, ElfStepperTrigger } from '@xouyi/elfui'
import { ref } from 'vue'

const step = ref(1)
</script>

<template>
  <div class="w-full max-w-lg space-y-4">
    <p class="text-sm text-muted-foreground">
      step = {{ step }}
    </p>
    <ElfStepper v-model="step" aria-label="Onboarding">
      <ElfStepperItem :step="1">
        <ElfStepperTrigger>
          <ElfStepperIndicator />
          <ElfStepperTitle>Welcome</ElfStepperTitle>
        </ElfStepperTrigger>
        <ElfStepperSeparator />
      </ElfStepperItem>
      <ElfStepperItem :step="2">
        <ElfStepperTrigger>
          <ElfStepperIndicator />
          <ElfStepperTitle>Team</ElfStepperTitle>
        </ElfStepperTrigger>
        <ElfStepperSeparator />
      </ElfStepperItem>
      <ElfStepperItem :step="3">
        <ElfStepperTrigger>
          <ElfStepperIndicator />
          <ElfStepperTitle>Done</ElfStepperTitle>
        </ElfStepperTrigger>
      </ElfStepperItem>
    </ElfStepper>
    <ElfButton variant="outline" size="sm" @click="step = 3">
      Jump to the end
    </ElfButton>
  </div>
</template>
