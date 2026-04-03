<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { BinaryTreeVisual, BinaryTreeNode } from '@/types/exam'

const props = withDefaults(
  defineProps<{
    visual: BinaryTreeVisual
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

// 自动播放逻辑
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

const NODE_R = 20
const LEVEL_H = 64
const PAD = 28

interface LayoutNode extends BinaryTreeNode {
  x: number
  y: number
}

const layout = computed(() => {
  const map = new Map(props.visual.nodes.map((n) => [n.id, n]))
  const result = new Map<string, LayoutNode>()

  let leafIdx = 0
  const leafOrder = new Map<string, number>()

  function collectLeaves(id: string) {
    const n = map.get(id)
    if (!n) return
    const hasL = n.left && map.has(n.left)
    const hasR = n.right && map.has(n.right)
    if (!hasL && !hasR) { leafOrder.set(id, leafIdx++); return }
    if (hasL) collectLeaves(n.left!)
    if (hasR) collectLeaves(n.right!)
  }
  collectLeaves(props.visual.rootId)

  const leafCount = leafOrder.size
  const usableW = Math.max(leafCount * 52, 260) - PAD * 2

  function depth(id: string): number {
    const n = map.get(id)
    if (!n) return 0
    return 1 + Math.max(
      n.left && map.has(n.left) ? depth(n.left) : 0,
      n.right && map.has(n.right) ? depth(n.right) : 0,
    )
  }
  const maxDepth = depth(props.visual.rootId)

  function place(id: string, d: number) {
    const n = map.get(id)
    if (!n) return
    const hasL = n.left && map.has(n.left)
    const hasR = n.right && map.has(n.right)
    if (!hasL && !hasR) {
      const pos = leafOrder.get(id) ?? 0
      const x = PAD + pos * (leafCount > 1 ? usableW / (leafCount - 1) : 0)
      result.set(id, { ...n, x, y: PAD + (maxDepth - 1) * LEVEL_H })
      return
    }
    if (hasL) place(n.left!, d + 1)
    if (hasR) place(n.right!, d + 1)
    const xs = [n.left && result.get(n.left)?.x, n.right && result.get(n.right)?.x]
      .filter((v): v is number => v !== undefined)
    result.set(id, { ...n, x: xs.reduce((a, b) => a + b, 0) / xs.length, y: PAD + (d - 1) * LEVEL_H })
  }
  place(props.visual.rootId, 1)
  return result
})

const svgSize = computed(() => {
  const nodes = [...layout.value.values()]
  return {
    w: Math.max(...nodes.map((n) => n.x)) + PAD + NODE_R,
    h: Math.max(...nodes.map((n) => n.y)) + PAD + NODE_R + 18,
  }
})

const edges = computed(() => {
  const res: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (const n of layout.value.values()) {
    for (const cid of [n.left, n.right]) {
      const c = cid ? layout.value.get(cid) : null
      if (c) res.push({ x1: n.x, y1: n.y, x2: c.x, y2: c.y })
    }
  }
  return res
})

const highlightSet = computed(() => new Set(step.value.highlightIds))
const visitedSet = computed(() => new Set(step.value.visitedIds))
</script>

<template>
  <div class="mt-6 rounded-xl border border-border bg-muted/20 overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
      <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider">二叉树构建与遍历推导</span>
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

    <div class="overflow-x-auto py-4 px-2">
      <svg :width="svgSize.w" :height="svgSize.h" class="mx-auto block">
        <line v-for="(e, i) in edges" :key="i"
          :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2"
          class="stroke-border" stroke-width="1.5" />

        <g v-for="n in layout.values()" :key="n.id">
          <circle :cx="n.x" :cy="n.y" :r="NODE_R"
            :class="[
              'transition-all duration-300',
              visitedSet.has(n.id) ? 'fill-emerald-500 stroke-emerald-600'
              : highlightSet.has(n.id) ? 'fill-primary stroke-primary'
              : 'fill-background stroke-border',
            ]"
            stroke-width="2" />
          <text :x="n.x" :y="n.y + 1" text-anchor="middle" dominant-baseline="middle"
            :class="['font-bold select-none', (visitedSet.has(n.id) || highlightSet.has(n.id)) ? 'fill-white' : 'fill-foreground']"
            font-size="13">{{ n.val }}</text>
        </g>
      </svg>
    </div>

    <div class="flex items-center gap-4 px-4 py-2.5 border-t border-border/60 text-xs text-muted-foreground">
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-primary inline-block"></span>当前分析
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>已确定
      </span>
    </div>
  </div>
</template>
