<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { GraphVisual } from '@/types/exam'

const props = withDefaults(
  defineProps<{
    visual: GraphVisual
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

    <div class="p-6 flex flex-col md:flex-row gap-8">
      <!-- 图形画布 -->
      <div class="flex-1 min-h-[300px] rounded-lg border border-border/50 bg-background/50 relative overflow-hidden">
        <svg width="100%" height="300" viewBox="0 0 300 300" class="mx-auto overflow-visible">
          <!-- 边 -->
          <line
            v-for="(e, i) in visual.edges"
            :key="`edge-${i}`"
            :x1="visual.nodes.find(n => n.id === e.from)?.x"
            :y1="visual.nodes.find(n => n.id === e.from)?.y"
            :x2="visual.nodes.find(n => n.id === e.to)?.x"
            :y2="visual.nodes.find(n => n.id === e.to)?.y"
            stroke="currentColor"
            stroke-width="1.5"
            :class="[
              'transition-all duration-500',
              step.visitedIds.includes(e.from) && step.visitedIds.includes(e.to) ? 'text-primary' : 'text-border'
            ]"
          />

          <!-- 节点 -->
          <g v-for="n in visual.nodes" :key="n.id" :transform="`translate(${n.x}, ${n.y})`" class="transition-all duration-500">
            <circle
              r="18"
              :class="[
                'stroke-2 transition-all duration-500',
                n.id === step.currentId ? 'fill-primary stroke-primary scale-125 shadow-xl' :
                step.visitedIds.includes(n.id) ? 'fill-primary/20 stroke-primary' :
                step.queueIds?.includes(n.id) || step.stackIds?.includes(n.id) ? 'fill-amber-500/10 stroke-amber-500 border-dashed' :
                'fill-background stroke-border'
              ]"
            />
            <text
              text-anchor="middle"
              dominant-baseline="middle"
              :class="[
                'text-[11px] font-bold select-none transition-all duration-500',
                n.id === step.currentId ? 'fill-primary-foreground' :
                step.visitedIds.includes(n.id) ? 'fill-primary' : 'fill-foreground'
              ]"
            >
              {{ n.label }}
            </text>
          </g>
        </svg>
      </div>

      <!-- 辅助状态 (队列/栈) -->
      <div class="w-full md:w-48 flex flex-col gap-6 shrink-0">
        <!-- 队列/栈 -->
        <div v-if="step.queueIds" class="flex-1">
          <span class="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-3">辅助队列 (BFS)</span>
          <div class="flex flex-col-reverse gap-1 p-2 rounded-lg bg-background/50 border border-border border-dashed min-h-[120px]">
            <div
              v-for="id in step.queueIds"
              :key="id"
              class="h-8 rounded flex items-center justify-center text-xs font-bold border border-amber-500 bg-amber-500/10 text-amber-600 transition-all duration-300"
            >
              {{ id }}
            </div>
          </div>
        </div>

        <!-- 已访问列表 -->
        <div>
          <span class="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-3">访问序列</span>
          <div class="flex flex-wrap gap-1.5">
            <div
              v-for="(id, idx) in step.visitedIds"
              :key="`v-${idx}`"
              class="w-7 h-7 rounded-md border border-primary bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold"
            >
              {{ id }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-4 px-4 py-2.5 border-t border-border/60 text-xs text-muted-foreground">
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-primary border border-primary inline-block"></span>当前访问
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-primary/20 border border-primary inline-block"></span>已访问
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-amber-500/10 border border-amber-500 border-dashed inline-block"></span>待访问 (队列)
      </span>
    </div>
  </div>
</template>
