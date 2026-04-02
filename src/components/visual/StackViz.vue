<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { StackVisual } from '@/types/exam'

const props = defineProps<{ visual: StackVisual }>()

const currentStep = ref(0)
const totalSteps = computed(() => props.visual.steps.length)
const step = computed(() => props.visual.steps[currentStep.value])
</script>

<template>
  <div class="mt-6 rounded-xl border border-border bg-muted/20 overflow-hidden">
    <!-- 标题栏（右上角导航） -->
    <div class="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
      <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider">栈操作过程</span>
      <div class="flex items-center gap-2">
        <span class="text-xs text-muted-foreground">步骤 {{ currentStep + 1 }} / {{ totalSteps }}</span>
        <Button variant="ghost" size="icon" class="h-7 w-7" :disabled="currentStep === 0" @click="currentStep--">
          <ChevronLeft class="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" class="h-7 w-7" :disabled="currentStep === totalSteps - 1" @click="currentStep++">
          <ChevronRight class="h-4 w-4" />
        </Button>
      </div>
    </div>

    <!-- 步骤说明 -->
    <div class="px-4 py-2.5 border-b border-border/60 bg-primary/5">
      <p class="text-sm text-foreground/80 font-medium">{{ step.description }}</p>
    </div>

    <!-- 主体 -->
    <div class="p-4 flex gap-8 items-end">
      <!-- 栈（竖排，bottom → top） -->
      <div class="flex flex-col items-center gap-1">
        <span class="text-[10px] text-muted-foreground mb-1 font-bold uppercase tracking-wider">栈</span>
        <div v-if="step.stackState.length === 0"
          class="w-14 h-8 border-2 border-dashed border-border rounded flex items-center justify-center text-[10px] text-muted-foreground">
          空
        </div>
        <!-- 栈元素：数组最后一个是 top，col-reverse 让它显示在最上面 -->
        <div class="flex flex-col-reverse gap-1">
          <div
            v-for="(el, i) in step.stackState"
            :key="el"
            :class="['w-14 h-9 rounded flex items-center justify-center text-sm font-bold border-2 transition-[border-color,background-color] duration-150',
              i === step.stackState.length - 1
                ? 'border-primary bg-primary/15 text-primary'
                : 'border-border bg-background text-foreground/70']"
          >
            {{ el }}
          </div>
        </div>
        <div class="w-20 h-0.5 bg-muted-foreground/40 rounded mt-1"></div>
        <span class="text-[9px] text-muted-foreground">栈底</span>
      </div>

      <!-- 已出栈序列 -->
      <div class="flex-1">
        <span class="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-2">已出栈</span>
        <div class="flex flex-wrap gap-1.5 min-h-[36px] items-center">
          <span
            v-for="(el, i) in step.outputSoFar"
            :key="`out-${i}`"
            :class="['w-8 h-8 rounded flex items-center justify-center text-xs font-bold border transition-[border-color,background-color] duration-150',
              i === step.outputSoFar.length - 1 && step.op === 'pop'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                : 'border-border bg-muted/50 text-muted-foreground']"
          >
            {{ el }}
          </span>
          <span v-if="step.outputSoFar.length === 0" class="text-[11px] text-muted-foreground italic">（无）</span>
        </div>
      </div>
    </div>

    <!-- 图例 -->
    <div class="flex items-center gap-4 px-4 py-2.5 border-t border-border/60 text-xs text-muted-foreground">
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded border-2 border-primary bg-primary/15 inline-block"></span>栈顶
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded border border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 inline-block"></span>刚出栈
      </span>
      <span class="ml-auto">入栈序列：{{ visual.inputSequence.join(', ') }}</span>
    </div>
  </div>
</template>
