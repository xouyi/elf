<script setup lang="ts">
import { Plus } from '@lucide/vue'

const members = ref([
  { name: 'Elif Demir', role: 'Programming', status: 'Active' },
  { name: 'Mert Kaya', role: 'Mechanical', status: 'Active' },
  { name: 'Zeynep Aydin', role: 'Outreach', status: 'On leave' },
])

const open = ref(false)
const form = reactive({ name: '', role: '' })
const submitted = ref(false)
const invalid = computed(() => submitted.value && !form.name.trim())

function save() {
  submitted.value = true
  if (!form.name.trim()) return
  members.value.push({ name: form.name.trim(), role: form.role.trim() || 'Unassigned', status: 'Active' })
  Object.assign(form, { name: '', role: '' })
  submitted.value = false
  open.value = false
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-semibold">Members</h1>
        <p class="text-sm text-muted-foreground">A form inside a dialog with inline validation.</p>
      </div>

      <ElfDialog v-model:open="open">
        <ElfDialogTrigger as-child><ElfButton><Plus /> Add member</ElfButton></ElfDialogTrigger>
        <ElfDialogContent>
          <form class="grid gap-4" novalidate @submit.prevent="save">
            <ElfDialogHeader>
              <ElfDialogTitle>Add member</ElfDialogTitle>
              <ElfDialogDescription>New members appear in the roster immediately.</ElfDialogDescription>
            </ElfDialogHeader>
            <div class="grid gap-1.5">
              <label for="member-name" class="text-sm font-medium">Name</label>
              <ElfInput
                id="member-name"
                v-model="form.name"
                :aria-invalid="invalid"
                :aria-describedby="invalid ? 'member-name-error' : undefined"
                placeholder="Full name"
              />
              <p v-if="invalid" id="member-name-error" class="text-sm text-destructive-foreground">Name is required.</p>
            </div>
            <div class="grid gap-1.5">
              <label for="member-role" class="text-sm font-medium">Role</label>
              <ElfInput id="member-role" v-model="form.role" placeholder="Programming" />
            </div>
            <ElfDialogFooter>
              <ElfDialogClose as-child><ElfButton type="button" variant="outline">Cancel</ElfButton></ElfDialogClose>
              <ElfButton type="submit">Save</ElfButton>
            </ElfDialogFooter>
          </form>
        </ElfDialogContent>
      </ElfDialog>
    </div>

    <ElfCard>
      <ElfCardContent>
        <ul class="divide-y">
          <li v-for="m in members" :key="m.name" class="flex items-center justify-between gap-3 py-3">
            <div>
              <p class="font-medium">{{ m.name }}</p>
              <p class="text-sm text-muted-foreground">{{ m.role }}</p>
            </div>
            <ElfBadge :variant="m.status === 'Active' ? 'success' : 'warning'">{{ m.status }}</ElfBadge>
          </li>
        </ul>
      </ElfCardContent>
    </ElfCard>
  </div>
</template>
