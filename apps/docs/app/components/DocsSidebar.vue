<script setup lang="ts">
defineProps<{ groups: NavGroup[] }>()
const emit = defineEmits<{ navigate: [] }>()
const route = useRoute()
const isActive = (path: string) => route.path.replace(/\/$/, '') === path
</script>

<template>
  <nav aria-label="Documentation" class="grid gap-6 text-sm">
    <div v-for="group in groups" :key="group.path">
      <p class="mb-2 px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {{ group.title }}
      </p>
      <ul class="grid gap-0.5">
        <li v-for="item in group.items" :key="item.path">
          <NuxtLink
            :to="item.path"
            class="block rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground aria-[current=page]:bg-accent aria-[current=page]:font-medium aria-[current=page]:text-accent-foreground"
            :aria-current="isActive(item.path) ? 'page' : undefined"
            @click="emit('navigate')"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
