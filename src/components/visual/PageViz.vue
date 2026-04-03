<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { PageVisual } from '@/types/exam'

const props = withDefaults(
  defineProps<{
    visual: PageVisual
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

    <div class="p-6">
      <!-- 访问序列 -->
      <div class="mb-8">
        <span class="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-3">页面访问序列</span>
        <div class="flex flex-wrap gap-1">
          <div
            v-for="(p, i) in visual.referenceString"
            :key="i"
            :class="[
              'w-8 h-10 rounded flex items-center justify-center text-xs font-bold border transition-all duration-300',
              i === currentStep ? 'border-primary bg-primary text-primary-foreground scale-110 shadow-lg z-10' :
              i < currentStep ? 'border-border bg-muted/30 text-muted-foreground opacity-50' : 'border-border bg-background'
            ]"
          >
            {{ p }}
          </div>
        </div>
      </div>

      <!-- 物理块状态 -->
      <div class="flex flex-col items-center gap-6">
        <div class="flex gap-4">
          <div
            v-for="(f, i) in step.frames"
            :key="i"
            :class="[
              'w-16 h-20 rounded-lg flex flex-col items-center justify-center border-2 transition-all duration-500 relative',
              f === step.access ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'border-border bg-background'
            ]"
          >
            <span class="text-[10px] text-muted-foreground absolute top-1">块 {{ i }}</span>
            <span class="text-xl font-bold" :class="f === step.access ? 'text-emerald-600 dark:text-emerald-400' : ''">
              {{ f ?? '-' }}
            </span>
            <div v-if="f === step.replaced" class="absolute -bottom-6 flex flex-col items-center animate-bounce">
              <div class="w-0.5 h-2 bg-rose-500"></div>
              <span class="text-[9px] text-rose-500 font-bold">REPLACED</span>
            </div>
          </div>
        </div>

        <!-- 命中/缺页标识 -->
        <div
          :class="[
            'px-6 py-2 rounded-full text-sm font-bold border transition-all duration-300',
            step.hit ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600' : 'bg-rose-500/10 border-rose-500 text-rose-600'
          ]"
        >
          {{ step.hit ? 'HIT (命中)' : 'MISS (缺页)' }}
        </div>
      </div>
    </div>

    <div class="flex items-center gap-4 px-4 py-2.5 border-t border-border/60 text-xs text-muted-foreground">
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500 inline-block"></span>命中
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded bg-rose-500/20 border border-rose-500 inline-block"></span>缺页
      </span>
    </div>
  </div>
</template>
