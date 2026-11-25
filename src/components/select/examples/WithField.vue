<script setup lang="ts">
import { ElfButton, ElfField, ElfFieldControl, ElfSelect, ElfSelectContent, ElfSelectItem, ElfSelectTrigger, ElfSelectValue } from '@xouyi/elfui'
import { ref } from 'vue'

const role = ref('')
const submitted = ref(false)
const sent = ref(false)

function submit() {
  submitted.value = true
  sent.value = role.value !== ''
}
</script>

<template>
  <form class="grid w-80 gap-5" novalidate @submit.prevent="submit">
    <ElfField
      label="Role"
      description="Pick the role you will fill at events."
      required
      :error="submitted && !role ? 'Choose a role.' : ''"
    >
      <ElfSelect v-model="role">
        <ElfFieldControl>
          <ElfSelectTrigger>
            <ElfSelectValue placeholder="Select a role" />
          </ElfSelectTrigger>
        </ElfFieldControl>
        <ElfSelectContent>
          <ElfSelectItem value="driver">
            Driver
          </ElfSelectItem>
          <ElfSelectItem value="operator">
            Operator
          </ElfSelectItem>
          <ElfSelectItem value="coach">
            Human player
          </ElfSelectItem>
          <ElfSelectItem value="scout">
            Scout
          </ElfSelectItem>
        </ElfSelectContent>
      </ElfSelect>
    </ElfField>
    <ElfButton type="submit" class="w-fit">
      Save role
    </ElfButton>
    <p v-if="sent" role="status" class="text-sm text-muted-foreground">
      Role saved: {{ role }}.
    </p>
  </form>
</template>
