<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h2 :id="id" class="group mt-12 mb-4 border-b pb-2 text-2xl font-semibold tracking-tight scroll-mt-20">
    <a v-if="id" :href="`#${id}`" class="text-inherit no-underline"><slot /><span class="ml-2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100" aria-hidden="true">#</span></a>
    <slot v-else />
  </h2>
</template>
