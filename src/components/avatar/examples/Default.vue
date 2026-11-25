<script setup lang="ts">
import { ElfAvatar, ElfAvatarFallback, ElfAvatarImage } from '@xouyi/elfui'

// A self-contained image so the example needs no network.
const photo = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#7c5cd6"/><circle cx="32" cy="26" r="11" fill="#e9e3ff"/><path d="M10 64c2-16 12-22 22-22s20 6 22 22z" fill="#e9e3ff"/></svg>')}`
</script>

<template>
  <div class="flex items-center gap-4">
    <ElfAvatar>
      <ElfAvatarImage :src="photo" alt="Ayşe Demir" />
      <ElfAvatarFallback name="Ayşe Demir" />
    </ElfAvatar>
    <ElfAvatar>
      <!-- Not an image: the fallback is shown when the source fails to load. -->
      <ElfAvatarImage src="data:image/png;base64,broken" alt="Mehmet Kaya" />
      <ElfAvatarFallback name="Mehmet Kaya" />
    </ElfAvatar>
  </div>
</template>
