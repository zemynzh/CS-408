<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronRight, ChevronLeft, ChevronDown, FileText, Sparkles } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CHAPTERS } from '@/config/chapters'
import { EXAM_YEARS } from '@/config/exams'
import { ALGO_SUBJECTS, type AlgoSubjectKey } from '@/config/algorithms'
import type { Chapter } from '@/config/chapters'
import type { ModuleKey } from '@/config/modules'

const route = useRoute()
const router = useRouter()

const isKnowledge = computed(() => route.name === 'knowledge')
const isExam = computed(() => route.name === 'exam')
const isAlgorithms = computed(() => route.name === 'algorithms')

const currentModule = computed<ModuleKey | null>(() =>
  isKnowledge.value ? (route.params.module as ModuleKey) : null,
)

const chapters = computed<Chapter[]>(() => {
  if (!currentModule.value) return []
  return CHAPTERS[currentModule.value] ?? []
})

const visible = computed(() => {
  if (isKnowledge.value) return chapters.value.length > 0
  if (isExam.value) return true
  if (isAlgorithms.value) return true
  return false
})

const collapsed = ref(false)

// 用 ref<Set> 存展开状态；修改时赋新 Set 触发响应式
const expandedIds = ref(new Set<string>())

function isExpanded(id: string) {
  return expandedIds.value.has(id)
}

function toggleExpand(id: string) {
  const next = new Set(expandedIds.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expandedIds.value = next
}

const activeChapterId = computed(() => (route.params.chapterId as string) ?? '')

const activeYear = computed(() => {
  const y = route.params.year
  return y ? Number(y) : null
})

function navigateToChapter(chapter: Chapter) {
  if (chapter.children?.length) {
    toggleExpand(chapter.id)
  } else {
    router.push({
      name: 'knowledge',
      params: { module: currentModule.value, chapterId: chapter.id },
    })
  }
}

function navigateToExam(year: number) {
  router.push({ name: 'exam', params: { year } })
}

const activeAlgoSubject = computed<AlgoSubjectKey | null>(() => {
  if (!isAlgorithms.value) return null
  return (route.params.subject as AlgoSubjectKey) ?? null
})

const activeAlgoId = computed(() => (route.params.algoId as string) ?? '')

const algoSubject = computed(() => {
  const key = activeAlgoSubject.value
  if (!key) return null
  return ALGO_SUBJECTS.find((s) => s.key === key) ?? null
})

function navigateToAlgoSubject(key: AlgoSubjectKey) {
  router.push({ name: 'algorithms', params: { subject: key } })
}

function navigateToAlgo(id: string) {
  const key = activeAlgoSubject.value
  if (!key) return
  router.push({ name: 'algorithms', params: { subject: key, algoId: id } })
}
</script>

<template>
  <aside
    v-if="visible"
    :class="[
      'hidden md:flex flex-col border-r border-border bg-background shrink-0',
      'transition-[width] duration-300 ease-in-out will-change-[width]',
      collapsed ? 'w-12' : 'w-60',
    ]"
  >
    <!-- 折叠按钮 -->
    <div class="flex items-center justify-end h-10 px-2 border-b border-border shrink-0">
      <Button
        variant="ghost"
        size="icon"
        class="h-7 w-7"
        :aria-label="collapsed ? '展开侧边栏' : '收起侧边栏'"
        @click="collapsed = !collapsed"
      >
        <ChevronLeft v-if="!collapsed" class="h-4 w-4 transition-transform duration-200" />
        <ChevronRight v-else class="h-4 w-4 transition-transform duration-200" />
      </Button>
    </div>

    <!-- ====== 知识点模块：章节树 ====== -->
    <template v-if="isKnowledge">
      <ScrollArea v-if="!collapsed" class="flex-1 py-2">
        <nav class="px-2 space-y-0.5">
          <template v-for="chapter in chapters" :key="chapter.id">
            <!-- 父级章节 -->
            <button
              :class="[
                'w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-sm text-left',
                'transition-colors duration-150',
                activeChapterId === chapter.id
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground',
              ]"
              @click="navigateToChapter(chapter)"
            >
              <span class="truncate leading-snug">{{ chapter.title }}</span>
              <ChevronDown
                v-if="chapter.children?.length"
                :class="[
                  'h-3.5 w-3.5 shrink-0 text-muted-foreground',
                  'transition-transform duration-200 ease-in-out',
                  isExpanded(chapter.id) ? 'rotate-180' : 'rotate-0',
                ]"
              />
            </button>

            <!-- 子节点（小节） -->
            <div
              v-if="chapter.children?.length && isExpanded(chapter.id)"
              class="ml-2 pl-2 border-l border-border space-y-0.5 mt-0.5 mb-1"
            >
              <button
                v-for="child in chapter.children"
                :key="child.id"
                :class="[
                  'w-full flex items-center px-2 py-1.5 rounded-md text-sm text-left',
                  'transition-colors duration-150',
                  activeChapterId === child.id
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground',
                ]"
                @click="navigateToChapter(child)"
              >
                <span class="truncate leading-snug">{{ child.title }}</span>
              </button>
            </div>
          </template>
        </nav>
      </ScrollArea>

      <!-- 折叠状态：序号点 -->
      <div v-else class="flex-1 flex flex-col items-center py-3 gap-1.5 overflow-hidden">
        <div
          v-for="(chapter, index) in chapters"
          :key="chapter.id"
          :title="chapter.title"
          :class="[
            'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer',
            'transition-colors duration-150',
            activeChapterId.startsWith(chapter.id)
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          ]"
          @click="navigateToChapter(chapter)"
        >
          {{ index + 1 }}
        </div>
      </div>
    </template>

    <!-- ====== 历年真题：年份列表 ====== -->
    <template v-else-if="isExam">
      <ScrollArea v-if="!collapsed" class="flex-1 py-2">
        <nav class="px-2 space-y-0.5">
          <button
            v-for="exam in EXAM_YEARS"
            :key="exam.year"
            :class="[
              'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-left',
              'transition-colors duration-150',
              activeYear === exam.year
                ? 'bg-primary text-primary-foreground font-medium'
                : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground',
            ]"
            @click="navigateToExam(exam.year)"
          >
            <FileText class="h-3.5 w-3.5 shrink-0" />
            <span>{{ exam.label }}</span>
          </button>
        </nav>
      </ScrollArea>

      <!-- 折叠状态：年份两位数字 -->
      <div v-else class="flex-1 flex flex-col items-center py-3 gap-1.5 overflow-y-auto">
        <div
          v-for="exam in EXAM_YEARS"
          :key="exam.year"
          :title="exam.label"
          :class="[
            'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer',
            'transition-colors duration-150',
            activeYear === exam.year
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          ]"
          @click="navigateToExam(exam.year)"
        >
          {{ String(exam.year).slice(2) }}
        </div>
      </div>
    </template>

    <!-- ====== 算法模块：科目 + 算法列表 ====== -->
    <template v-else-if="isAlgorithms">
      <ScrollArea v-if="!collapsed" class="flex-1 py-2">
        <nav class="px-2 space-y-2">
          <button
            :class="[
              'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-left mb-2',
              'transition-colors duration-150',
              !activeAlgoSubject && !activeAlgoId
                ? 'bg-primary text-primary-foreground font-medium'
                : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground',
            ]"
            @click="router.push({ name: 'algorithms' })"
          >
            <Sparkles class="h-4 w-4" />
            <span>算法总览</span>
          </button>

          <div class="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2">
            科目
          </div>
          <div class="space-y-0.5">
            <button
              v-for="s in ALGO_SUBJECTS"
              :key="s.key"
              :class="[
                'w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-sm text-left',
                'transition-colors duration-150',
                activeAlgoSubject === s.key
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground',
              ]"
              @click="navigateToAlgoSubject(s.key)"
            >
              <span class="truncate leading-snug">{{ s.label }}</span>
              <span class="text-[10px] text-muted-foreground">{{ s.items.length }}</span>
            </button>
          </div>

          <div class="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2">
            算法
          </div>
          <div v-if="algoSubject" class="space-y-0.5">
            <button
              v-for="a in algoSubject.items"
              :key="a.id"
              :class="[
                'w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-sm text-left',
                'transition-colors duration-150',
                activeAlgoId === a.id
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground',
              ]"
              @click="navigateToAlgo(a.id)"
            >
              <span class="truncate leading-snug">{{ a.name }}</span>
              <span v-if="a.demoType" class="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                演示
              </span>
            </button>
          </div>
          <div v-else class="px-2 text-sm text-muted-foreground">
            请选择一个科目
          </div>
        </nav>
      </ScrollArea>

      <div v-else class="flex-1 flex flex-col items-center py-3 gap-1.5 overflow-y-auto">
        <div
          v-for="s in ALGO_SUBJECTS"
          :key="s.key"
          :title="s.label"
          :class="[
            'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold cursor-pointer',
            'transition-colors duration-150',
            activeAlgoSubject === s.key
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          ]"
          @click="navigateToAlgoSubject(s.key)"
        >
          {{ s.label.slice(0, 1) }}
        </div>
      </div>
    </template>
  </aside>
</template>
