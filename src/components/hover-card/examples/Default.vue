<script setup lang="ts">
import { ElfAvatar, ElfAvatarFallback, ElfHoverCard, ElfHoverCardContent, ElfHoverCardTrigger } from '@xouyi/elfui'
</script>

<template>
  <p class="text-sm">
    Reviewed by
    <ElfHoverCard>
      <ElfHoverCardTrigger as-child>
        <a href="#ayse" class="font-medium text-primary underline underline-offset-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50">Ayşe Demir</a>
      </ElfHoverCardTrigger>
      <ElfHoverCardContent>
        <div class="flex gap-3">
          <ElfAvatar>
            <ElfAvatarFallback name="Ayşe Demir" />
          </ElfAvatar>
          <div class="grid gap-1">
            <p class="text-sm font-medium">
              Ayşe Demir
            </p>
            <p class="text-sm text-muted-foreground">
              Software lead. Joined in 2025.
            </p>
          </div>
        </div>
      </ElfHoverCardContent>
    </ElfHoverCard>
    on Friday.
  </p>
</template>
