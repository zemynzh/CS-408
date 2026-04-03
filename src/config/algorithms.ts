export type AlgoSubjectKey = 'ds' | 'co' | 'os' | 'cn'

export interface AlgoItem {
  id: string
  name: string
  summary: string
  tags: string[]
  demoType?: 'stack' | 'queue' | 'binaryTreeTraversal' | 'bstNearest' | 'gantt' | 'tcp' | 'sort' | 'page' | 'disk' | 'graph' | 'kmp' | 'heap' | 'banker'
}

export interface AlgoSubject {
  key: AlgoSubjectKey
  label: string
  items: AlgoItem[]
}

export const ALGO_SUBJECTS: AlgoSubject[] = [
  {
    key: 'ds',
    label: '数据结构',
    items: [
      { id: 'ds-complexity', name: '复杂度分析', summary: '大 O/Θ/Ω、递推式、摊还分析', tags: ['基础'] },
      { id: 'ds-stack', name: '栈（入栈/出栈序列）', summary: '括号匹配、表达式求值、合法序列模拟', tags: ['线性表', '高频'], demoType: 'stack' },
      { id: 'ds-queue', name: '队列', summary: '循环队列、双端队列与典型应用', tags: ['线性表'], demoType: 'queue' },
      { id: 'ds-binary-tree', name: '二叉树遍历', summary: '先序/中序/后序/层次遍历推导与访问序列', tags: ['树', '高频'], demoType: 'binaryTreeTraversal' },
      { id: 'ds-bst', name: '二叉搜索树（BST）', summary: '插入/删除/查找与性质', tags: ['树'] },
      { id: 'ds-bst-nearest', name: 'BST 最近邻查找', summary: '沿搜索路径维护最优候选，比较差值更新', tags: ['树', '真题'], demoType: 'bstNearest' },
      { id: 'ds-heap', name: '堆 (Heap)', summary: '大顶堆/小顶堆的构建、插入与删除过程', tags: ['树', '高频'], demoType: 'heap' },
      { id: 'ds-hash', name: '散列表', summary: '哈希函数、冲突处理（开放定址/链地址）', tags: ['查找'] },
      { id: 'ds-uf', name: '并查集', summary: '路径压缩 + 按秩合并', tags: ['集合'] },
      { id: 'ds-sort', name: '经典排序', summary: '快排/归并/堆排/计数基数等，对比复杂度与稳定性', tags: ['排序', '高频'], demoType: 'sort' },
      { id: 'ds-graph', name: '图算法', summary: '广度优先搜索 (BFS) 与邻居节点访问过程', tags: ['图', '高频'], demoType: 'graph' },
      { id: 'ds-kmp', name: 'KMP 算法', summary: '字符串匹配、next 数组构建与滑动过程', tags: ['字符串', '高频'], demoType: 'kmp' },
    ],
  },
  {
    key: 'co',
    label: '组成原理',
    items: [
      { id: 'co-number', name: '数据表示与运算', summary: '补码、移位、乘除法、浮点规格化与舍入', tags: ['计算'] },
      { id: 'co-cache', name: 'Cache 与映射替换', summary: '直接/组相联/全相联、写策略与替换策略', tags: ['存储'] },
      { id: 'co-pipeline', name: '流水线与冒险处理', summary: '结构/数据/控制冒险，转发与停顿', tags: ['CPU'] },
    ],
  },
  {
    key: 'os',
    label: '操作系统',
    items: [
      { id: 'os-scheduling', name: 'CPU 调度', summary: 'FCFS/SJF/RR/优先级/多级反馈队列', tags: ['调度', '高频'], demoType: 'gantt' },
      { id: 'os-sync', name: '同步互斥', summary: 'PV/信号量经典问题', tags: ['并发', '高频'] },
      { id: 'os-deadlock', name: '死锁', summary: '银行家算法、检测与避免', tags: ['资源'], demoType: 'banker' },
      { id: 'os-page', name: '页面置换', summary: 'FIFO/LRU/Clock 与缺页统计', tags: ['内存', '高频'], demoType: 'page' },
      { id: 'os-disk', name: '磁盘调度', summary: 'SSTF/SCAN/C-SCAN', tags: ['I/O'], demoType: 'disk' },
    ],
  },
  {
    key: 'cn',
    label: '计算机网络',
    items: [
      { id: 'cn-routing', name: '路由算法', summary: '距离向量/链路状态（与最短路思想关联）', tags: ['网络层'] },
      { id: 'cn-reliable', name: '可靠传输', summary: '停等/GBN/SR 与超时重传', tags: ['传输层', '高频'] },
      { id: 'cn-congestion', name: '拥塞控制', summary: '慢开始/拥塞避免/快重传/快恢复', tags: ['传输层'] },
      { id: 'cn-tcp', name: 'TCP 过程演示', summary: '三次握手、滑动窗口与确认机制', tags: ['传输层', '真题'], demoType: 'tcp' },
      { id: 'cn-crc', name: 'CRC 与差错控制', summary: 'CRC 计算与校验思路', tags: ['链路层'] },
    ],
  },
]

