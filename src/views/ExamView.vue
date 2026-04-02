<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Loader2, FileWarning } from 'lucide-vue-next'
import ChoiceItem from '@/components/exam/ChoiceItem.vue'
import AnswerItem from '@/components/exam/AnswerItem.vue'
import { useAppStore } from '@/stores/useAppStore'
import type { ChoiceQuestion, AnswerQuestion } from '@/types/exam'

const route = useRoute()
const appStore = useAppStore()

const loading = ref(false)
const error = ref<string | null>(null)
const year = ref<number | null>(null)
const choiceQuestions = ref<ChoiceQuestion[]>([])
const answerQuestions = ref<AnswerQuestion[]>([])

// 原生滚动容器 ref
const scrollEl = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null
const visibleIds = new Set<number>()

function onIntersect(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    const id = Number((entry.target as HTMLElement).dataset.qid)
    if (entry.isIntersecting) visibleIds.add(id)
    else visibleIds.delete(id)
  }
  appStore.setActiveQuestion(visibleIds.size > 0 ? Math.min(...visibleIds) : null)
}

function setupObserver(ids: number[]) {
  observer?.disconnect()
  visibleIds.clear()
  appStore.setActiveQuestion(null)

  // root 指向原生滚动容器，rootMargin 裁掉下方 60%，只高亮视口上方 40% 内的题
  observer = new IntersectionObserver(onIntersect, {
    root: scrollEl.value,
    rootMargin: '0px 0px -60% 0px',
    threshold: 0,
  })

  for (const id of ids) {
    const el = document.getElementById(`q-${id}`)
    if (el) {
      el.dataset.qid = String(id)
      observer.observe(el)
    }
  }
}

async function loadExamData(y: number) {
  observer?.disconnect()
  visibleIds.clear()
  appStore.setActiveQuestion(null)
  loading.value = true
  error.value = null
  choiceQuestions.value = []
  answerQuestions.value = []

  try {
    const mod = await import(`../data/exams/${y}.ts`)
    choiceQuestions.value = mod.CHOICE_QUESTIONS ?? []
    answerQuestions.value = mod.ANSWER_QUESTIONS ?? []
    year.value = y
    loading.value = false        // 先关 loading，v-else 分支才会渲染
    await nextTick()             // 等 DOM patch，scrollEl ref 绑定
    const ids = [
      ...choiceQuestions.value.map((q) => q.id),
      ...answerQuestions.value.map((q) => q.id),
    ]
    setupObserver(ids)
  } catch {
    error.value = `暂未收录 ${y} 年的真题数据。`
    loading.value = false
  }
}

// 用 isMounted 标志区分首次加载（onMounted）和后续路由切换（watch）
// 不用 immediate 是因为 onMounted 前 scrollEl ref 未绑定，setupObserver 会拿到 null root
let isMounted = false

onMounted(() => {
  isMounted = true
  const y = route.params.year
  if (y) loadExamData(Number(y))
})

watch(
  () => route.params.year,
  (y) => {
    if (!isMounted) return
    if (y) {
      loadExamData(Number(y))
    } else {
      year.value = null
      choiceQuestions.value = []
      answerQuestions.value = []
      observer?.disconnect()
      visibleIds.clear()
      appStore.setActiveQuestion(null)
    }
  },
)

onBeforeUnmount(() => {
  observer?.disconnect()
  appStore.setActiveQuestion(null)
})
</script>

<template>
  <div class="h-full flex flex-col overflow-hidden bg-background">
    <!-- 头部 -->
    <header v-if="year" class="px-6 py-4 border-b border-border bg-background/50 backdrop-blur shrink-0">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold">{{ year }} 年全国硕士研究生入学统一考试</h1>
          <p class="text-sm text-muted-foreground mt-1">计算机学科专业基础（408）</p>
        </div>
        <div class="flex gap-4">
          <div class="text-right">
            <div class="text-xs text-muted-foreground font-semibold uppercase tracking-wider">选择题</div>
            <div class="text-lg font-bold">{{ choiceQuestions.length }} 题</div>
          </div>
          <div class="text-right">
            <div class="text-xs text-muted-foreground font-semibold uppercase tracking-wider">解答题</div>
            <div class="text-lg font-bold">{{ answerQuestions.length }} 题</div>
          </div>
        </div>
      </div>
    </header>

    <!-- 内容区 -->
    <div class="flex-1 overflow-hidden relative">
      <!-- 加载 -->
      <div v-if="loading" class="absolute inset-0 z-10 bg-background/80 flex flex-col items-center justify-center gap-3">
        <Loader2 class="h-8 w-8 animate-spin text-primary" />
        <p class="text-sm text-muted-foreground">正在加载试卷数据...</p>
      </div>

      <!-- 错误 -->
      <div v-else-if="error" class="h-full flex flex-col items-center justify-center p-12 text-center">
        <div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
          <FileWarning class="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 class="text-lg font-bold mb-2">数据加载失败</h3>
        <p class="text-muted-foreground max-w-md">{{ error }}</p>
      </div>

      <!-- 未选年份 -->
      <div v-else-if="!year" class="h-full flex flex-col items-center justify-center p-12 text-center">
        <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Loader2 class="h-8 w-8 text-primary" />
        </div>
        <h3 class="text-lg font-bold mb-2">欢迎来到历年真题库</h3>
        <p class="text-muted-foreground max-w-md">请在左侧选择想要查看的真题年份。</p>
      </div>

      <!-- 试卷：原生滚动容器，IntersectionObserver root 直接指向它 -->
      <div
        v-else
        ref="scrollEl"
        data-exam-scroll
        class="exam-scroll h-full overflow-y-auto"
      >
        <div class="max-w-4xl mx-auto py-8">
          <section class="mb-12">
            <div class="px-6 mb-6">
              <h2 class="text-lg font-bold flex items-center gap-2">
                <span class="w-1 h-6 bg-primary rounded-full"></span>
                一、单项选择题
                <span class="text-sm font-normal text-muted-foreground ml-2">（第 1–40 题，每题 2 分，共 80 分）</span>
              </h2>
            </div>
            <div class="bg-card border border-border/50 rounded-xl overflow-hidden divide-y divide-border/50">
              <ChoiceItem v-for="q in choiceQuestions" :key="q.id" :question="q" />
            </div>
          </section>

          <section v-if="answerQuestions.length" class="mb-12">
            <div class="px-6 mb-6">
              <h2 class="text-lg font-bold flex items-center gap-2">
                <span class="w-1 h-6 bg-primary rounded-full"></span>
                二、综合应用题
                <span class="text-sm font-normal text-muted-foreground ml-2">（第 41–47 题，共 70 分）</span>
              </h2>
            </div>
            <div class="bg-card border border-border/50 rounded-xl overflow-hidden divide-y divide-border/50">
              <AnswerItem v-for="q in answerQuestions" :key="q.id" :question="q" />
            </div>
          </section>

          <div class="h-20 flex items-center justify-center text-xs text-muted-foreground uppercase tracking-widest italic">
            END OF EXAM
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 自定义滚动条，对齐 shadcn ScrollArea 视觉风格 */
.exam-scroll {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--border)) transparent;
}
.exam-scroll::-webkit-scrollbar {
  width: 6px;
}
.exam-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.exam-scroll::-webkit-scrollbar-thumb {
  background-color: hsl(var(--border));
  border-radius: 3px;
}
.exam-scroll::-webkit-scrollbar-thumb:hover {
  background-color: hsl(var(--muted-foreground) / 0.5);
}
</style>
