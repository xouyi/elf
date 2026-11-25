<script setup lang="ts">
import { ElfAvatar, ElfAvatarFallback } from '@xouyi/elfui'
import { User } from '@lucide/vue'
</script>

<template>
  <div class="flex items-center gap-6">
    <div class="flex items-center gap-3">
      <ElfAvatar>
        <ElfAvatarFallback name="Zeynep Arslan" />
      </ElfAvatar>
      <div class="text-sm">
        <p class="font-medium">
          Zeynep Arslan
        </p>
        <p class="text-muted-foreground">
          Software lead
        </p>
      </div>
    </div>
    <ElfAvatar label="Unknown member">
      <ElfAvatarFallback>
        <User class="size-4" />
      </ElfAvatarFallback>
    </ElfAvatar>
  </div>
</template>
