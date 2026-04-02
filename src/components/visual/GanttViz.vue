<script setup lang="ts">
import { computed } from 'vue'
import type { GanttVisual } from '@/types/exam'

const props = defineProps<{ visual: GanttVisual }>()

const PROCESS_COLORS: Record<string, { bar: string; label: string }> = {
  P1: { bar: 'bg-blue-500 dark:bg-blue-600', label: 'text-blue-600 dark:text-blue-400' },
  P2: { bar: 'bg-violet-500 dark:bg-violet-600', label: 'text-violet-600 dark:text-violet-400' },
  P3: { bar: 'bg-emerald-500 dark:bg-emerald-600', label: 'text-emerald-600 dark:text-emerald-400' },
  P4: { bar: 'bg-amber-500 dark:bg-amber-600', label: 'text-amber-600 dark:text-amber-400' },
  P5: { bar: 'bg-rose-500 dark:bg-rose-600', label: 'text-rose-600 dark:text-rose-400' },
}

const DEFAULT_COLOR = { bar: 'bg-muted-foreground', label: 'text-muted-foreground' }

// 所有进程名（去重保序）
const processes = computed(() => [...new Set(props.visual.segments.map((s) => s.process))])

// 时间轴刻度：每 10ms 一个刻度
const tickInterval = computed(() => {
  const total = props.visual.totalTime
  if (total <= 100) return 10
  if (total <= 300) return 20
  return 50
})
const ticks = computed(() => {
  const ticks: number[] = []
  for (let t = 0; t <= props.visual.totalTime; t += tickInterval.value) ticks.push(t)
  return ticks
})

function pct(t: number) {
  return (t / props.visual.totalTime) * 100
}

function segmentsFor(process: string) {
  return props.visual.segments.filter((s) => s.process === process)
}
</script>

<template>
  <div class="mt-6 rounded-xl border border-border bg-muted/20 overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
      <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider">进程调度甘特图</span>
    </div>

    <div class="px-4 py-2.5 border-b border-border/60 bg-primary/5">
      <p class="text-sm text-foreground/80 font-medium">{{ visual.description }}</p>
    </div>

    <div class="p-4 space-y-2 overflow-x-auto">
      <!-- 每个进程一行 -->
      <div v-for="proc in processes" :key="proc" class="flex items-center gap-3">
        <!-- 进程名标签 -->
        <div :class="['w-8 text-xs font-bold shrink-0 text-right', (PROCESS_COLORS[proc] ?? DEFAULT_COLOR).label]">
          {{ proc }}
        </div>
        <!-- 时间轴条 -->
        <div class="flex-1 relative h-8 bg-muted/50 rounded min-w-[400px]">
          <div
            v-for="seg in segmentsFor(proc)"
            :key="`${proc}-${seg.start}`"
            :class="['absolute top-0.5 bottom-0.5 rounded flex items-center justify-center text-[10px] font-bold text-white overflow-hidden',
                     (PROCESS_COLORS[proc] ?? DEFAULT_COLOR).bar]"
            :style="{ left: pct(seg.start) + '%', width: pct(seg.end - seg.start) + '%' }"
          >
            <span v-if="pct(seg.end - seg.start) > 4">{{ seg.start }}–{{ seg.end }}</span>
          </div>
        </div>
      </div>

      <!-- 时间轴刻度 -->
      <div class="flex items-center gap-3 mt-1">
        <div class="w-8 shrink-0"></div>
        <div class="flex-1 relative h-4 min-w-[400px]">
          <div
            v-for="t in ticks"
            :key="t"
            class="absolute top-0 flex flex-col items-center"
            :style="{ left: pct(t) + '%' }"
          >
            <div class="w-px h-2 bg-border"></div>
            <span class="text-[10px] text-muted-foreground -translate-x-1/2">{{ t }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-8 shrink-0"></div>
        <div class="text-xs text-muted-foreground">时间 / ms</div>
      </div>
    </div>

    <!-- 图例 -->
    <div class="flex flex-wrap gap-3 px-4 py-2.5 border-t border-border/60 text-xs text-muted-foreground">
      <span v-for="proc in processes" :key="proc" class="flex items-center gap-1.5">
        <span :class="['w-3 h-3 rounded-sm inline-block', (PROCESS_COLORS[proc] ?? DEFAULT_COLOR).bar]"></span>
        <span :class="(PROCESS_COLORS[proc] ?? DEFAULT_COLOR).label">{{ proc }}</span>
      </span>
    </div>
  </div>
</template>
