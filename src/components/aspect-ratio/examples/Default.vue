<script setup lang="ts">
import { ElfAspectRatio } from '@xouyi/elfui'

// A self-contained image so the example needs no network.
const photo = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice"><rect width="160" height="90" fill="#7c5cd6"/><circle cx="118" cy="26" r="12" fill="#e9e3ff"/><path d="M0 90l44-44 30 30 22-18 64 32z" fill="#4b2fa0"/></svg>')}`
</script>

<template>
  <div class="w-full max-w-sm">
    <ElfAspectRatio :ratio="16 / 9">
      <img :src="photo" alt="Purple hills under a pale sun">
    </ElfAspectRatio>
  </div>
</template>
