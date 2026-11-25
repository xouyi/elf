<script setup lang="ts">
import { ElfBadge, ElfButton, ElfCard, ElfCardAction, ElfCardContent, ElfCardDescription, ElfCardFooter, ElfCardHeader, ElfCardTitle } from '@elf/ui'
</script>

<template>
  <ElfCard class="w-full max-w-sm">
    <ElfCardHeader>
      <ElfCardTitle>Robot status</ElfCardTitle>
      <ElfCardDescription>Drivetrain diagnostics for the last match.</ElfCardDescription>
      <ElfCardAction>
        <ElfBadge variant="success">
          Ready
        </ElfBadge>
      </ElfCardAction>
    </ElfCardHeader>
    <ElfCardContent>
      <p class="text-sm">
        All swerve modules calibrated. Battery at 12.4 V.
      </p>
    </ElfCardContent>
    <ElfCardFooter class="gap-2">
      <ElfButton size="sm">
        Open log
      </ElfButton>
      <ElfButton size="sm" variant="outline">
        Dismiss
      </ElfButton>
    </ElfCardFooter>
  </ElfCard>
</template>
