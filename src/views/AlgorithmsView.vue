<script setup lang="ts">
import { computed, defineAsyncComponent, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Sparkles, Play, Shuffle, ArrowLeft, ArrowRight, BookOpen, Layers, Settings2, FastForward } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { ALGO_SUBJECTS, type AlgoItem } from '@/config/algorithms'
import type {
  ExamVisual,
  StackVisual,
  QueueVisual,
  BinaryTreeVisual,
  BSTSearchVisual,
  GanttVisual,
  TCPVisual,
  SortVisual,
  PageVisual,
  DiskVisual,
  KMPVisual,
  GraphVisual,
  HeapVisual,
} from '@/types/exam'

// 自动导入所有算法构建函数
const algoDataModules = import.meta.glob('../data/algorithms/*.ts', { eager: true }) as Record<string, any>

const route = useRoute()
const router = useRouter()

const StackViz = defineAsyncComponent(() => import('@/components/visual/StackViz.vue'))
const QueueViz = defineAsyncComponent(() => import('@/components/visual/QueueViz.vue'))
const BinaryTreeViz = defineAsyncComponent(() => import('@/components/visual/BinaryTreeViz.vue'))
const BSTSearchViz = defineAsyncComponent(() => import('@/components/visual/BSTSearchViz.vue'))
const GanttViz = defineAsyncComponent(() => import('@/components/visual/GanttViz.vue'))
const TCPFlowViz = defineAsyncComponent(() => import('@/components/visual/TCPFlowViz.vue'))
const SortViz = defineAsyncComponent(() => import('@/components/visual/SortViz.vue'))
const PageViz = defineAsyncComponent(() => import('@/components/visual/PageViz.vue'))
const DiskViz = defineAsyncComponent(() => import('@/components/visual/DiskViz.vue'))
const KMPViz = defineAsyncComponent(() => import('@/components/visual/KMPViz.vue'))
const GraphViz = defineAsyncComponent(() => import('@/components/visual/GraphViz.vue'))
const HeapViz = defineAsyncComponent(() => import('@/components/visual/HeapViz.vue'))
const BankerViz = defineAsyncComponent(() => import('@/components/visual/BankerViz.vue'))

const activeDemo = ref<AlgoItem | null>(null)
const demoVisual = ref<ExamVisual | null>(null)
const autoPlay = ref(false)
const scrollEl = ref<HTMLElement | null>(null)
const mobileNavOpen = ref(false)

// 动画速度控制 (ms)
const animationSpeed = ref([800])

const algoId = computed(() => route.params.algoId as string)
const isAlgoDetail = computed(() => !!algoId.value)

// 获取所有算法叶子节点，用于前后翻页
const allAlgos = computed(() => {
  return ALGO_SUBJECTS.flatMap(s => s.items)
})

const activeAlgoIndex = computed(() => allAlgos.value.findIndex(a => a.id === algoId.value))
const canPrev = computed(() => activeAlgoIndex.value > 0)
const canNext = computed(() => activeAlgoIndex.value >= 0 && activeAlgoIndex.value < allAlgos.value.length - 1)

// 建立 demoType 到构建函数的映射
const demoBuilders: Record<string, () => ExamVisual> = {
  stack: algoDataModules['../data/algorithms/stack.ts']?.buildStackDemo,
  queue: algoDataModules['../data/algorithms/queue.ts']?.buildQueueDemo,
  binaryTreeTraversal: algoDataModules['../data/algorithms/binaryTree.ts']?.buildBinaryTreeTraversalDemo,
  bstNearest: algoDataModules['../data/algorithms/bst.ts']?.buildBSTNearestDemo,
  gantt: algoDataModules['../data/algorithms/scheduling.ts']?.buildGanttDemo,
  tcp: algoDataModules['../data/algorithms/tcp.ts']?.buildTCPDemo,
  sort: algoDataModules['../data/algorithms/sort.ts']?.buildSortDemo,
  page: algoDataModules['../data/algorithms/page.ts']?.buildPageReplacementDemo,
  disk: algoDataModules['../data/algorithms/disk.ts']?.buildDiskSchedulingDemo,
  kmp: algoDataModules['../data/algorithms/kmp.ts']?.buildKMPDemo,
  graph: algoDataModules['../data/algorithms/graph.ts']?.buildGraphTraversalDemo,
  heap: algoDataModules['../data/algorithms/heap.ts']?.buildHeapDemo,
  banker: algoDataModules['../data/algorithms/banker.ts']?.buildBankerDemo,
}

function buildVisualFor(item: AlgoItem): ExamVisual | null {
  const builder = demoBuilders[item.demoType || '']
  return builder ? builder() : null
}

function loadAlgo(id: string) {
  const item = allAlgos.value.find(a => a.id === id)
  if (item) {
    activeDemo.value = item
    demoVisual.value = buildVisualFor(item)
    autoPlay.value = true
    if (scrollEl.value) scrollEl.value.scrollTop = 0
  } else {
    activeDemo.value = null
    demoVisual.value = null
  }
}

function randomizeDemo() {
  if (activeDemo.value) {
    demoVisual.value = buildVisualFor(activeDemo.value)
    autoPlay.value = true
  }
}

function jumpToAlgo(id: string) {
  const subject = ALGO_SUBJECTS.find(s => s.items.some(i => i.id === id))
  if (subject) {
    mobileNavOpen.value = false
    router.push({ name: 'algorithms', params: { subject: subject.key, algoId: id } })
  }
}

function jumpToPrev() {
  if (canPrev.value) jumpToAlgo(allAlgos.value[activeAlgoIndex.value - 1].id)
}

function jumpToNext() {
  if (canNext.value) jumpToAlgo(allAlgos.value[activeAlgoIndex.value + 1].id)
}

function backToList() {
  router.push({ name: 'algorithms' })
}

onMounted(() => {
  if (algoId.value) loadAlgo(algoId.value)
})

watch(algoId, (newId) => {
  if (newId) loadAlgo(newId)
  else {
    activeDemo.value = null
    demoVisual.value = null
  }
})

const allCount = computed(() => ALGO_SUBJECTS.reduce((sum, s) => sum + s.items.length, 0))
</script>

<template>
  <div class="h-full flex flex-col bg-background overflow-hidden">
    <!-- Header: Consistent with ExamView header style -->
    <header v-if="isAlgoDetail" class="px-4 py-3 sm:px-6 sm:py-4 border-b border-border bg-background/50 backdrop-blur shrink-0">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <Button variant="ghost" size="icon" class="h-8 w-8 sm:h-9 sm:w-9" @click="backToList" title="返回列表">
            <ArrowLeft class="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <div>
            <h1 class="text-base sm:text-xl font-bold leading-snug">{{ activeDemo?.name }}</h1>
            <p class="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">{{ activeDemo?.summary }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2 ml-11 sm:ml-0">
          <!-- Speed Control -->
          <div class="hidden md:flex items-center gap-3 mr-4 px-3 py-1.5 rounded-full bg-muted/50 border border-border">
            <Settings2 class="h-3.5 w-3.5 text-muted-foreground" />
            <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-tight w-12">步长 {{ animationSpeed[0] }}ms</span>
            <Slider
              v-model="animationSpeed"
              :min="200"
              :max="2000"
              :step="100"
              class="w-24"
            />
          </div>

          <Button v-if="activeDemo?.demoType" variant="outline" size="sm" class="h-8 gap-2" @click="randomizeDemo">
            <Shuffle class="h-3.5 w-3.5" />
            随机生成
          </Button>
        </div>
      </div>
    </header>

    <div ref="scrollEl" class="flex-1 overflow-y-auto">
      <!-- 列表页：算法总览 -->
      <div v-if="!isAlgoDetail" class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 pb-24 lg:pb-10">
        <section class="relative overflow-hidden rounded-2xl border border-border bg-card/30">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div class="relative p-6 sm:p-8">
            <div class="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold text-foreground/80">
              <Sparkles class="h-3.5 w-3.5" />
              算法总览 · 分科目展示 · 纯前端可视化
            </div>
            <h1 class="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              408 高频算法与过程
            </h1>
            <p class="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
              按数据结构 / 组成原理 / 操作系统 / 计算机网络分组整理。可演示的内容提供随机参数的可视化步骤演示，便于理解与复盘。
            </p>
            <div class="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span class="inline-flex items-center rounded-md border border-border bg-background/50 px-2 py-1">共 {{ allCount }} 条</span>
              <span class="inline-flex items-center rounded-md border border-border bg-background/50 px-2 py-1">可视化：步骤演示</span>
              <span class="inline-flex items-center rounded-md border border-border bg-background/50 px-2 py-1">随机参数：一键生成</span>
            </div>
          </div>
        </section>

        <section v-for="subject in ALGO_SUBJECTS" :key="subject.key" class="mt-10">
          <div class="flex items-end justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold">{{ subject.label }}</h2>
              <div class="mt-1 text-xs text-muted-foreground">{{ subject.items.length }} 条</div>
            </div>
          </div>

          <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="item in subject.items"
              :key="item.id"
              class="rounded-xl border border-border bg-card/20 p-5 flex flex-col transition-all hover:border-primary/50 hover:bg-card/30"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="text-sm font-bold truncate">{{ item.name }}</div>
                  <div class="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {{ item.summary }}
                  </div>
                </div>
                <span v-if="item.demoType" class="shrink-0 inline-flex items-center rounded-md bg-primary/10 text-primary px-2 py-1 text-[11px] font-semibold">
                  演示
                </span>
              </div>

              <div class="mt-3 flex flex-wrap gap-1.5">
                <span
                  v-for="t in item.tags"
                  :key="t"
                  class="inline-flex items-center rounded-md border border-border bg-background/40 px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {{ t }}
                </span>
              </div>

              <div class="mt-4 flex items-center gap-2">
                <Button v-if="item.demoType" size="sm" variant="outline" class="w-full gap-2" @click="jumpToAlgo(item.id)">
                  <Play class="h-4 w-4" />
                  开始演示
                </Button>
                <div v-else class="text-xs text-muted-foreground py-2 italic">
                  暂无可视化
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 详情页：算法演示 -->
      <div v-else class="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24 lg:pb-10">
        <div class="flex flex-col gap-6">
          <!-- 可视化主体区域 -->
          <div class="min-h-[400px] rounded-2xl border border-border bg-card/30 p-4 sm:p-8">
            <div v-if="!demoVisual" class="h-full flex flex-col items-center justify-center text-muted-foreground py-20">
              <BookOpen class="h-12 w-12 mb-4 opacity-20" />
              <p>该算法暂未提供可视化演示。</p>
            </div>

            <template v-else>
              <StackViz v-if="demoVisual.type === 'stack'" :visual="demoVisual as StackVisual" :autoplay="autoPlay" :autoplay-interval-ms="animationSpeed[0]" />
            <QueueViz v-else-if="demoVisual.type === 'queue'" :visual="demoVisual as QueueVisual" :autoplay="autoPlay" :autoplay-interval-ms="animationSpeed[0]" />
            <BinaryTreeViz v-else-if="demoVisual.type === 'binaryTree'" :visual="demoVisual as BinaryTreeVisual" :autoplay="autoPlay" :autoplay-interval-ms="animationSpeed[0]" />
            <BSTSearchViz v-else-if="demoVisual.type === 'bstSearch'" :visual="demoVisual as BSTSearchVisual" :autoplay="autoPlay" :autoplay-interval-ms="animationSpeed[0]" />
            <SortViz v-else-if="demoVisual.type === 'sort'" :visual="demoVisual as SortVisual" :autoplay="autoPlay" :autoplay-interval-ms="animationSpeed[0]" />
            <PageViz v-else-if="demoVisual.type === 'page'" :visual="demoVisual as PageVisual" :autoplay="autoPlay" :autoplay-interval-ms="animationSpeed[0]" />
            <DiskViz v-else-if="demoVisual.type === 'disk'" :visual="demoVisual as DiskVisual" :autoplay="autoPlay" :autoplay-interval-ms="animationSpeed[0]" />
            <KMPViz v-else-if="demoVisual.type === 'kmp'" :visual="demoVisual as KMPVisual" :autoplay="autoPlay" :autoplay-interval-ms="animationSpeed[0]" />
            <GraphViz v-else-if="demoVisual.type === 'graph'" :visual="demoVisual as GraphVisual" :autoplay="autoPlay" :autoplay-interval-ms="animationSpeed[0]" />
            <HeapViz v-else-if="demoVisual.type === 'heap'" :visual="demoVisual as HeapVisual" :autoplay="autoPlay" :autoplay-interval-ms="animationSpeed[0]" />
            <BankerViz v-else-if="demoVisual.type === 'banker'" :visual="demoVisual as BankerVisual" :autoplay="autoPlay" :autoplay-interval-ms="animationSpeed[0]" />
              <GanttViz v-else-if="demoVisual.type === 'gantt'" :visual="demoVisual as GanttVisual" />
              <TCPFlowViz v-else-if="demoVisual.type === 'tcp'" :visual="demoVisual as TCPVisual" />
            </template>
          </div>

          <!-- 底部翻页导航 -->
          <div class="flex items-center justify-between pt-6 border-t border-border">
            <Button variant="ghost" :disabled="!canPrev" class="gap-2" @click="jumpToPrev">
              <ArrowLeft class="h-4 w-4" />
              <span class="hidden sm:inline">上一项：{{ canPrev ? allAlgos[activeAlgoIndex - 1].name : '无' }}</span>
              <span class="sm:hidden">上一项</span>
            </Button>
            <Button variant="ghost" :disabled="!canNext" class="gap-2" @click="jumpToNext">
              <span class="hidden sm:inline">下一项：{{ canNext ? allAlgos[activeAlgoIndex + 1].name : '无' }}</span>
              <span class="sm:hidden">下一项</span>
              <ArrowRight class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- 移动端：底部切换导航 (与 Knowledge/Exam 一致) -->
    <div v-if="isAlgoDetail" class="lg:hidden">
      <Sheet v-model:open="mobileNavOpen">
        <SheetTrigger as-child>
          <Button
            variant="secondary"
            class="fixed z-40 bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)]"
            aria-label="打开算法导航"
          >
            <Layers class="h-4 w-4 mr-2" />
            <span class="flex-1 text-left">算法导航</span>
            <span class="text-xs text-muted-foreground">
              {{ activeDemo?.name || '选择算法' }}
            </span>
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom" class="p-0">
          <SheetHeader class="px-4 py-3 border-b border-border">
            <SheetTitle class="text-left">全部算法目录</SheetTitle>
          </SheetHeader>

          <ScrollArea class="h-[70vh]">
            <div class="p-4 space-y-6">
              <div v-for="subject in ALGO_SUBJECTS" :key="subject.key">
                <h3 class="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 px-1">{{ subject.label }}</h3>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="a in subject.items"
                    :key="a.id"
                    type="button"
                    :class="[
                      'w-full rounded-md border px-3 py-2 text-left text-[12px] leading-snug transition-colors',
                      activeDemo?.id === a.id
                        ? 'border-primary bg-primary/10 text-primary font-semibold'
                        : 'border-border bg-background hover:bg-accent hover:text-accent-foreground',
                    ]"
                    @click="jumpToAlgo(a.id)"
                  >
                    <span class="line-clamp-1">{{ a.name }}</span>
                    <span v-if="a.demoType" class="mt-1 block text-[9px] opacity-60">
                      支持演示
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</template>
