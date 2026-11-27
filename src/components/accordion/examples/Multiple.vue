<script setup lang="ts">
import { ElfAccordion, ElfAccordionContent, ElfAccordionItem, ElfAccordionTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfAccordion type="multiple" :default-value="['build', 'code']" class="w-full max-w-lg">
    <ElfAccordionItem value="build">
      <ElfAccordionTrigger>Build</ElfAccordionTrigger>
      <ElfAccordionContent>Chassis, mechanisms and wiring.</ElfAccordionContent>
    </ElfAccordionItem>
    <ElfAccordionItem value="code">
      <ElfAccordionTrigger>Code</ElfAccordionTrigger>
      <ElfAccordionContent>Autonomous routines and vision.</ElfAccordionContent>
    </ElfAccordionItem>
    <ElfAccordionItem value="outreach">
      <ElfAccordionTrigger>Outreach</ElfAccordionTrigger>
      <ElfAccordionContent>Workshops, sponsors and social media.</ElfAccordionContent>
    </ElfAccordionItem>
  </ElfAccordion>
</template>
