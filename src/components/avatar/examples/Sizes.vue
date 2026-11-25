<script setup lang="ts">
import { ElfAvatar, ElfAvatarFallback } from '@xouyi/elfui'

const sizes = ['sm', 'default', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex items-end gap-4">
    <ElfAvatar v-for="size in sizes" :key="size" :size="size" :label="`Avatar, ${size} size`">
      <ElfAvatarFallback name="Novatron Robotics" />
    </ElfAvatar>
  </div>
</template>
