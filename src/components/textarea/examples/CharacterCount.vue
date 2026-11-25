<script setup lang="ts">
import { ElfLabel, ElfTextarea } from 'elfui'
import { computed, ref } from 'vue'

const max = 140
const post = ref('')
const remaining = computed(() => max - post.value.length)
</script>

<template>
  <div class="grid w-80 gap-2">
    <ElfLabel for="textarea-post">
      Post
    </ElfLabel>
    <ElfTextarea
      id="textarea-post"
      v-model="post"
      :maxlength="max"
      placeholder="What happened at the event?"
      aria-describedby="textarea-post-count"
    />
    <p id="textarea-post-count" class="text-sm text-muted-foreground">
      {{ remaining }} characters left
    </p>
  </div>
</template>
