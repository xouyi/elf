<script setup lang="ts">
const { setTheme } = useSiteTheme()
const theme = useDisplayTheme()
</script>

<template>
  <ThemeToggle :model-value="theme" label="Site theme" compact @update:model-value="setTheme" />
</template>
