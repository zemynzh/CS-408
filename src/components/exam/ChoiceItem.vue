<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { Button } from '@/components/ui/button'
import MarkdownContent from '@/components/ui/MarkdownContent.vue'
import { type ChoiceQuestion, SUBJECT_BADGE_COLOR } from '@/types/exam'

// 按需懒加载，不影响无可视化题目的首屏性能
const HuffmanTreeViz = defineAsyncComponent(() => import('@/components/visual/HuffmanTreeViz.vue'))
const BinaryTreeViz  = defineAsyncComponent(() => import('@/components/visual/BinaryTreeViz.vue'))
const BSTSearchViz   = defineAsyncComponent(() => import('@/components/visual/BSTSearchViz.vue'))
const StackViz       = defineAsyncComponent(() => import('@/components/visual/StackViz.vue'))
const GanttViz       = defineAsyncComponent(() => import('@/components/visual/GanttViz.vue'))
const TCPFlowViz     = defineAsyncComponent(() => import('@/components/visual/TCPFlowViz.vue'))

const props = defineProps<{ question: ChoiceQuestion }>()

const OPTION_LABELS = ['A', 'B', 'C', 'D'] as const

const selected = ref<string | null>(null)
const revealed = ref(false)

function selectOption(label: string) {
  if (revealed.value) return
  selected.value = label
  revealed.value = true
}

function optionClass(label: string): string {
  if (!revealed.value) {
    return selected.value === label
      ? 'border-primary bg-primary/10 text-primary font-medium'
      : 'border-border bg-background hover:bg-accent'
  }
  if (label === props.question.answer) {
    return 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold'
  }
  if (selected.value === label) {
    return 'border-destructive bg-destructive/10 text-destructive font-bold'
  }
  return 'border-border bg-background opacity-60'
}
</script>

<template>
  <div :id="`q-${question.id}`" class="p-6 transition-colors hover:bg-accent/5">
    <!-- 题号 + 科目 -->
    <div class="flex items-center gap-3 mb-4">
      <span class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
        {{ question.id }}
      </span>
      <span :class="['px-2 py-0.5 rounded text-xs font-semibold', SUBJECT_BADGE_COLOR[question.subject] ?? 'bg-muted text-muted-foreground']">
        {{ question.subject }}
      </span>
      <span class="text-xs text-muted-foreground">选择题</span>
    </div>

    <!-- 题干 -->
    <MarkdownContent :content="question.question" class="mb-6 font-medium text-foreground/90" />

    <!-- 选项 -->
    <div class="grid grid-cols-1 gap-3 mb-6">
      <button
        v-for="(option, i) in question.options"
        :key="OPTION_LABELS[i]"
        :disabled="revealed"
        :class="['flex items-start gap-4 p-4 border rounded-lg text-left transition-colors duration-150', optionClass(OPTION_LABELS[i])]"
        @click="selectOption(OPTION_LABELS[i])"
      >
        <span class="shrink-0 w-6 h-6 flex items-center justify-center border rounded-full text-xs font-bold border-current">
          {{ OPTION_LABELS[i] }}
        </span>
        <MarkdownContent :content="option" class="text-sm" />
      </button>
    </div>

    <!-- 操作栏 -->
    <div class="flex items-center gap-3">
      <Button variant="outline" size="sm" @click="revealed = !revealed">
        {{ revealed ? '隐藏解析' : '查看答案与解析' }}
      </Button>
    </div>

    <!-- 解析 -->
    <Transition
      enter-active-class="transition-[opacity,transform] duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-[opacity,transform] duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-if="revealed" class="mt-6 p-5 rounded-lg bg-muted/40 border border-muted-foreground/10">
        <p class="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-4">
          正确答案：{{ question.answer }}
        </p>
        <div class="space-y-4">
          <div>
            <h4 class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">知识点</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="kp in question.explanation.knowledgePoints"
                :key="kp"
                class="px-2 py-0.5 bg-background border border-border rounded text-[11px]"
              >{{ kp }}</span>
            </div>
          </div>
          <div>
            <h4 class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">详细解析</h4>
            <MarkdownContent :content="question.explanation.analysis" class="text-sm text-foreground/80" />
          </div>
        </div>

        <!-- 可视化（按 visual.type 分发） -->
        <template v-if="question.explanation.visual">
          <HuffmanTreeViz v-if="question.explanation.visual.type === 'huffman'"    :visual="question.explanation.visual" />
          <BinaryTreeViz  v-if="question.explanation.visual.type === 'binaryTree'" :visual="question.explanation.visual" />
          <BSTSearchViz   v-if="question.explanation.visual.type === 'bstSearch'"  :visual="question.explanation.visual" />
          <StackViz       v-if="question.explanation.visual.type === 'stack'"      :visual="question.explanation.visual" />
          <GanttViz       v-if="question.explanation.visual.type === 'gantt'"      :visual="question.explanation.visual" />
          <TCPFlowViz     v-if="question.explanation.visual.type === 'tcp'"        :visual="question.explanation.visual" />
        </template>
      </div>
    </Transition>
  </div>
</template>
