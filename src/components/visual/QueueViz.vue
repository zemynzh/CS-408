<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { QueueVisual } from '@/types/exam'

const props = withDefaults(
  defineProps<{
    visual: QueueVisual
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

watch(
  () => props.autoplayIntervalMs,
  () => {
    if (props.autoplay) start()
  },
)

onBeforeUnmount(() => stop())
</script>

<template>
  <div class="mt-6 rounded-xl border border-border bg-muted/20 overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
      <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider">队列操作过程</span>
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

    <div class="p-4 flex flex-col gap-8">
      <!-- 队列主体（横排） -->
      <div>
        <span class="text-[10px] text-muted-foreground mb-3 font-bold uppercase tracking-wider block">队列 (Head → Tail)</span>
        <div class="flex items-center gap-1 min-h-[60px] p-2 rounded-lg bg-background/50 border border-dashed border-border relative">
          <!-- 队头标识 -->
          <div v-if="step.queueState.length > 0" class="absolute -top-6 left-4 flex flex-col items-center">
            <span class="text-[9px] text-primary font-bold">FRONT</span>
            <div class="w-0.5 h-2 bg-primary"></div>
          </div>

          <div v-if="step.queueState.length === 0" class="w-full flex items-center justify-center text-xs text-muted-foreground italic">
            队列为空
          </div>

          <div
            v-for="(el, i) in step.queueState"
            :key="`q-${i}-${el}`"
            :class="['w-12 h-12 rounded-md flex items-center justify-center text-sm font-bold border-2 transition-all duration-300',
              i === 0 ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background text-foreground/70']"
          >
            {{ el }}
          </div>

          <!-- 队尾标识 -->
          <div v-if="step.queueState.length > 0" class="absolute -bottom-6 right-4 flex flex-col items-center">
            <div class="w-0.5 h-2 bg-muted-foreground/50"></div>
            <span class="text-[9px] text-muted-foreground font-bold">REAR</span>
          </div>
        </div>
      </div>

      <!-- 已出队序列 -->
      <div class="pt-4 border-t border-border/40">
        <span class="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-2">已出队 (输出序列)</span>
        <div class="flex flex-wrap gap-1.5 min-h-[36px] items-center">
          <span
            v-for="(el, i) in step.outputSoFar"
            :key="`out-${i}`"
            :class="['w-8 h-8 rounded flex items-center justify-center text-xs font-bold border transition-all duration-300',
              i === step.outputSoFar.length - 1 && step.op === 'dequeue'
                ? 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                : 'border-border bg-muted/50 text-muted-foreground']"
          >
            {{ el }}
          </span>
          <span v-if="step.outputSoFar.length === 0" class="text-[11px] text-muted-foreground italic">（等待出队...）</span>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-4 px-4 py-2.5 border-t border-border/60 text-xs text-muted-foreground">
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded border-2 border-primary bg-primary/10 inline-block"></span>队头 (Front)
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded border border-amber-500 bg-amber-50 dark:bg-amber-950/30 inline-block"></span>最新出队
      </span>
      <span class="ml-auto">输入序列：{{ visual.inputSequence.join(', ') }}</span>
    </div>
  </div>
</template>
