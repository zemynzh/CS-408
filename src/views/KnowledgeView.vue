<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Loader2, FileWarning, BookOpen } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import MarkdownContent from '@/components/ui/MarkdownContent.vue'
import { CHAPTERS, type Chapter } from '@/config/chapters'
import type { ModuleKey } from '@/config/modules'

// 使用 Vite 的 import.meta.glob 批量导入 src/data/knowledge 下的所有 md 文件
// eager: false 表示按需加载，as: 'raw' 表示以字符串形式读取内容
const markdownModules = import.meta.glob('../data/knowledge/**/*.md', {
  query: '?raw',
  import: 'default',
})

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const error = ref<string | null>(null)
const content = ref('')
const scrollEl = ref<HTMLElement | null>(null)

// ===== 移动端章节导航所需数据 =====
const currentModule = computed<ModuleKey | null>(() => {
  const name = String(route.name)
  if (name !== 'knowledge') return null
  return route.params.module as ModuleKey
})

const moduleChapters = computed<Chapter[]>(() => {
  if (!currentModule.value) return []
  return CHAPTERS[currentModule.value] ?? []
})

// 展开为叶子节点列表，便于底部网格展示
const leafChapters = computed(() => {
  const result: { id: string; title: string }[] = []
  for (const ch of moduleChapters.value) {
    if (ch.children?.length) {
      for (const child of ch.children) {
        result.push({ id: child.id, title: child.title })
      }
    } else {
      result.push({ id: ch.id, title: ch.title })
    }
  }
  return result
})

const activeChapterId = computed(() => (route.params.chapterId as string) ?? '')
const activeChapterTitle = computed(() => {
  const match = leafChapters.value.find((x) => x.id === activeChapterId.value)
  return match?.title ?? ''
})
const activeChapterIndex = computed(() => leafChapters.value.findIndex((x) => x.id === activeChapterId.value))
const canPrev = computed(() => activeChapterIndex.value > 0)
const canNext = computed(() => activeChapterIndex.value >= 0 && activeChapterIndex.value < leafChapters.value.length - 1)
const mobileChapterOpen = ref(false)

function jumpToChapter(id: string) {
  if (!currentModule.value) return
  mobileChapterOpen.value = false
  router.push({ name: 'knowledge', params: { module: currentModule.value, chapterId: id } })
}

function jumpToPrev() {
  if (!canPrev.value) return
  jumpToChapter(leafChapters.value[activeChapterIndex.value - 1].id)
}

function jumpToNext() {
  if (!canNext.value) return
  jumpToChapter(leafChapters.value[activeChapterIndex.value + 1].id)
}

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
      if (scrollEl.value) scrollEl.value.scrollTop = 0
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

    <div v-else ref="scrollEl" class="flex-1 overflow-y-auto px-6 py-10 pb-24 md:pb-10">
      <div class="max-w-4xl mx-auto">
        <MarkdownContent :content="content" />
        
        <!-- 底部版权或提示 -->
        <div class="mt-20 pt-8 border-t border-border text-center">
          <p class="text-xs text-muted-foreground">© 408 考研助手 · 核心考纲知识点库</p>
        </div>
      </div>
    </div>

    <!-- 移动端：底部章节导航 -->
    <div v-if="leafChapters.length" class="lg:hidden">
      <Sheet v-model:open="mobileChapterOpen">
        <SheetTrigger as-child>
          <Button
            variant="secondary"
            class="fixed z-40 bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)]"
            aria-label="打开章节导航"
          >
            <BookOpen class="h-4 w-4 mr-2" />
            <span class="flex-1 text-left">章节导航</span>
            <span class="text-xs text-muted-foreground">
              {{ activeChapterTitle || '请选择章节' }}
            </span>
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom" class="p-0">
          <SheetHeader class="px-4 py-3 border-b border-border">
            <SheetTitle class="text-left">当前科目章节导航</SheetTitle>
          </SheetHeader>

          <ScrollArea class="h-[80vh]">
            <div class="p-4 space-y-3">
              <div class="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  class="h-9"
                  :disabled="!canPrev"
                  @click="jumpToPrev"
                >
                  上一节
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  class="h-9"
                  :disabled="!canNext"
                  @click="jumpToNext"
                >
                  下一节
                </Button>
                <div class="ml-auto text-xs text-muted-foreground truncate">
                  {{ activeChapterTitle || '未选择' }}
                </div>
              </div>

              <p class="text-xs text-muted-foreground">
                共 {{ leafChapters.length }} 节，小屏幕下可在此直接切换章节。
              </p>

              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="(ch, index) in leafChapters"
                  :key="ch.id"
                  type="button"
                  :class="[
                    'w-full rounded-md border px-3 py-2 text-left text-[12px] leading-snug transition-colors',
                    activeChapterId === ch.id
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : 'border-border bg-background hover:bg-accent hover:text-accent-foreground',
                  ]"
                  @click="jumpToChapter(ch.id)"
                >
                  <span class="block text-[11px] text-muted-foreground mb-0.5">
                    {{ index + 1 }}
                  </span>
                  <span class="line-clamp-2">
                    {{ ch.title }}
                  </span>
                </button>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</template>
