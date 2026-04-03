<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { Button } from '@/components/ui/button'
import MarkdownContent from '@/components/ui/MarkdownContent.vue'
import { type AnswerQuestion, SUBJECT_BADGE_COLOR } from '@/types/exam'

// 按需懒加载
const HuffmanTreeViz = defineAsyncComponent(() => import('@/components/visual/HuffmanTreeViz.vue'))
const BinaryTreeViz  = defineAsyncComponent(() => import('@/components/visual/BinaryTreeViz.vue'))
const BSTSearchViz   = defineAsyncComponent(() => import('@/components/visual/BSTSearchViz.vue'))
const StackViz       = defineAsyncComponent(() => import('@/components/visual/StackViz.vue'))
const GanttViz       = defineAsyncComponent(() => import('@/components/visual/GanttViz.vue'))
const TCPFlowViz     = defineAsyncComponent(() => import('@/components/visual/TCPFlowViz.vue'))

defineProps<{ question: AnswerQuestion }>()

const revealed = ref(false)
</script>

<template>
  <div :id="`q-${question.id}`" class="relative p-4 sm:p-6 transition-colors hover:bg-accent/5">
    <!-- 题号 + 科目 -->
    <div class="flex items-center gap-3 mb-4">
      <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
        {{ question.id }}
      </span>
      <span :class="['px-2 py-0.5 rounded text-xs font-semibold', SUBJECT_BADGE_COLOR[question.subject] ?? 'bg-muted text-muted-foreground']">
        {{ question.subject }}
      </span>
      <span class="text-xs text-muted-foreground">解答题</span>
    </div>

    <!-- 题干 -->
    <MarkdownContent :content="question.question" class="mb-4 sm:mb-6 font-medium text-foreground/90" />

    <!-- 操作栏：固定在卡片右上角 -->
    <div class="absolute top-3 right-3 sm:top-4 sm:right-4">
      <Button variant="outline" size="sm" class="h-8" @click="revealed = !revealed">
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
            <h4 class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">参考答案与详细解析</h4>
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
