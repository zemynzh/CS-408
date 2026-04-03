<script setup lang="ts">
import { computed } from 'vue'
import { marked, Renderer } from 'marked'

const props = defineProps<{
  content: string
}>()

function sanitizeUrl(href: string | null) {
  if (!href) return null
  const value = href.trim()
  if (!value) return null
  if (value.startsWith('#') || value.startsWith('/') || value.startsWith('./') || value.startsWith('../')) {
    return value
  }
  try {
    const url = new URL(value, window.location.origin)
    if (url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'mailto:') return url.toString()
    return null
  } catch {
    return null
  }
}

const renderedContent = computed(() => {
  const renderer = new Renderer()
  renderer.html = () => ''
  renderer.link = (href, title, text) => {
    const safeHref = sanitizeUrl(href)
    if (!safeHref) return text
    const titleAttr = title ? ` title="${title.replace(/"/g, '&quot;')}"` : ''
    const isExternal = safeHref.startsWith('http://') || safeHref.startsWith('https://')
    const targetAttr = isExternal ? ' target="_blank" rel="noreferrer noopener"' : ''
    return `<a href="${safeHref}"${titleAttr}${targetAttr}>${text}</a>`
  }
  renderer.image = (href, title, text) => {
    const safeHref = sanitizeUrl(href)
    if (!safeHref) return text
    const titleAttr = title ? ` title="${title.replace(/"/g, '&quot;')}"` : ''
    const altAttr = text ? ` alt="${text.replace(/"/g, '&quot;')}"` : ' alt=""'
    return `<img src="${safeHref}"${altAttr}${titleAttr} loading="lazy" decoding="async" />`
  }

  return marked.parse(props.content || '', {
    breaks: true,
    gfm: true,
    renderer,
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
