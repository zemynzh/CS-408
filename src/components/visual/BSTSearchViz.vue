<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { BSTSearchVisual, BSTSearchNode } from '@/types/exam'

const props = defineProps<{ visual: BSTSearchVisual }>()

const currentStep = ref(0)
const totalSteps = computed(() => props.visual.steps.length)
const step = computed(() => props.visual.steps[currentStep.value])

const nodeMap = computed(() => {
  const m: Record<string, BSTSearchNode> = {}
  for (const n of props.visual.nodes) m[n.id] = n
  return m
})

// SVG 布局
interface LayoutNode { id: string; x: number; y: number }
const NODE_R = 20
const LEVEL_H = 64
const PAD = 28

const layout = computed(() => {
  const map = nodeMap.value
  const result = new Map<string, LayoutNode>()
  let leafIdx = 0
  const leafOrder = new Map<string, number>()

  function collectLeaves(id: string) {
    const n = map[id]
    if (!n) return
    const hasL = n.left && map[n.left]
    const hasR = n.right && map[n.right]
    if (!hasL && !hasR) { leafOrder.set(id, leafIdx++); return }
    if (hasL) collectLeaves(n.left!)
    if (hasR) collectLeaves(n.right!)
  }
  collectLeaves(props.visual.rootId)

  const leafCount = leafOrder.size
  const usableW = Math.max(leafCount * 56, 280) - PAD * 2

  function depth(id: string): number {
    const n = map[id]
    if (!n) return 0
    return 1 + Math.max(
      n.left && map[n.left] ? depth(n.left) : 0,
      n.right && map[n.right] ? depth(n.right) : 0,
    )
  }
  const maxDepth = depth(props.visual.rootId)

  function place(id: string, d: number) {
    const n = map[id]
    if (!n) return
    const hasL = n.left && map[n.left]
    const hasR = n.right && map[n.right]
    if (!hasL && !hasR) {
      const pos = leafOrder.get(id) ?? 0
      const x = PAD + pos * (leafCount > 1 ? usableW / (leafCount - 1) : 0)
      result.set(id, { id, x, y: PAD + (maxDepth - 1) * LEVEL_H })
      return
    }
    if (hasL) place(n.left!, d + 1)
    if (hasR) place(n.right!, d + 1)
    const xs = [n.left && result.get(n.left)?.x, n.right && result.get(n.right)?.x]
      .filter((v): v is number => v !== undefined)
    result.set(id, { id, x: xs.reduce((a, b) => a + b, 0) / xs.length, y: PAD + (d - 1) * LEVEL_H })
  }
  place(props.visual.rootId, 1)
  return result
})

const svgSize = computed(() => {
  const nodes = [...layout.value.values()]
  return {
    w: Math.max(...nodes.map((n) => n.x)) + PAD + NODE_R,
    h: Math.max(...nodes.map((n) => n.y)) + PAD + NODE_R,
  }
})

const edges = computed(() => {
  const res: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (const n of props.visual.nodes) {
    const pos = layout.value.get(n.id)
    if (!pos) continue
    for (const cid of [n.left, n.right]) {
      const c = cid ? layout.value.get(cid) : null
      if (c) res.push({ x1: pos.x, y1: pos.y, x2: c.x, y2: c.y })
    }
  }
  return res
})

function nodeColor(id: string) {
  if (id === step.value.currentId) return { circle: 'fill-primary stroke-primary', text: 'fill-white' }
  if (id === step.value.candidateId) return { circle: 'fill-amber-400 stroke-amber-500 dark:fill-amber-500 dark:stroke-amber-400', text: 'fill-white' }
  if (step.value.visitedIds.includes(id)) return { circle: 'fill-emerald-500 stroke-emerald-600', text: 'fill-white' }
  return { circle: 'fill-background stroke-border', text: 'fill-foreground' }
}
</script>

<template>
  <div class="mt-6 rounded-xl border border-border bg-muted/20 overflow-hidden">
    <!-- 标题栏（右上角导航） -->
    <div class="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
      <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider">BST 中序遍历查最近邻</span>
      <div class="flex items-center gap-2">
        <span class="text-xs text-muted-foreground">步骤 {{ currentStep + 1 }} / {{ totalSteps }}</span>
        <Button variant="ghost" size="icon" class="h-7 w-7" :disabled="currentStep === 0" @click="currentStep--">
          <ChevronLeft class="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" class="h-7 w-7" :disabled="currentStep === totalSteps - 1" @click="currentStep++">
          <ChevronRight class="h-4 w-4" />
        </Button>
      </div>
    </div>

    <!-- 步骤说明 -->
    <div class="px-4 py-2.5 border-b border-border/60 bg-primary/5">
      <p class="text-sm text-foreground/80 font-medium">
        目标 K = <span class="font-bold text-primary">{{ visual.target }}</span>
        <span class="mx-2 text-muted-foreground/40">·</span>
        {{ step.description }}
      </p>
    </div>

    <!-- SVG 树 -->
    <div class="overflow-x-auto py-4 px-2">
      <svg :width="svgSize.w" :height="svgSize.h" class="mx-auto block">
        <line v-for="(e, i) in edges" :key="i"
          :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2"
          class="stroke-border" stroke-width="1.5" />
        <g v-for="n in layout.values()" :key="n.id">
          <circle :cx="n.x" :cy="n.y" :r="NODE_R"
            :class="['transition-[fill,stroke] duration-200', nodeColor(n.id).circle]"
            stroke-width="2" />
          <text :x="n.x" :y="n.y + 1" text-anchor="middle" dominant-baseline="middle"
            :class="['font-bold select-none transition-[fill] duration-200', nodeColor(n.id).text]"
            font-size="13">{{ nodeMap[n.id]?.val }}</text>
        </g>
      </svg>
    </div>

    <!-- 图例 -->
    <div class="flex items-center gap-4 px-4 py-2.5 border-t border-border/60 text-xs text-muted-foreground">
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-primary inline-block"></span>当前访问
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>当前最优候选
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>已访问
      </span>
    </div>
  </div>
</template>
