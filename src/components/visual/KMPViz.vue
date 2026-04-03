<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { KMPVisual } from '@/types/exam'

const props = withDefaults(
  defineProps<{
    visual: KMPVisual
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
      <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider">KMP 算法演示</span>
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

    <div class="p-8 flex flex-col gap-12 overflow-x-auto">
      <!-- 主串 (Text) -->
      <div>
        <span class="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-3">主串 (Text)</span>
        <div class="flex gap-1 relative">
          <div
            v-for="(c, idx) in visual.text"
            :key="`text-${idx}`"
            :class="[
              'w-10 h-12 rounded-md flex items-center justify-center text-lg font-mono font-bold border-2 transition-all duration-300',
              idx === step.i ? 'border-primary bg-primary/10 text-primary scale-110' :
              idx < step.i - step.j ? 'border-border bg-muted/30 text-muted-foreground opacity-50' : 'border-border bg-background'
            ]"
          >
            {{ c }}
          </div>
          <!-- 指针 i -->
          <div
            class="absolute -top-8 transition-all duration-500 flex flex-col items-center"
            :style="{ left: `${step.i * 44 + 10}px` }"
          >
            <span class="text-[10px] text-primary font-bold">i</span>
            <div class="w-0.5 h-2 bg-primary"></div>
          </div>
        </div>
      </div>

      <!-- 模式串 (Pattern) -->
      <div class="relative">
        <span class="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-3">模式串 (Pattern)</span>
        <div
          class="flex gap-1 absolute transition-all duration-500"
          :style="{ left: `${(step.i - step.j) * 44}px` }"
        >
          <div
            v-for="(c, idx) in visual.pattern"
            :key="`pat-${idx}`"
            :class="[
              'w-10 h-12 rounded-md flex items-center justify-center text-lg font-mono font-bold border-2 transition-all duration-300',
              idx === step.j ? (visual.text[step.i] === visual.pattern[step.j] ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600' : 'border-rose-500 bg-rose-500/10 text-rose-600') :
              idx < step.j ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-600/60' : 'border-border bg-background'
            ]"
          >
            {{ c }}
          </div>
          <!-- 指针 j -->
          <div
            class="absolute -bottom-8 transition-all duration-500 flex flex-col items-center"
            :style="{ left: `${step.j * 44 + 10}px` }"
          >
            <div class="w-0.5 h-2 bg-muted-foreground"></div>
            <span class="text-[10px] text-muted-foreground font-bold">j</span>
          </div>
        </div>
      </div>

      <!-- next 数组状态 -->
      <div class="mt-8 pt-6 border-t border-border/40">
        <span class="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-3">Next 数组</span>
        <div class="flex gap-1">
          <div v-for="(v, idx) in step.next" :key="`next-${idx}`" class="flex flex-col items-center gap-1">
            <span class="text-[9px] text-muted-foreground font-mono">{{ idx }}</span>
            <div
              :class="[
                'w-8 h-8 rounded border flex items-center justify-center text-xs font-mono font-bold',
                idx === step.j - 1 ? 'border-amber-500 bg-amber-500/10 text-amber-600' : 'border-border bg-muted/20 text-muted-foreground'
              ]"
            >
              {{ v }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
