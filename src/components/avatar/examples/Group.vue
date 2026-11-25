<script setup lang="ts">
import { ElfAvatar, ElfAvatarFallback, ElfAvatarGroup } from '@xouyi/elfui'

const members = ['Ayşe Demir', 'Mehmet Kaya', 'Zeynep Arslan', 'Can Yıldız']
</script>

<template>
  <ElfAvatarGroup aria-label="Software subteam, 7 members">
    <ElfAvatar v-for="name in members" :key="name">
      <ElfAvatarFallback :name="name" />
    </ElfAvatar>
    <ElfAvatar>
      <ElfAvatarFallback>+3</ElfAvatarFallback>
    </ElfAvatar>
  </ElfAvatarGroup>
</template>
