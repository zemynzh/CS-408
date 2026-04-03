<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { HeapVisual } from '@/types/exam'

const props = withDefaults(
  defineProps<{
    visual: HeapVisual
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

// 树节点坐标计算 (1, 2, 4...)
const nodePositions = [
  { x: 150, y: 40 },
  { x: 80, y: 100 }, { x: 220, y: 100 },
  { x: 40, y: 160 }, { x: 120, y: 160 }, { x: 180, y: 160 }, { x: 260, y: 160 },
]
</script>

<template>
  <div class="mt-6 rounded-xl border border-border bg-muted/20 overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
      <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider">大顶堆构建演示 (逐个插入)</span>
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

    <div class="p-6 flex flex-col gap-8">
      <!-- 堆树结构 -->
      <div class="h-[200px] flex items-center justify-center">
        <svg width="300" height="200" viewBox="0 0 300 200" class="overflow-visible">
          <!-- 边 -->
          <line
            v-for="i in step.heap.length - 1"
            :key="`edge-${i}`"
            :x1="nodePositions[Math.floor((i - 1) / 2)].x"
            :y1="nodePositions[Math.floor((i - 1) / 2)].y"
            :x2="nodePositions[i].x"
            :y2="nodePositions[i].y"
            stroke="currentColor"
            stroke-width="1.5"
            class="text-border transition-all duration-300"
          />

          <!-- 节点 -->
          <g v-for="(val, i) in step.heap" :key="`node-${i}`" :transform="`translate(${nodePositions[i].x}, ${nodePositions[i].y})`" class="transition-all duration-500">
            <circle
              r="16"
              :class="[
                'stroke-2 transition-all duration-500',
                step.highlightIndices.includes(i) ? 'fill-primary stroke-primary scale-110' : 'fill-background stroke-border'
              ]"
            />
            <text
              text-anchor="middle"
              dominant-baseline="middle"
              :class="[
                'text-xs font-bold select-none transition-all duration-500',
                step.highlightIndices.includes(i) ? 'fill-primary-foreground' : 'fill-foreground'
              ]"
            >
              {{ val }}
            </text>
          </g>
        </svg>
      </div>

      <!-- 数组表示 -->
      <div class="pt-6 border-t border-border/40">
        <span class="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-3">堆数组 (Array)</span>
        <div class="flex flex-wrap gap-1">
          <div
            v-for="(val, i) in step.heap"
            :key="`arr-${i}`"
            :class="[
              'w-10 h-10 rounded border flex items-center justify-center text-sm font-mono font-bold transition-all duration-300',
              step.highlightIndices.includes(i) ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background text-muted-foreground'
            ]"
          >
            {{ val }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
