<script setup lang="ts">
const props = defineProps<{ href?: string, target?: string, rel?: string }>()
const external = computed(() => /^(?:https?:)?\/\//.test(props.href ?? ''))
const internal = computed(() => !!props.href && (props.href.startsWith('/') || props.href.startsWith('#')) && !external.value)
</script>

<template>
  <NuxtLink v-if="internal" :to="href" class="text-primary underline-offset-4 hover:underline">
    <slot />
  </NuxtLink>
  <a
    v-else
    :href="href"
    :target="external ? '_blank' : target"
    :rel="external ? 'noopener' : rel"
    class="text-primary underline-offset-4 hover:underline"
  ><slot /></a>
</template>
