<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ScrollArea } from '@/components/ui/scroll-area'
import { EXAM_CONFIGS } from '@/config/exams'
import { useAppStore } from '@/stores/useAppStore'

const route = useRoute()
const appStore = useAppStore()

const isExam = computed(() => route.name === 'exam')
const activeYear = computed(() => {
  const y = route.params.year
  return y ? Number(y) : null
})
const examConfig = computed(() => activeYear.value ? (EXAM_CONFIGS[activeYear.value] ?? null) : null)

function scrollToQuestion(num: number) {
  const el = document.getElementById(`q-${num}`)
  if (!el) return
  const container = document.querySelector('[data-exam-scroll]') as HTMLElement | null
  if (!container) return
  // getBoundingClientRect 相对计算，不受中间 position 元素影响
  const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 16
  container.scrollTo({ top, behavior: 'smooth' })
}

/** 右侧导航栏科目分组标签颜色（纯文字色，区别于题目卡片内的徽章色） */
const SUBJECT_LABEL_COLOR: Record<string, string> = {
  '数据结构': 'text-blue-500 dark:text-blue-400',
  '组成原理': 'text-violet-500 dark:text-violet-400',
  '操作系统': 'text-emerald-500 dark:text-emerald-400',
  '计算机网络': 'text-orange-500 dark:text-orange-400',
}
</script>

<template>
  <aside
    v-if="isExam"
    class="hidden lg:flex flex-col w-52 shrink-0 border-l border-border bg-background"
  >
    <div class="h-10 flex items-center px-4 border-b border-border shrink-0">
      <span class="text-xs font-semibold text-muted-foreground tracking-wide uppercase">题号导航</span>
    </div>

    <ScrollArea v-if="examConfig" class="flex-1 py-3">
      <div class="px-3 space-y-4">
        <template v-for="section in examConfig.structure" :key="section.section">
          <div>
            <p class="text-xs font-bold text-foreground/50 mb-2 px-1 uppercase tracking-wide">
              {{ section.section }}
            </p>
            <div class="space-y-2">
              <template v-for="group in section.groups" :key="group.subject">
                <div>
                  <p :class="['text-xs font-semibold mb-1 px-1', SUBJECT_LABEL_COLOR[group.subject] ?? 'text-muted-foreground']">
                    {{ group.subject }}
                  </p>
                  <div class="flex flex-wrap gap-1 px-1">
                    <button
                      v-for="num in group.questions"
                      :key="num"
                      :class="[
                        'w-7 h-7 rounded text-xs font-medium transition-colors duration-150',
                        appStore.activeQuestionId === num
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary',
                      ]"
                      @click="scrollToQuestion(num)"
                    >
                      {{ num }}
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </ScrollArea>

    <div v-else class="flex-1 flex items-center justify-center px-4 text-center">
      <p class="text-xs text-muted-foreground leading-relaxed">
        {{ activeYear ? `${activeYear} 年题号数据暂未录入` : '请从左侧选择年份' }}
      </p>
    </div>
  </aside>
</template>
