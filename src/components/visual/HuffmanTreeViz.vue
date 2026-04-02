<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { HuffmanVisual, HuffmanNode } from '@/types/exam'

const props = defineProps<{ visual: HuffmanVisual }>()

const currentStep = ref(0)
const totalSteps = computed(() => props.visual.steps.length)
const step = computed(() => props.visual.steps[currentStep.value])

// ---- 布局计算 ----
// 将当前步骤的节点树布局到 SVG 坐标系
// 递归计算每个节点的 (x, y)，叶节点均匀分布，内节点取子节点中心

const NODE_R = 22
const LEVEL_H = 72
const SVG_PADDING = 32

interface LayoutNode extends HuffmanNode {
  x: number
  y: number
  depth: number
}

function buildLayout(nodes: HuffmanNode[], rootId: string): Map<string, LayoutNode> {
  const map = new Map(nodes.map((n) => [n.id, n]))
  const layout = new Map<string, LayoutNode>()

  // 找出所有叶节点（没有 left/right 的节点，或者子节点不在当前步骤节点集里）
  // 先计算最大深度和叶节点顺序
  let leafOrder = 0
  const leafPositions = new Map<string, number>()

  function collectLeaves(id: string) {
    const node = map.get(id)
    if (!node) return
    const hasLeft = node.left && map.has(node.left)
    const hasRight = node.right && map.has(node.right)
    if (!hasLeft && !hasRight) {
      leafPositions.set(id, leafOrder++)
    } else {
      if (hasLeft) collectLeaves(node.left!)
      if (hasRight) collectLeaves(node.right!)
    }
  }
  collectLeaves(rootId)

  const leafCount = leafPositions.size
  const svgWidth = Math.max(leafCount * (NODE_R * 2 + 20), 300)

  function calcDepth(id: string): number {
    const node = map.get(id)
    if (!node) return 0
    const ld = node.left && map.has(node.left) ? calcDepth(node.left) : 0
    const rd = node.right && map.has(node.right) ? calcDepth(node.right) : 0
    return Math.max(ld, rd) + 1
  }
  const maxDepth = calcDepth(rootId)

  function place(id: string, depth: number) {
    const node = map.get(id)
    if (!node) return
    const hasLeft = node.left && map.has(node.left)
    const hasRight = node.right && map.has(node.right)

    if (!hasLeft && !hasRight) {
      const pos = leafPositions.get(id) ?? 0
      const x = SVG_PADDING + pos * ((svgWidth - SVG_PADDING * 2) / Math.max(leafCount - 1, 1))
      const y = SVG_PADDING + (maxDepth - 1) * LEVEL_H
      layout.set(id, { ...node, x, y, depth })
    } else {
      if (hasLeft) place(node.left!, depth + 1)
      if (hasRight) place(node.right!, depth + 1)

      const leftNode = hasLeft ? layout.get(node.left!) : null
      const rightNode = hasRight ? layout.get(node.right!) : null
      const childX = [leftNode?.x, rightNode?.x].filter((v): v is number => v !== undefined)
      const x = childX.reduce((a, b) => a + b, 0) / childX.length
      const y = SVG_PADDING + (depth - 1) * LEVEL_H
      layout.set(id, { ...node, x, y, depth })
    }
  }
  place(rootId, 1)

  return layout
}

// 当前步骤的布局
const layout = computed(() => {
  const nodes = step.value.nodes
  // 找当前步骤的根节点：没有被任何节点引用的节点
  const childIds = new Set(nodes.flatMap((n) => [n.left, n.right].filter(Boolean) as string[]))
  const root = nodes.find((n) => !childIds.has(n.id))
  if (!root) return new Map<string, LayoutNode>()
  return buildLayout(nodes, root.id)
})

// SVG 宽高
const svgSize = computed(() => {
  const xs = [...layout.value.values()].map((n) => n.x)
  const ys = [...layout.value.values()].map((n) => n.y)
  const w = xs.length ? Math.max(...xs) + SVG_PADDING + NODE_R : 300
  const h = ys.length ? Math.max(...ys) + SVG_PADDING + NODE_R : 200
  return { w, h }
})

// 边列表
const edges = computed(() => {
  const result: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (const node of layout.value.values()) {
    for (const childId of [node.left, node.right]) {
      if (!childId) continue
      const child = layout.value.get(childId)
      if (child) result.push({ x1: node.x, y1: node.y, x2: child.x, y2: child.y })
    }
  }
  return result
})

const mergeSet = computed(() => new Set(step.value.mergeIds))
</script>

<template>
  <div class="mt-6 rounded-xl border border-border bg-muted/20 overflow-hidden">
    <!-- 标题栏 -->
    <div class="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
      <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider">哈夫曼树构建过程</span>
      <div class="flex items-center gap-2">
        <span class="text-xs text-muted-foreground">步骤 {{ currentStep + 1 }} / {{ totalSteps }}</span>
        <Button
          variant="ghost" size="icon"
          class="h-7 w-7"
          :disabled="currentStep === 0"
          @click="currentStep--"
        >
          <ChevronLeft class="h-4 w-4" />
        </Button>
        <Button
          variant="ghost" size="icon"
          class="h-7 w-7"
          :disabled="currentStep === totalSteps - 1"
          @click="currentStep++"
        >
          <ChevronRight class="h-4 w-4" />
        </Button>
      </div>
    </div>

    <!-- 步骤说明 -->
    <div class="px-4 py-2.5 border-b border-border/60 bg-primary/5">
      <p class="text-sm text-foreground/80 font-medium">{{ step.description }}</p>
    </div>

    <!-- SVG 树图 -->
    <div class="overflow-x-auto py-4 px-2">
      <svg
        :width="svgSize.w"
        :height="svgSize.h"
        class="mx-auto block"
      >
        <!-- 边 -->
        <line
          v-for="(edge, i) in edges"
          :key="i"
          :x1="edge.x1" :y1="edge.y1"
          :x2="edge.x2" :y2="edge.y2"
          class="stroke-border"
          stroke-width="1.5"
        />

        <!-- 节点 -->
        <g
          v-for="node in layout.values()"
          :key="node.id"
        >
          <!-- 圆形背景 -->
          <circle
            :cx="node.x" :cy="node.y" :r="NODE_R"
            :class="[
              'transition-all duration-300',
              node.id === step.newId
                ? 'fill-primary stroke-primary'
                : mergeSet.has(node.id)
                  ? 'fill-amber-100 stroke-amber-400 dark:fill-amber-900/40 dark:stroke-amber-500'
                  : 'fill-background stroke-border',
            ]"
            stroke-width="2"
          />
          <!-- 权值 -->
          <text
            :x="node.x" :y="node.y + 1"
            text-anchor="middle" dominant-baseline="middle"
            :class="[
              'text-xs font-bold select-none',
              node.id === step.newId ? 'fill-primary-foreground' : 'fill-foreground',
            ]"
            font-size="13"
          >{{ node.weight }}</text>
          <!-- 叶节点标签 -->
          <text
            v-if="node.label"
            :x="node.x" :y="node.y + NODE_R + 14"
            text-anchor="middle"
            class="fill-muted-foreground select-none"
            font-size="11"
          >{{ node.label }}</text>
        </g>
      </svg>
    </div>

    <!-- 图例 -->
    <div class="flex items-center gap-4 px-4 py-2.5 border-t border-border/60 text-xs text-muted-foreground">
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-amber-200 dark:bg-amber-800 border border-amber-400 inline-block"></span>
        本步参与合并
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-primary inline-block"></span>
        本步合并结果
      </span>
    </div>
  </div>
</template>
