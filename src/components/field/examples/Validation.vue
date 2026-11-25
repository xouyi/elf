<script setup lang="ts">
import { ElfButton, ElfField, ElfFieldControl, ElfInput, ElfTextarea } from '@elf/ui'
import { computed, reactive, ref } from 'vue'

const form = reactive({ email: '', message: '' })
const touched = ref(false)
const submitted = ref(false)

const errors = computed(() => ({
  email: /^\S[^\s@]*@\S+\.\S+$/.test(form.email) ? '' : 'Enter a valid email address.',
  message: form.message.trim().length >= 10 ? '' : 'Write at least 10 characters.',
}))

function submit() {
  touched.value = true
  submitted.value = !errors.value.email && !errors.value.message
}
</script>

<template>
  <form class="grid w-80 gap-5" novalidate @submit.prevent="submit">
    <ElfField label="Email" required :error="touched ? errors.email : ''">
      <ElfFieldControl>
        <ElfInput v-model="form.email" type="email" placeholder="you@example.com" />
      </ElfFieldControl>
    </ElfField>
    <ElfField label="Message" description="At least 10 characters." required :error="touched ? errors.message : ''">
      <ElfFieldControl>
        <ElfTextarea v-model="form.message" />
      </ElfFieldControl>
    </ElfField>
    <ElfButton type="submit" class="w-fit">
      Send
    </ElfButton>
    <p v-if="submitted" role="status" class="text-sm text-muted-foreground">
      Message sent.
    </p>
  </form>
</template>
