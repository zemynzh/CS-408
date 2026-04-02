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

// ---- 联合类型 ----
export type ExamVisual =
  | HuffmanVisual
  | BinaryTreeVisual
  | BSTSearchVisual
  | StackVisual
  | GanttVisual
  | TCPVisual

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
