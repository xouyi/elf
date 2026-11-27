<script setup lang="ts">
import { ElfButton, useToast } from '@xouyi/elfui'

const { toast } = useToast()

function upload(ok: boolean) {
  const task = new Promise<string>((resolve, reject) => {
    setTimeout(() => (ok ? resolve('match-12.csv') : reject(new Error('Network error'))), 1500)
  })
  toast.promise(task, {
    loading: 'Uploading scouting data',
    success: name => `${name} uploaded`,
    error: 'Upload failed',
  }).catch(() => {})
}
</script>

<template>
  <div class="flex gap-2">
    <ElfButton variant="outline" @click="upload(true)">
      Upload
    </ElfButton>
    <ElfButton variant="outline" @click="upload(false)">
      Upload and fail
    </ElfButton>
  </div>
</template>
