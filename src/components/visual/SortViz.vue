<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { SortVisual } from '@/types/exam'

const props = withDefaults(
  defineProps<{
    visual: SortVisual
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

const maxVal = computed(() => Math.max(...props.visual.initialArray, 100))
</script>

<template>
  <div class="mt-6 rounded-xl border border-border bg-muted/20 overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
      <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider">{{ visual.algorithm }} 演示</span>
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

    <div class="p-8 flex items-end justify-center gap-2 min-h-[300px]">
      <div
        v-for="(val, i) in step.array"
        :key="i"
        class="relative flex flex-col items-center group"
        :style="{ width: '40px' }"
      >
        <!-- 数值标签 -->
        <span class="absolute -top-8 text-[10px] font-mono font-bold transition-all duration-300"
          :class="[
            step.comparing?.includes(i) ? 'text-primary scale-125' :
            step.swapping?.includes(i) ? 'text-amber-500 scale-125' :
            step.sortedIndices.includes(i) ? 'text-emerald-500' : 'text-muted-foreground'
          ]"
        >
          {{ val }}
        </span>

        <!-- 柱状图 -->
        <div
          class="w-full rounded-t-sm transition-all duration-300 border-x border-t"
          :style="{ height: `${(val / maxVal) * 200}px` }"
          :class="[
            step.comparing?.includes(i) ? 'bg-primary/80 border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]' :
            step.swapping?.includes(i) ? 'bg-amber-400 border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.3)]' :
            step.sortedIndices.includes(i) ? 'bg-emerald-500/80 border-emerald-600' :
            'bg-muted-foreground/20 border-border'
          ]"
        ></div>

        <!-- 索引标签 -->
        <span class="mt-2 text-[9px] text-muted-foreground font-mono">{{ i }}</span>
      </div>
    </div>

    <div class="flex items-center gap-4 px-4 py-2.5 border-t border-border/60 text-xs text-muted-foreground">
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-sm bg-primary/80 inline-block"></span>比较中
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-sm bg-amber-400 inline-block"></span>交换中
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-sm bg-emerald-500/80 inline-block"></span>已就位
      </span>
    </div>
  </div>
</template>
