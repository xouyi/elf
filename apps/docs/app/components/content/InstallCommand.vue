<script setup lang="ts">
const props = withDefaults(defineProps<{ extra?: string, dev?: boolean }>(), { extra: '' })
const site = useSite()
const code = computed(() => `bun add${props.dev ? ' -d' : ''} ${site.name}${props.extra ? ` ${props.extra}` : ''}`)
</script>

<template>
  <CodeSnippet :code="code" lang="bash" />
</template>
