<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Loader2, FileWarning, BookOpen } from 'lucide-vue-next'
import MarkdownContent from '@/components/ui/MarkdownContent.vue'

// 使用 Vite 的 import.meta.glob 批量导入 src/data/knowledge 下的所有 md 文件
// eager: false 表示按需加载，as: 'raw' 表示以字符串形式读取内容
const markdownModules = import.meta.glob('../data/knowledge/**/*.md', {
  as: 'raw',
})

const route = useRoute()
const loading = ref(false)
const error = ref<string | null>(null)
const content = ref('')

async function loadKnowledgeContent(module: string, chapterId: string) {
  loading.value = true
  error.value = null
  content.value = ''

  try {
    // 构造匹配路径，注意这里的相对路径是相对于当前文件的
    const path = `../data/knowledge/${module}/${chapterId}.md`
    
    if (markdownModules[path]) {
      // 动态导入并获取原始字符串
      const rawContent = await markdownModules[path]()
      content.value = rawContent
      
      // 强制滚动到顶部
      const container = document.querySelector('.overflow-y-auto')
      if (container) container.scrollTop = 0
    } else {
      throw new Error('未找到该章节对应的文件')
    }
  } catch (e) {
    error.value = `暂未收录该章节的详细知识点内容 (${chapterId}.md)`
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const { module, chapterId } = route.params
  if (module && chapterId) loadKnowledgeContent(module as string, chapterId as string)
})

watch(
  () => [route.params.module, route.params.chapterId],
  ([m, i]) => {
    if (m && i) loadKnowledgeContent(m as string, i as string)
  }
)
</script>

<template>
  <div class="h-full flex flex-col bg-background overflow-hidden">
    <div v-if="loading" class="flex-1 flex flex-col items-center justify-center gap-3">
      <Loader2 class="h-8 w-8 animate-spin text-primary" />
      <p class="text-sm text-muted-foreground font-medium">正在加载知识点...</p>
    </div>

    <div v-else-if="error" class="flex-1 flex flex-col items-center justify-center p-12 text-center">
      <div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
        <FileWarning class="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 class="text-lg font-bold mb-2">内容缺失</h3>
      <p class="text-muted-foreground max-w-md">{{ error }}</p>
    </div>

    <div v-else-if="!content" class="flex-1 flex flex-col items-center justify-center p-12 text-center">
      <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <BookOpen class="h-8 w-8 text-primary" />
      </div>
      <h3 class="text-lg font-bold mb-2">请选择章节</h3>
      <p class="text-muted-foreground max-w-md">在左侧边栏选择科目和章节，开启高效复习之旅。</p>
    </div>

    <div v-else class="flex-1 overflow-y-auto px-6 py-10">
      <div class="max-w-4xl mx-auto">
        <MarkdownContent :content="content" />
        
        <!-- 底部版权或提示 -->
        <div class="mt-20 pt-8 border-t border-border text-center">
          <p class="text-xs text-muted-foreground">© 408 考研助手 · 核心考纲知识点库</p>
        </div>
      </div>
    </div>
  </div>
</template>
