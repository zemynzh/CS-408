<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  content: string
}>()

const renderedContent = computed(() => {
  return marked.parse(props.content || '', {
    breaks: true,
    gfm: true,
  })
})
</script>

<template>
  <div 
    class="prose prose-sm dark:prose-invert max-w-none"
    v-html="renderedContent"
  ></div>
</template>

<style scoped>
/* 针对公式或特殊符号的微调 */
:deep(code) {
  @apply bg-muted px-1 py-0.5 rounded text-primary font-mono text-sm;
}
:deep(p) {
  @apply my-1 leading-relaxed;
}
</style>
