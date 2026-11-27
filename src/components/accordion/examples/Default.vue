<script setup lang="ts">
import { ElfAccordion, ElfAccordionContent, ElfAccordionItem, ElfAccordionTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfAccordion type="single" collapsible default-value="rules" class="w-full max-w-lg">
    <ElfAccordionItem value="rules">
      <ElfAccordionTrigger>Who can join the team?</ElfAccordionTrigger>
      <ElfAccordionContent>Any high-school student in Istanbul can apply. Members are provisioned by an admin.</ElfAccordionContent>
    </ElfAccordionItem>
    <ElfAccordionItem value="meetings">
      <ElfAccordionTrigger>When do we meet?</ElfAccordionTrigger>
      <ElfAccordionContent>Tuesday and Thursday evenings, plus Saturdays during build season.</ElfAccordionContent>
    </ElfAccordionItem>
    <ElfAccordionItem value="dues">
      <ElfAccordionTrigger>Is there a fee?</ElfAccordionTrigger>
      <ElfAccordionContent>No. Sponsors and fundraisers cover registration and parts.</ElfAccordionContent>
    </ElfAccordionItem>
  </ElfAccordion>
</template>
