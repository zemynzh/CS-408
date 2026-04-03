<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { BankerVisual } from '@/types/exam'

const props = withDefaults(
  defineProps<{
    visual: BankerVisual
    autoplay?: boolean
    autoplayIntervalMs?: number
    hideControls?: boolean
  }>(),
  {
    autoplay: false,
    autoplayIntervalMs: 800,
    hideControls: false,
  },
)

const currentStep = ref(0)
const totalSteps = computed(() => props.visual.steps.length)
const step = computed(() => props.visual.steps[currentStep.value])

let timer: number | null = null
function stop() {
  if (timer) window.clearInterval(timer)
  timer = null
}

function start() {
  stop()
  currentStep.value = 0
  timer = window.setInterval(() => {
    if (currentStep.value >= totalSteps.value - 1) {
      stop()
      return
    }
    currentStep.value += 1
  }, props.autoplayIntervalMs)
}

watch(
  () => props.autoplay,
  (v) => {
    if (v) start()
    else stop()
  },
  { immediate: true },
)

watch(
  () => props.visual,
  () => {
    currentStep.value = 0
    if (props.autoplay) start()
  },
)

onBeforeUnmount(() => stop())
</script>

<template>
  <div class="mt-6 rounded-xl border border-border bg-muted/20 overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
      <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider">银行家算法演示 (死锁避免)</span>
      <div class="flex items-center gap-2">
        <span class="text-xs text-muted-foreground">步骤 {{ currentStep + 1 }} / {{ totalSteps }}</span>
        <template v-if="!hideControls">
          <Button variant="ghost" size="icon" class="h-7 w-7" :disabled="currentStep === 0" @click="currentStep--">
            <ChevronLeft class="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" class="h-7 w-7" :disabled="currentStep === totalSteps - 1" @click="currentStep++">
            <ChevronRight class="h-4 w-4" />
          </Button>
        </template>
      </div>
    </div>

    <div class="px-4 py-2.5 border-b border-border/60 bg-primary/5">
      <p class="text-sm text-foreground/80 font-medium">{{ step.description }}</p>
    </div>

    <div class="p-4 sm:p-6 flex flex-col gap-6">
      <!-- 资源矩阵表格 -->
      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left border-collapse">
          <thead>
            <tr class="bg-muted/50 border-y border-border">
              <th class="p-2 font-bold text-muted-foreground">进程</th>
              <th class="p-2 font-bold text-muted-foreground">Max (最大需求)</th>
              <th class="p-2 font-bold text-muted-foreground">Allocation (已分配)</th>
              <th class="p-2 font-bold text-muted-foreground">Need (还需)</th>
              <th class="p-2 font-bold text-muted-foreground text-center">状态</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(p, i) in visual.processes"
              :key="p"
              :class="[
                'border-b border-border/50 transition-colors duration-300',
                step.currentProcess === i ? 'bg-primary/5' :
                step.safeSequence.includes(i) ? 'bg-emerald-500/5' : ''
              ]"
            >
              <td class="p-2 font-mono font-bold">{{ p }}</td>
              <td class="p-2 font-mono">{{ visual.max[i].join(' ') }}</td>
              <td class="p-2 font-mono">{{ step.allocation[i].join(' ') }}</td>
              <td class="p-2 font-mono" :class="step.currentProcess === i ? 'text-primary font-bold' : ''">
                {{ step.need[i].join(' ') }}
              </td>
              <td class="p-2 text-center">
                <CheckCircle2 v-if="step.safeSequence.includes(i)" class="h-4 w-4 mx-auto text-emerald-500" />
                <span v-else-if="step.currentProcess === i" class="animate-pulse">
                  <component :is="step.isPossible === false ? XCircle : 'span'" :class="step.isPossible === false ? 'text-rose-500 h-4 w-4' : 'text-primary'" />
                </span>
                <span v-else class="text-[9px] text-muted-foreground opacity-30">Pending</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 当前系统可用向量 -->
      <div class="flex items-center gap-4 px-4 py-3 rounded-lg border border-primary/30 bg-primary/5">
        <div class="shrink-0 text-[10px] font-bold text-primary uppercase tracking-tight">Available Vector</div>
        <div class="flex gap-2">
          <div
            v-for="(v, i) in step.available"
            :key="`res-${i}`"
            class="w-10 h-10 rounded border border-primary/50 bg-background flex flex-col items-center justify-center shadow-sm transition-all duration-300"
          >
            <span class="text-[9px] text-muted-foreground font-bold">{{ visual.resources[i] }}</span>
            <span class="text-sm font-bold text-primary">{{ v }}</span>
          </div>
        </div>
      </div>

      <!-- 安全序列 -->
      <div class="mt-2">
        <span class="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-2">当前安全序列 (Safe Sequence)</span>
        <div class="flex flex-wrap items-center gap-2 min-h-[40px]">
          <template v-for="(idx, i) in step.safeSequence" :key="`seq-${i}`">
            <div class="px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/50 text-emerald-600 font-bold text-xs">
              {{ visual.processes[idx] }}
            </div>
            <span v-if="i < step.safeSequence.length - 1" class="text-muted-foreground opacity-30">→</span>
          </template>
          <span v-if="step.safeSequence.length === 0" class="text-[11px] text-muted-foreground italic">（寻找中...）</span>
        </div>
      </div>
    </div>
  </div>
</template>
