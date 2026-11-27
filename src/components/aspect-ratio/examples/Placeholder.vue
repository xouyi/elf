<script setup lang="ts">
import { ElfAspectRatio } from '@xouyi/elfui'
import { ImageOff } from '@lucide/vue'
</script>

<template>
  <div class="w-40">
    <ElfAspectRatio :ratio="3 / 4">
      <div role="img" aria-label="No photo available" class="flex size-full items-center justify-center text-muted-foreground">
        <ImageOff class="size-6" aria-hidden="true" />
      </div>
    </ElfAspectRatio>
  </div>
</template>
