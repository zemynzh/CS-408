// ==============================
// 可视化数据类型
// ==============================

// ---- 哈夫曼树 ----
export interface HuffmanNode {
  id: string
  weight: number
  label?: string
  left?: string
  right?: string
}
export interface HuffmanStep {
  description: string
  nodes: HuffmanNode[]
  mergeIds: [string, string]
  newId: string
}
export interface HuffmanVisual {
  type: 'huffman'
  finalRootId: string
  steps: HuffmanStep[]
}

// ---- 二叉树（含遍历推导高亮） ----
export interface BinaryTreeNode {
  id: string
  val: string
  left?: string
  right?: string
}
export interface TraversalStep {
  description: string
  highlightIds: string[]   // 当前高亮节点（蓝色）
  visitedIds: string[]     // 已确认访问节点（绿色）
}
export interface BinaryTreeVisual {
  type: 'binaryTree'
  nodes: BinaryTreeNode[]
  rootId: string
  steps: TraversalStep[]
}

// ---- BST 查找最近邻（第41题） ----
export interface BSTSearchNode {
  id: string
  val: number
  left?: string
  right?: string
}
export interface BSTSearchStep {
  description: string
  currentId: string        // 当前访问节点（蓝色）
  candidateId?: string     // 当前最优候选节点（琥珀色）
  visitedIds: string[]     // 已访问（灰色）
}
export interface BSTSearchVisual {
  type: 'bstSearch'
  nodes: BSTSearchNode[]
  rootId: string
  target: number           // 查找目标 K
  steps: BSTSearchStep[]
}

// ---- 栈操作过程（第42题） ----
export interface StackStep {
  description: string
  op: 'push' | 'pop'
  element: number
  stackState: number[]     // 操作后栈内容，bottom → top
  outputSoFar: number[]    // 已出栈的元素序列
}
export interface StackVisual {
  type: 'stack'
  inputSequence: number[]  // 入栈序列（原始顺序）
  steps: StackStep[]
}

// ---- 进程调度甘特图（第45题） ----
export interface GanttSegment {
  process: string         // 进程名
  start: number           // 开始时间 ms
  end: number             // 结束时间 ms
}
export interface GanttVisual {
  type: 'gantt'
  segments: GanttSegment[]
  totalTime: number
  description: string
}

// ---- TCP 交互过程（第47题） ----
export interface TCPPacket {
  from: 'client' | 'server'
  label: string            // 简短标注，如 SYN, ACK, [1, 500]
  seq?: number | string
  ack?: number | string
  payload?: string         // 详细负载说明
  time: number             // 发送时刻 ms
  arrival: number          // 到达时刻 ms
}
export interface TCPVisual {
  type: 'tcp'
  packets: TCPPacket[]
  totalTime: number
  description: string
}

// ---- 队列操作过程 ----
export interface QueueStep {
  description: string
  op: 'enqueue' | 'dequeue'
  element: number
  queueState: number[]     // 队列内容
  outputSoFar: number[]    // 已出队的元素序列
}
export interface QueueVisual {
  type: 'queue'
  inputSequence: number[]
  steps: QueueStep[]
}

// ---- 排序过程 ----
export interface SortStep {
  description: string
  array: number[]          // 当前数组状态
  comparing?: [number, number] // 正在比较的索引
  swapping?: [number, number]  // 正在交换的索引
  sortedIndices: number[]      // 已确定有序的索引
}
export interface SortVisual {
  type: 'sort'
  algorithm: string        // 排序算法名称
  initialArray: number[]
  steps: SortStep[]
}

// ---- 页面置换算法 ----
export interface PageStep {
  description: string
  access: number           // 当前访问的页面号
  frames: (number | null)[] // 当前物理块状态
  hit: boolean             // 是否命中
  replaced?: number | null // 被替换的页面号
}
export interface PageVisual {
  type: 'page'
  algorithm: string
  referenceString: number[]
  frameCount: number
  steps: PageStep[]
}

// ---- 磁盘调度算法 ----
export interface DiskStep {
  description: string
  currentPos: number       // 当前磁头位置
  moveDistance: number     // 本次移动距离
  visitedIndex: number     // 访问的请求索引
}
export interface DiskVisual {
  type: 'disk'
  algorithm: string
  initialPos: number
  requests: number[]
  steps: DiskStep[]
  totalDistance: number
}

// ---- 图算法 (BFS/DFS) ----
export interface GraphNode {
  id: string
  label: string
  x: number
  y: number
}
export interface GraphEdge {
  from: string
  to: string
}
export interface GraphStep {
  description: string
  visitedIds: string[]
  queueIds?: string[]      // BFS 队列
  stackIds?: string[]      // DFS 栈
  currentId?: string
}
export interface GraphVisual {
  type: 'graph'
  algorithm: string
  nodes: GraphNode[]
  edges: GraphEdge[]
  steps: GraphStep[]
}

// ---- KMP 算法 ----
export interface KMPStep {
  description: string
  i: number                // 主串指针
  j: number                // 模式串指针
  matchCount: number       // 当前匹配长度
  next: number[]           // next 数组状态
}
export interface KMPVisual {
  type: 'kmp'
  text: string
  pattern: string
  steps: KMPStep[]
}

// ---- 堆 (Heap) ----
export interface HeapStep {
  description: string
  heap: number[]           // 堆数组状态
  highlightIndices: number[] // 正在交换或比较的索引
}
export interface HeapVisual {
  type: 'heap'
  initialArray: number[]
  steps: HeapStep[]
}

// ---- 银行家算法 (Banker's Algorithm) ----
export interface BankerStep {
  description: string
  allocation: number[][]   // 已分配矩阵
  need: number[][]         // 需求矩阵
  available: number[]      // 当前可用向量
  safeSequence: number[]   // 当前安全序列
  currentProcess?: number  // 正在检查的进程索引
  isPossible?: boolean     // 是否可以通过检查
}
export interface BankerVisual {
  type: 'banker'
  processes: string[]
  resources: string[]
  max: number[][]
  steps: BankerStep[]
}

// ---- 联合类型 ----
export type ExamVisual =
  | HuffmanVisual
  | BinaryTreeVisual
  | BSTSearchVisual
  | StackVisual
  | GanttVisual
  | TCPVisual
  | QueueVisual
  | SortVisual
  | PageVisual
  | DiskVisual
  | GraphVisual
  | KMPVisual
  | HeapVisual
  | BankerVisual

// ==============================
// 题目数据类型
// ==============================

export interface ExamExplanation {
  knowledgePoints: string[]
  analysis: string
  visual?: ExamVisual
}

export interface ChoiceQuestion {
  id: number
  subject: string
  question: string
  options: string[]
  answer: string
  explanation: ExamExplanation & { whyWrong?: Record<string, string> }
}

export interface AnswerQuestion {
  id: number
  subject: string
  question: string
  explanation: ExamExplanation
}

/** 题目卡片内的科目徽章样式（背景+文字） */
export const SUBJECT_BADGE_COLOR: Record<string, string> = {
  '数据结构': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  '组成原理': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  '操作系统': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  '计算机网络': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
}
