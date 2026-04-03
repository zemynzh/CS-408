<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { ChevronLeft, ChevronRight, MousePointer2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { DiskVisual } from '@/types/exam'

const props = withDefaults(
  defineProps<{
    visual: DiskVisual
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

// 绘制路径所需数据
const pathPoints = computed(() => {
  return props.visual.steps.slice(0, currentStep.value + 1).map((s, idx) => ({
    x: s.currentPos,
    y: idx * 30 + 20,
  }))
})

const maxTrack = 200
const tracks = Array.from({ length: 11 }, (_, i) => i * 20)
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

    <div class="p-6">
      <div class="relative w-full overflow-x-auto pb-4">
        <svg :width="maxTrack + 40" :height="totalSteps * 30 + 40" viewBox="-20 -10 240 300" class="mx-auto overflow-visible">
          <!-- 坐标轴背景 -->
          <g v-for="t in tracks" :key="t">
            <line :x1="t" y1="0" :x2="t" :y2="totalSteps * 30 + 10" stroke="currentColor" stroke-dasharray="2,2" class="text-border" />
            <text :x="t" y="-5" text-anchor="middle" class="text-[9px] fill-muted-foreground">{{ t }}</text>
          </g>

          <!-- 历史轨迹 -->
          <polyline
            v-if="pathPoints.length > 1"
            :points="pathPoints.map(p => `${p.x},${p.y}`).join(' ')"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            class="text-primary/60 transition-all duration-500"
          />

          <!-- 访问过的点 -->
          <circle
            v-for="(p, i) in pathPoints"
            :key="i"
            :cx="p.x"
            :cy="p.y"
            r="3"
            class="fill-primary"
          />

          <!-- 当前磁头指示器 -->
          <g :transform="`translate(${step.currentPos}, ${currentStep * 30 + 20})`" class="transition-all duration-500">
            <MousePointer2 class="h-4 w-4 -rotate-45 fill-amber-500 text-amber-500 shadow-lg" />
            <text x="12" y="4" class="text-[10px] font-bold fill-amber-600 dark:fill-amber-400">Head: {{ step.currentPos }}</text>
          </g>

          <!-- 待访问请求点 -->
          <g v-for="(r, i) in visual.requests" :key="`req-${i}`">
            <circle
              v-if="!visual.steps.slice(0, currentStep + 1).some(s => s.visitedIndex === i)"
              :cx="r"
              y="0"
              r="2"
              class="fill-muted-foreground/30"
            />
          </g>
        </svg>
      </div>

      <div class="mt-6 flex flex-wrap gap-4 text-xs">
        <div class="px-3 py-1.5 rounded-md bg-muted/50 border border-border">
          <span class="text-muted-foreground">累计寻道距离:</span>
          <span class="ml-2 font-bold text-primary">{{ visual.steps.slice(0, currentStep + 1).reduce((sum, s) => sum + s.moveDistance, 0) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
