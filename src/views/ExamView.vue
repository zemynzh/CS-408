<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Loader2, FileWarning, FileText } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import ChoiceItem from '@/components/exam/ChoiceItem.vue'
import AnswerItem from '@/components/exam/AnswerItem.vue'
import { useAppStore } from '@/stores/useAppStore'
import { EXAM_YEARS } from '@/config/exams'
import type { ChoiceQuestion, AnswerQuestion } from '@/types/exam'

const route = useRoute()
const router = useRouter()
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

function scrollToQuestion(num: number, behavior: ScrollBehavior = 'auto') {
  const container = scrollEl.value
  if (!container) return
  const el = document.getElementById(`q-${num}`)
  if (!el) return
  const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 16
  container.scrollTo({ top, behavior })
}

const mobileJumpOpen = ref(false)
const mobileYearOpen = ref(false)

function jumpToYear(y: number) {
  // 选择年份后跳转到对应路由，并清空 hash，避免错误的题号滚动
  mobileYearOpen.value = false
  router.replace({ name: 'exam', params: { year: y }, hash: '' })
}

function jumpToQuestion(num: number) {
  // 用 hash 驱动已有 watcher 完成滚动，同时关闭面板
  mobileJumpOpen.value = false
  router.replace({ hash: `#q-${num}` })
}

const mobileChoiceIds = computed(() => {
  return choiceQuestions.value
    .map((q) => q.id)
    .slice()
    .sort((a, b) => a - b)
})

const mobileAnswerIds = computed(() => {
  return answerQuestions.value
    .map((q) => q.id)
    .slice()
    .sort((a, b) => a - b)
})

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
    const hash = route.hash
    if (hash?.startsWith('#q-')) {
      const num = Number(hash.slice(3))
      if (Number.isFinite(num)) scrollToQuestion(num, 'auto')
    }
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

watch(
  () => route.hash,
  (hash) => {
    if (!hash?.startsWith('#q-')) return
    const num = Number(hash.slice(3))
    if (!Number.isFinite(num)) return
    scrollToQuestion(num, 'smooth')
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
    <header v-if="year" class="px-4 py-3 sm:px-6 sm:py-4 border-b border-border bg-background/50 backdrop-blur shrink-0">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-base sm:text-xl font-bold leading-snug">{{ year }} 年全国硕士研究生入学统一考试</h1>
          <p class="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">计算机学科专业基础（408）</p>
        </div>
        <div class="hidden sm:flex gap-4">
          <div class="text-right">
            <div class="text-xs text-muted-foreground font-semibold uppercase tracking-wider">选择题</div>
            <div class="text-lg font-bold">{{ choiceQuestions.length }} 题</div>
          </div>
          <div class="text-right">
            <div class="text-xs text-muted-foreground font-semibold uppercase tracking-wider">解答题</div>
            <div class="text-lg font-bold">{{ answerQuestions.length }} 题</div>
          </div>
        </div>
        <div class="sm:hidden flex items-center gap-2">
          <span class="px-2 py-1 rounded bg-muted text-[11px] text-muted-foreground">
            选择题 {{ choiceQuestions.length }} 题
          </span>
          <span class="px-2 py-1 rounded bg-muted text-[11px] text-muted-foreground">
            解答题 {{ answerQuestions.length }} 题
          </span>
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
        class="exam-scroll h-full overflow-y-auto pb-24 lg:pb-0"
      >
        <div class="max-w-4xl mx-auto py-8">
          <section class="mb-10 sm:mb-12">
            <div class="px-4 sm:px-6 mb-4 sm:mb-6">
              <h2 class="text-base sm:text-lg font-bold flex items-center gap-1.5 sm:gap-2 leading-snug">
                <span class="w-1 h-4 sm:h-6 bg-primary rounded-full"></span>
                一、单项选择题
                <span class="text-xs sm:text-sm font-normal text-muted-foreground ml-2">
                  （第 1–40 题，每题 2 分，共 80 分）
                </span>
              </h2>
            </div>
            <div class="bg-card border border-border/50 rounded-xl overflow-hidden divide-y divide-border/50">
              <ChoiceItem v-for="q in choiceQuestions" :key="q.id" :question="q" />
            </div>
          </section>

          <section v-if="answerQuestions.length" class="mb-10 sm:mb-12">
            <div class="px-4 sm:px-6 mb-4 sm:mb-6">
              <h2 class="text-base sm:text-lg font-bold flex items-center gap-1.5 sm:gap-2 leading-snug">
                <span class="w-1 h-4 sm:h-6 bg-primary rounded-full"></span>
                二、综合应用题
                <span class="text-xs sm:text-sm font-normal text-muted-foreground ml-2">
                  （第 41–47 题，共 70 分）
                </span>
              </h2>
            </div>
            <div class="bg-card border border-border/50 rounded-xl overflow-hidden divide-y divide-border/50">
              <AnswerItem v-for="q in answerQuestions" :key="q.id" :question="q" />
            </div>
          </section>

          <div class="h-16 sm:h-20 flex items-center justify-center text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest italic">
            END OF EXAM
          </div>
        </div>
      </div>

      <!-- 移动端：底部年份/题号导航 -->
      <div class="lg:hidden">
        <Sheet v-model:open="mobileJumpOpen">
          <SheetTrigger as-child>
            <Button
              v-if="!loading"
              variant="secondary"
              class="fixed z-40 bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)]"
              aria-label="打开年份与题号导航"
            >
              <FileText class="h-4 w-4 mr-2" />
              <span class="flex-1 text-left">年份/题号</span>
              <span class="text-xs text-muted-foreground">
                {{ year ? `${year} 年` : '选择年份' }}
              </span>
            </Button>
          </SheetTrigger>

          <SheetContent side="bottom" class="p-0">
            <SheetHeader class="px-4 py-3 border-b border-border">
              <SheetTitle class="text-left">年份与题号导航</SheetTitle>
            </SheetHeader>

            <!-- 整个内容区域限定最大高度，可在内部滚动 -->
            <ScrollArea class="h-[80vh]">
              <div class="p-4 space-y-4">
                <div>
                  <div class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    选择年份
                  </div>

                  <button
                    type="button"
                    class="w-full h-9 px-3 rounded-md border border-border bg-background text-xs flex items-center justify-between"
                    @click="mobileYearOpen = !mobileYearOpen"
                  >
                    <span class="text-foreground">
                      {{ year ? `${year} 年` : '请选择年份' }}
                    </span>
                    <span class="text-[10px] text-muted-foreground">
                      {{ mobileYearOpen ? '收起' : '展开' }}
                    </span>
                  </button>

                  <Transition
                    enter-active-class="transition-all duration-150 ease-out"
                    enter-from-class="opacity-0 -translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-100 ease-in"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-1"
                  >
                    <div
                      v-if="mobileYearOpen"
                      class="mt-2 max-h-48 overflow-y-auto rounded-md border border-border bg-card text-xs"
                    >
                      <button
                        v-for="exam in EXAM_YEARS"
                        :key="exam.year"
                        type="button"
                        :class="[
                          'w-full px-3 py-2 text-left flex items-center justify-between transition-colors',
                          year === exam.year
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'hover:bg-accent hover:text-accent-foreground',
                        ]"
                        @click="jumpToYear(exam.year)"
                      >
                        <span>{{ exam.label }}</span>
                        <span v-if="year === exam.year" class="text-[10px] text-primary">
                          当前
                        </span>
                      </button>
                    </div>
                  </Transition>
                </div>

                <div v-if="year">
                  <div class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    跳转题号
                  </div>

                  <div class="space-y-5">
                    <div v-if="mobileChoiceIds.length">
                      <div class="flex items-center justify-between mb-2">
                        <p class="text-xs font-bold text-foreground/50 uppercase tracking-wide">选择题</p>
                        <p class="text-[11px] text-muted-foreground">
                          {{ mobileChoiceIds[0] }}–{{ mobileChoiceIds[mobileChoiceIds.length - 1] }}
                        </p>
                      </div>
                      <div class="grid grid-cols-8 gap-1">
                        <button
                          v-for="num in mobileChoiceIds"
                          :key="num"
                          :class="[
                            'h-8 rounded text-xs font-medium transition-colors duration-150',
                            appStore.activeQuestionId === num
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary',
                          ]"
                          @click="jumpToQuestion(num)"
                        >
                          {{ num }}
                        </button>
                      </div>
                    </div>

                    <div v-if="mobileAnswerIds.length">
                      <div class="flex items-center justify-between mb-2">
                        <p class="text-xs font-bold text-foreground/50 uppercase tracking-wide">解答题</p>
                        <p class="text-[11px] text-muted-foreground">
                          {{ mobileAnswerIds[0] }}–{{ mobileAnswerIds[mobileAnswerIds.length - 1] }}
                        </p>
                      </div>
                      <div class="grid grid-cols-8 gap-1">
                        <button
                          v-for="num in mobileAnswerIds"
                          :key="num"
                          :class="[
                            'h-8 rounded text-xs font-medium transition-colors duration-150',
                            appStore.activeQuestionId === num
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary',
                          ]"
                          @click="jumpToQuestion(num)"
                        >
                          {{ num }}
                        </button>
                      </div>
                    </div>

                    <div v-if="!mobileChoiceIds.length && !mobileAnswerIds.length" class="text-sm text-muted-foreground">
                      当前年份暂无题号数据。
                    </div>
                  </div>
                </div>

                <div v-else class="text-sm text-muted-foreground">
                  选择年份后即可跳转到对应题号。
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
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
