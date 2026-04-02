import type { ChoiceQuestion, AnswerQuestion } from '@/types/exam'

export const CHOICE_QUESTIONS: ChoiceQuestion[] = [
  {
    id: 1,
    subject: '数据结构',
    question: '当存储空间有足够的空闲空间时，在保持表内元素顺序相对不变的情况下，下列哪些操作会必然导致产生移动次数（ ）。\nI. 表头插入一个元素\nII. 表头删除一个元素\nIII. 表尾插入一个元素\nIV. 表尾删除一个元素',
    options: ['I、II', 'I、III', 'II、IV', 'III、IV'],
    answer: 'A',
    explanation: {
      knowledgePoints: ['顺序表的插入删除操作', '时间复杂度分析'],
      analysis: '顺序表中，在表头插入或删除一个元素需要移动后面所有的 n 个元素，时间复杂度为 O(n)。而在表尾插入或删除一个元素则不需要移动任何元素，时间复杂度为 O(1)。因此只有 I 和 II 必然产生移动。',
    },
  },
  {
    id: 2,
    subject: '数据结构',
    question: '设有一个双向链表 L，结构为 [p2, p1]，头结点为 head。初始时 head = cu。现要将每个结点的 p2 指向 p1指向结点的直接后继，应该进行的操作是（ ）。',
    options: [
      'while(cu!=NULL) {cu->p2=cu->p1->p1; cu=cu->p1;}',
      'while(cu!=NULL && cu->p2!=NULL) {cu->p2 = cu->p1->p1; cu = cu->p1;}',
      'while(cu!=NULL) {if(cu->p1!=NULL) {cu->p2=cu->p1->p1; cu=cu->p1;}}',
      'while(cu!=NULL) {if(cu->p1!=NULL) {cu->p2=cu->p1->p1;} else {cu->p2=NULL; cu=cu->p1;}}',
    ],
    answer: 'D',
    explanation: {
      knowledgePoints: ['双向链表遍历', '边界条件处理'],
      analysis: '在遍历链表时，需要考虑当前结点的 p1（后继）是否为空。如果 cu->p1 为空（即当前是尾结点），则 cu->p1->p1 会引发空指针异常。选项 D 通过 if 判断，在 p1 不为空时指向后继的后继，在 p1 为空时将 p2 置为 NULL，逻辑最完整。',
    },
  },
  {
    id: 3,
    subject: '数据结构',
    question: '已知二叉树 T 的中序遍历为 b, e, d, f, c, a, g。层序遍历为 a, b, g, c, d, e, f。则其后序遍历序列为多少？',
    options: [
      'c, e, d, f, b, g, a',
      'c, e, f, d, b, g, a',
      'e, f, d, c, b, g, a',
      'e, g, f, d, b, c, a',
    ],
    answer: 'C',
    explanation: {
      knowledgePoints: ['二叉树遍历', '构造二叉树'],
      analysis: '1. 层序遍历首位 a 是根。\n2. 中序遍历中 a 左侧为 {b, e, d, f, c}（左子树），右侧为 {g}（右子树）。\n3. 左子树中，层序最早出现的是 b，故 b 是左子树根。\n4. 中序中 b 左侧为空，右侧为 {e, d, f, c}。\n5. 层序中 c 在 b 之后，故 c 是 b 的右孩子；中序 c 左有 {e,d,f}，右为空。\n6. d 是 c 的左孩子，中序 d 左 e，右 f。\n7. 后序遍历：e, f, d, c, b, g, a。',
      visual: {
        type: 'binaryTree' as const,
        rootId: 'a',
        nodes: [
          { id: 'a', val: 'a', left: 'b', right: 'g' },
          { id: 'b', val: 'b', right: 'c' },
          { id: 'g', val: 'g' },
          { id: 'c', val: 'c', left: 'd' },
          { id: 'd', val: 'd', left: 'e', right: 'f' },
          { id: 'e', val: 'e' },
          { id: 'f', val: 'f' },
        ],
        steps: [
          {
            description: '层序首位 a 是根节点。',
            highlightIds: ['a'],
            visitedIds: [],
          },
          {
            description: '中序中 a 左侧 {b,e,d,f,c} 为左子树，右侧 {g} 为右子树。层序左子树首现 b，故 b 是 a 左孩子；g 是 a 右孩子。',
            highlightIds: ['b', 'g'],
            visitedIds: ['a'],
          },
          {
            description: '中序 b 无左节点；{e,d,f,c} 为 b 的右子树。层序中 c 在 b 右子树范围内最先出现，故 c 是 b 的右孩子。',
            highlightIds: ['c'],
            visitedIds: ['a', 'b', 'g'],
          },
          {
            description: '中序中 c 左侧 {e,d,f} 为 c 的左子树，c 无右孩子。层序 d 最先出现，故 d 是 c 的左孩子。',
            highlightIds: ['d'],
            visitedIds: ['a', 'b', 'g', 'c'],
          },
          {
            description: '中序 d 左为 e，右为 f，故 e 是 d 左孩子，f 是 d 右孩子。树重建完成！',
            highlightIds: ['e', 'f'],
            visitedIds: ['a', 'b', 'g', 'c', 'd'],
          },
          {
            description: '后序遍历（左→右→根）结果：e, f, d, c, b, g, a。答案为 C。',
            highlightIds: [],
            visitedIds: ['e', 'f', 'd', 'c', 'b', 'g', 'a'],
          },
        ],
      },
    },
  },
  {
    id: 4,
    subject: '数据结构',
    question: '森林 F 中有 5 颗树，其节点个数分别为 2、3、4、5、7，森林中树的次序可以任意，问 F 对应的二叉树最小高度为多少？',
    options: ['5', '6', '8', '10'],
    answer: 'B',
    explanation: {
      knowledgePoints: ['森林与二叉树的转换', '二叉树高度计算'],
      analysis: '森林转二叉树规则：左孩子指向第一棵子树，右孩子指向下一棵树（兄弟）。\n要使二叉树高度最小，应将高度最高（节点最多）的树作为二叉树的根（第一棵），其余树作为右链。节点数为 7 的树转换后最大高度可能为 7（最坏）或较小（如完全二叉树）。考虑 7 个节点的树作为根，其本身高度至少为 3。接下来的树依次挂在右链上。通过优化排列，最小高度可以达到 6。',
    },
  },
  {
    id: 5,
    subject: '数据结构',
    question: '假设二叉树中节点权值为 a=1 , b=2 , c=4 , d=5 , e=8 , f=10 , g=12 。当带权路径长度（WPL）最小时，与节点 e （权值 8）处于相同深度的节点是哪些？',
    options: ['d', 'g', 'd,f', 'f,g'],
    answer: 'D',
    explanation: {
      knowledgePoints: ['哈夫曼树构造', 'WPL最小化'],
      analysis: '每次选两个权值最小的节点合并，共合并 6 次（n-1 次，n=7）。\n最终树中 e(8) 在第 2 层（从根算），同层节点为 f(10) 和 g(12)，故选 D。\nWPL = 1×4 + 2×4 + 4×3 + 5×3 + 8×2 + 10×2 + 12×2 = 98。',
      visual: {
        type: 'huffman',
        finalRootId: 'm6',
        steps: [
          {
            description: '初始：将所有叶节点按权值排列，每次选最小的两个合并',
            nodes: [
              { id: 'a', weight: 1, label: 'a' },
              { id: 'b', weight: 2, label: 'b' },
              { id: 'c', weight: 4, label: 'c' },
              { id: 'd', weight: 5, label: 'd' },
              { id: 'e', weight: 8, label: 'e' },
              { id: 'f', weight: 10, label: 'f' },
              { id: 'g', weight: 12, label: 'g' },
            ],
            mergeIds: ['a', 'b'],
            newId: 'a',
          },
          {
            description: '第 1 步：合并 a(1) + b(2) → 新节点 m1(3)',
            nodes: [
              { id: 'm1', weight: 3, left: 'a', right: 'b' },
              { id: 'a', weight: 1, label: 'a' },
              { id: 'b', weight: 2, label: 'b' },
              { id: 'c', weight: 4, label: 'c' },
              { id: 'd', weight: 5, label: 'd' },
              { id: 'e', weight: 8, label: 'e' },
              { id: 'f', weight: 10, label: 'f' },
              { id: 'g', weight: 12, label: 'g' },
            ],
            mergeIds: ['a', 'b'],
            newId: 'm1',
          },
          {
            description: '第 2 步：合并 m1(3) + c(4) → 新节点 m2(7)',
            nodes: [
              { id: 'm2', weight: 7, left: 'm1', right: 'c' },
              { id: 'm1', weight: 3, left: 'a', right: 'b' },
              { id: 'a', weight: 1, label: 'a' },
              { id: 'b', weight: 2, label: 'b' },
              { id: 'c', weight: 4, label: 'c' },
              { id: 'd', weight: 5, label: 'd' },
              { id: 'e', weight: 8, label: 'e' },
              { id: 'f', weight: 10, label: 'f' },
              { id: 'g', weight: 12, label: 'g' },
            ],
            mergeIds: ['m1', 'c'],
            newId: 'm2',
          },
          {
            description: '第 3 步：合并 d(5) + m2(7) → 新节点 m3(12)',
            nodes: [
              { id: 'm3', weight: 12, left: 'd', right: 'm2' },
              { id: 'd', weight: 5, label: 'd' },
              { id: 'm2', weight: 7, left: 'm1', right: 'c' },
              { id: 'm1', weight: 3, left: 'a', right: 'b' },
              { id: 'a', weight: 1, label: 'a' },
              { id: 'b', weight: 2, label: 'b' },
              { id: 'c', weight: 4, label: 'c' },
              { id: 'e', weight: 8, label: 'e' },
              { id: 'f', weight: 10, label: 'f' },
              { id: 'g', weight: 12, label: 'g' },
            ],
            mergeIds: ['d', 'm2'],
            newId: 'm3',
          },
          {
            description: '第 4 步：合并 e(8) + f(10) → 新节点 m4(18)',
            nodes: [
              { id: 'm4', weight: 18, left: 'e', right: 'f' },
              { id: 'e', weight: 8, label: 'e' },
              { id: 'f', weight: 10, label: 'f' },
              { id: 'm3', weight: 12, left: 'd', right: 'm2' },
              { id: 'd', weight: 5, label: 'd' },
              { id: 'm2', weight: 7, left: 'm1', right: 'c' },
              { id: 'm1', weight: 3, left: 'a', right: 'b' },
              { id: 'a', weight: 1, label: 'a' },
              { id: 'b', weight: 2, label: 'b' },
              { id: 'c', weight: 4, label: 'c' },
              { id: 'g', weight: 12, label: 'g' },
            ],
            mergeIds: ['e', 'f'],
            newId: 'm4',
          },
          {
            description: '第 5 步：合并 g(12) + m3(12) → 新节点 m5(24)',
            nodes: [
              { id: 'm5', weight: 24, left: 'g', right: 'm3' },
              { id: 'g', weight: 12, label: 'g' },
              { id: 'm3', weight: 12, left: 'd', right: 'm2' },
              { id: 'd', weight: 5, label: 'd' },
              { id: 'm2', weight: 7, left: 'm1', right: 'c' },
              { id: 'm1', weight: 3, left: 'a', right: 'b' },
              { id: 'a', weight: 1, label: 'a' },
              { id: 'b', weight: 2, label: 'b' },
              { id: 'c', weight: 4, label: 'c' },
              { id: 'm4', weight: 18, left: 'e', right: 'f' },
              { id: 'e', weight: 8, label: 'e' },
              { id: 'f', weight: 10, label: 'f' },
            ],
            mergeIds: ['g', 'm3'],
            newId: 'm5',
          },
          {
            description: '第 6 步：合并 m4(18) + m5(24) → 根节点 m6(42)，哈夫曼树构建完成',
            nodes: [
              { id: 'm6', weight: 42, left: 'm4', right: 'm5' },
              { id: 'm4', weight: 18, left: 'e', right: 'f' },
              { id: 'e', weight: 8, label: 'e' },
              { id: 'f', weight: 10, label: 'f' },
              { id: 'm5', weight: 24, left: 'g', right: 'm3' },
              { id: 'g', weight: 12, label: 'g' },
              { id: 'm3', weight: 12, left: 'd', right: 'm2' },
              { id: 'd', weight: 5, label: 'd' },
              { id: 'm2', weight: 7, left: 'm1', right: 'c' },
              { id: 'm1', weight: 3, left: 'a', right: 'b' },
              { id: 'a', weight: 1, label: 'a' },
              { id: 'b', weight: 2, label: 'b' },
              { id: 'c', weight: 4, label: 'c' },
            ],
            mergeIds: ['m4', 'm5'],
            newId: 'm6',
          },
        ],
      },
    },
  },
  {
    id: 6,
    subject: '数据结构',
    question: '有向图 G=(V,E) 采用邻接表存储，求某点入度的时间复杂度为？',
    options: ['O(|V|)', 'O(min(|V|,|E|))', 'O(|E|)', 'O(max(|V|,|E|))'],
    answer: 'C',
    explanation: {
      knowledgePoints: ['图的存储结构', '邻接表', '入度计算'],
      analysis: '邻接表只直接存储了出边（邻接点）。要统计某个顶点的入度，必须遍历整个图中所有顶点的邻接表，检查是否有指向该顶点的边。这意味着需要检查所有的边一次，因此时间复杂度为 O(|E|)。',
    },
  },
  {
    id: 7,
    subject: '数据结构',
    question: '设有序向图 G=(V,E) ，其中顶点集 V 的大小为 n=|V| ，每条边 e∈E 都标记有一个唯一的字符（不同边可标记相同字符）。定义字符串集 S 为：所有由 G 中任意一条路径（路径可包含单个顶点，对应空字符串）上的边标记按顺序拼接而成的字符串的集合。以下说法错误的是（ ）',
    options: [
      '若 G 无环，则 S 是有限集',
      '若 G 无环，则 S 中存在长度为 n 的字符串',
      '若 G 有环，则 S 中存在长度大于 n 的字符串',
      '若 G 有环，则 S 中存在长度小于 2n 的字符串',
    ],
    answer: 'B',
    explanation: {
      knowledgePoints: ['图的路径', '有向无环图（DAG）性质'],
      analysis: 'A 正确：无环图路径长度有限，字符串集必为有限集。\nB 错误：n 个顶点的无环图中，最长路径包含 n 个顶点，但只有 n-1 条边，因此最长字符串长度为 n-1。不存在长度为 n 的字符串。\nC 正确：有环可以无限循环，产生任意长度字符串。\nD 正确：有环图同样可以包含空串或短路径。',
    },
  },
  {
    id: 8,
    subject: '数据结构',
    question: '已知平衡二叉树（AVL 树）的定义为：树中任意一个节点的左右子树的高度差的绝对值不超过 1，且左右子树均为平衡二叉树。若某平衡二叉树的高度为 4（根节点的高度记为 1），则其根节点的左右子树的节点数之差最多为（ ）',
    options: ['1', '2', '3', '5'],
    answer: 'D',
    explanation: {
      knowledgePoints: ['AVL树性质', '最少节点数公式'],
      analysis: '高度为 h 的 AVL 树最少节点数 N(h) = N(h-1) + N(h-2) + 1。\nN(0)=0, N(1)=1, N(2)=2, N(3)=4, N(4)=7。\n要使左右子树节点差最大，可以让一棵子树尽量“满”（高度为 3），另一棵尽量“稀疏”（高度为 2）。\n高度 3 的子树最多节点数为 2^3-1 = 7；高度 2 的子树最少节点数为 N(2)=2。\n差值为 7 - 2 = 5。',
    },
  },
  {
    id: 9,
    subject: '数据结构',
    question: '使用直接插入排序对序列进行升序排序，以下比较次数最少的是（ ）',
    options: [
      '30,27,56,41,80,95,69',
      '31,43,26,55,63,99,77',
      '61,84,51,23,34,91,40',
      '93,32,48,81,50,21,72',
    ],
    answer: 'A',
    explanation: {
      knowledgePoints: ['直接插入排序', '排序算法复杂度'],
      analysis: '直接插入排序在序列越接近“正序”时比较次数越少。选项 A 的逆序对最少，相对最有序，因此比较次数最少。',
    },
  },
  {
    id: 10,
    subject: '数据结构',
    question: '现有 n 名学生的成绩记录，每位学生的记录包含两门课程的成绩：课程 1（记为 C1​ ）和课程 2（记为 C2​ ）。\n排序规则如下：\n首先，依据 C1​ 成绩升序排列；\n若两名学生的 C1​ 成绩相同，则依据其总分（即 C1​+C2​ ）升序排列。\n请从下列排序算法中，选择最适合实现上述需求的算法（ ）',
    options: ['基数排序', '快速排序', '希尔排序', '选择排序'],
    answer: 'A',
    explanation: {
      knowledgePoints: ['多关键字排序', '基数排序'],
      analysis: '题目要求按 C1 排序，C1 相同时按总分排序。这是典型的多关键字排序。基数排序天然支持多关键字排序（先按次要关键字排序，再按主要关键字排序），且不需要复杂的自定义比较逻辑，在这种场景下非常适合。',
    },
  },
  {
    id: 11,
    subject: '数据结构',
    question: '在外部排序的 k 路归并过程中，归并趟数为 d 。下列关于 k 、 d 、初始归并段及内存大小的说法中，正确的是（ ）\nⅠ. k 越大， d 越小\nⅡ. 初始归并段数不影响 d\nⅢ. 内存大小限制初始归并段的最大长度',
    options: ['Ⅰ', 'Ⅰ、Ⅱ', 'Ⅰ、Ⅲ', 'Ⅱ、Ⅲ'],
    answer: 'C',
    explanation: {
      knowledgePoints: ['外部排序', 'k路归并'],
      analysis: 'Ⅰ 正确：归并趟数 d = ⌈log_k m⌉，其中 m 为初始归并段数。k 增大，d 减小。\nⅡ 错误：由公式可知，初始归并段数 m 直接决定了 d。\nⅢ 正确：初始归并段是在内存中生成的，受内存容量限制。',
    },
  },
  {
    id: 12,
    subject: '组成原理',
    question: '下列关于计算机的系统层次的叙述，错误的是',
    options: [
      '最上层是应用软件层',
      '指令集体系结构是软件和硬件的接口',
      '计算机组成 (即微架构) 属于指令集体系结构的物理实现层',
      '操作系统可通过 ISA 进行抽象，向上层软件提供服务',
    ],
    answer: 'C',
    explanation: {
      knowledgePoints: ['计算机系统层次结构', 'ISA的概念'],
      analysis: '计算机组成（微架构）是指令集体系结构（ISA）的逻辑实现，而不是物理实现层。物理实现层通常指逻辑门、电路和工艺。',
    },
  },
  {
    id: 13,
    subject: '组成原理',
    question: '对机器数 1010 0110B 先执行算术右移 3 位，再执行算术左移 2 位，最终结果是（ ）。',
    options: ['1101 0000B', '1101 0011B', '0101 0000B', '0101 0011B'],
    answer: 'A',
    explanation: {
      knowledgePoints: ['算术移位'],
      analysis: '1010 0110B 算术右移 3 位（符号位补 1）：1111 0100B。\n1111 0100B 算术左移 2 位（低位补 0）：1101 0000B。',
    },
  },
  {
    id: 14,
    subject: '组成原理',
    question: '已知用 IEEE 754 单精度浮点数表示浮点型变量，采用就近舍入（中间值取偶数）。若浮点型变量 x 为 12.1 ，则 x 的机器数是（ ）',
    options: ['4141 9999H', '4141 999AH', '41E0 CCCCH', '41E0 CCCDH'],
    answer: 'B',
    explanation: {
      knowledgePoints: ['IEEE 754浮点数表示', '舍入规则'],
      analysis: '12.1 转换为二进制并规格化后，由于 0.1 无法精确表示，需要进行舍入。单精度 23 位尾数，第 24 位及以后为 1001...，超过 0.5 ULP，进位舍入后得到末位为 A。',
    },
  },
  {
    id: 15,
    subject: '组成原理',
    question: '用 8 个 64 M×8 bit 的 DRAM 芯片按交叉编址方式构成主存储器，并与一个宽度为 64 bit 的存储器总线相连。主存每次最多读写 64 bit，且按字节编址。则下列地址中，与主存地址 0018 001DH 位于同一芯片中的是（ ）',
    options: ['0000 01D5H', '000F A020H', '0018 001EH', '0101 0011B'],
    answer: 'A',
    explanation: {
      knowledgePoints: ['多模块存储器', '交叉编址'],
      analysis: '8 个芯片构成 64 位宽，即每个地址对应一个字节。交叉编址下，地址对 8 取模决定芯片。0x1D % 8 = 5。选项 A 中 0x1D5 % 8 = 5，处于同一芯片。',
    },
  },
  {
    id: 16,
    subject: '组成原理',
    question: '下列不是由指令集体系结构规定的是（）',
    options: ['输入输出指令', '采用向量中断', '虚拟存储管理方式', '指令流水线是否使用超级流水线技术'],
    answer: 'D',
    explanation: {
      knowledgePoints: ['ISA vs 计算机组成'],
      analysis: '指令流水线的具体实现细节（如是否使用超级流水线）属于计算机组成的微架构范畴，不属于 ISA 规定的范畴。',
    },
  },
  {
    id: 17,
    subject: '组成原理',
    question: '哪些指令可能不改变程序下一条指令的地址？\nⅠ. 条件转移\nⅡ. 过程调用\nⅢ. 陷入指令\nⅣ. 返回',
    options: ['Ⅰ、Ⅱ', 'Ⅰ、Ⅳ', 'Ⅱ、Ⅲ', 'Ⅱ、Ⅳ'],
    answer: 'B',
    explanation: {
      knowledgePoints: ['程序计数器PC', '控制流指令'],
      analysis: '条件转移（不满足时）和某些特殊情况下的返回可能按顺序执行。但在考研语境下，该题通常考察哪些指令“可能”保持当前执行流或具有特定行为。',
    },
  },
  {
    id: 18,
    subject: '组成原理',
    question: '某计算机按字节编址，数据 Cache 共有 1024 行，采用 4 路组相联映射，主存块大小为 32 B，若访问主存地址为 1028 的 4 字节数据，则该数据所在主存块对应的组号为（ ）',
    options: ['4', '16', '32', '64'],
    answer: 'C',
    explanation: {
      knowledgePoints: ['Cache 映射', '组相联'],
      analysis: '1024 行 / 4 路 = 256 组。主存块大小 32B。主存块号 = 1028 // 32 = 32。组号 = 块号 % 256 = 32 % 256 = 32。',
    },
  },
  {
    id: 19,
    subject: '组成原理',
    question: '某计算机按字节编址，虚拟地址为 16 位，页大小为 256B，页表项中包含装入位（P）、页框号（PPN）等字段。TLB 采用 4 路组相联映射，共有 16 个页表项，TLB 表项中包含标记（Tag）、有效位（V）等字段。在主存页表与 TLB 表项同步后，若主存页表中页号 22 对应的页表项中 P=0 ， PPN=2AH ，则下列不可能出现在组号为 2 的 TLB 表项中的是（ ）',
    options: [
      'Tag-05H, V-1, PPN=1CH',
      'Tag=06H，V=1，PPN=2AH',
      'Tag=16H，V=0，PPN=2AH',
      'Tag-1AH，V=0，PPN-1CH',
    ],
    answer: 'B',
    explanation: {
      knowledgePoints: ['虚拟存储器', 'TLB 映射'],
      analysis: 'P=0 表示页面不在主存。如果页面不在主存，TLB 中对应的有效位 V 必须为 0。选项 B 中 V=1 但 PPN 是 2AH（对应 P=0 的页），逻辑矛盾。',
    },
  },
  {
    id: 20,
    subject: '组成原理',
    question: '在不考虑异常中断处理和访存的额外开销下，下列关于数据通路结构与 CPI 之间的关系正确的为（）\nI. 单周期数据通路计算机的 CPI 等于 1\nII. 多周期数据通路计算机的 CPI 大于 1\nIII. 流水线数据通路计算机的 CPI 等于 1',
    options: ['仅 I、II', '仅 I、III', '仅 II、III', 'I、II、III'],
    answer: 'D',
    explanation: {
      knowledgePoints: ['CPI的概念', '数据通路类型'],
      analysis: '理想情况下：单周期每条指令 1 个时钟周期；多周期需要多个；流水线虽然每条指令耗时多个周期，但吞吐率为每周期 1 条，CPI 趋近 1。',
    },
  },
  {
    id: 21,
    subject: '组成原理',
    question: '在 I/O 子系统中，驱动程序和中断服务程序直接控制外设与主机之间的输入/输出操作，这一过程需要使用一些特权指令。下列指令中，不属于特权指令的是（）',
    options: ['I/O 指令', '关中断指令', '中断返回指令', '系统调用指令'],
    answer: 'D',
    explanation: {
      knowledgePoints: ['特权指令', '系统调用'],
      analysis: '系统调用指令（如 trap/int）是用户态程序主动进入内核态的手段，可以在用户态执行。其他选项涉及硬件直接控制，必须在内核态执行。',
    },
  },
  {
    id: 22,
    subject: '组成原理',
    question: '中断控制 I/O 方式下，实现 I/O 需要硬件 and 软件协同完成，中断响应和处理过程中所包含的下列工作中，必须由硬件完成的是（）',
    options: ['开中断', '中断', '保存断点', '保存通用寄存器'],
    answer: 'C',
    explanation: {
      knowledgePoints: ['中断处理过程'],
      analysis: '中断隐指令（硬件完成）的任务包括：关中断、保存断点、引出中断服务程序。保存通用寄存器通常由软件（服务程序开头）完成。',
    },
  },
  {
    id: 23,
    subject: '操作系统',
    question: '下列操作中，在内核模式执行的是（）',
    options: ['编译程序', '链接程序', '装入程序', '命令解释程序'],
    answer: 'C',
    explanation: {
      knowledgePoints: ['操作系统内核', '用户态与内核态'],
      analysis: '装入程序（Loader）涉及修改内存分配、修改页表等系统资源，通常需要内核权限。编译、链接和命令解释都在用户空间运行。',
    },
  },
  {
    id: 24,
    subject: '操作系统',
    question: '在支持虚拟存储器系统下的指令执行过程中，正确的是（）',
    options: ['地址转换由操作系统完成', '页表项的内容由编译器确定', '缺页中断由硬件直接处理', '异常由操作系统处理'],
    answer: 'D',
    explanation: {
      knowledgePoints: ['虚拟存储器', '地址转换', '中断/异常处理'],
      analysis: 'A 错误：地址转换主要由硬件 MMU 完成。B 错误：页表内容由 OS 维护。C 错误：缺页中断由硬件触发，但由 OS 软件处理。D 正确。',
    },
  },
  {
    id: 25,
    subject: '操作系统',
    question: '下列关于的线程描述中，正确的是（）',
    options: [
      '内核级线程和用户级线程都由操作系统创建',
      '多个内核级线程可以映射到一个用户级线程',
      '同一个进程下的多个内核级线程共享进程栈',
      '同一个进程下的多个线程共享进程堆',
    ],
    answer: 'D',
    explanation: {
      knowledgePoints: ['线程的概念与实现'],
      analysis: 'A 错误：用户级线程由线程库管理。B 错误：通常是多对一（多用户对一内核）。C 错误：线程有各自的独立栈。D 正确。',
    },
  },
  {
    id: 26,
    subject: '操作系统',
    question: '系统中有 8 个进程，执行下图的操作，资源 S 的初始值为 5。若此时 S 的值为 -2，其中 m 表示执行到访问资源的进程个数，n 表示阻塞的进程个数，则 m 和 n 的值分别是（ ）',
    options: ['5, 2', '5, 1', '6, 2', '7, 1'],
    answer: 'A',
    explanation: {
      knowledgePoints: ['信号量机制', 'PV操作'],
      analysis: 'S = 5。若 S = -2，表示有 2 个进程处于阻塞状态（n=2）。S 初始为 5，降到 -2 需要 7 次 wait。7 次 wait 中，5 个成功访问资源（m=5），2 个阻塞。',
    },
  },
  {
    id: 27,
    subject: '操作系统',
    question: '假设进程 P 的读、写进程集合分别是 R(P) 和 W(P) ，进程 Q 的读、写进程集合分别为 R(Q) 和 W(Q) ，则进程 P 和 Q 并发执行中，不会发生错误的并发执行充要条件是（ ）\nI. R(Q)∩W(P)=∅\nII. R(P)∩R(Q)=∅\nIII. W(P)∩W(Q)=∅\nIV. R(P)∩W(Q)=∅',
    options: ['I、II', 'I、II、III', 'I、III、IV', 'II、III'],
    answer: 'C',
    explanation: {
      knowledgePoints: ['Bernstein条件', '并发执行'],
      analysis: '并发执行互不干扰的 Bernstein 条件：R(P)∩W(Q)=∅，W(P)∩R(Q)=∅，W(P)∩W(Q)=∅。读读不冲突（Ⅱ 不必要）。',
    },
  },
  {
    id: 28,
    subject: '操作系统',
    question: '若 64 位的系统采用三级虚拟分页存储管理方式，其结构如下图所示，第三级页表所占用的页框数是（ ）\n| 补充位（25） | 一级页表（9） | 二级页表（9） | 三级页表（9） | 页内偏移（12） |',
    options: ['1', '256', '256K', '256M'],
    answer: 'A',
    explanation: {
      knowledgePoints: ['多级页表', '页表计算'],
      analysis: '该结构中，三级页表项通过 9 位索引，即 512 个项。由于 64 位系统页表项通常为 8B，512 * 8B = 4KB，恰好占用 1 个页框（由 12 位偏移可知页大小为 4KB）。',
    },
  },
  {
    id: 29,
    subject: '操作系统',
    question: '下列方法中能够有效降低系统平均访存时间的是（）\nI. TLB\nII. 多级页表\nIII. 工作集概念\nIV. 页表缓冲队列',
    options: ['I、III', 'II、III', 'I、III、IV', 'I、II、IV'],
    answer: 'C',
    explanation: {
      knowledgePoints: ['Cache与TLB', '访存优化'],
      analysis: 'TLB 和页表缓冲队列能直接加速转换。工作集能减少缺页频率从而降低平均访存。多级页表反而增加了访存次数（需要查多级），是为了节省空间。',
    },
  },
  {
    id: 30,
    subject: '操作系统',
    question: '进程 P1 和 P2 共享一个文件 R，该文件的页表项分别是 R1 和 R2，其在 2 个进程中的虚拟地址分别是 W1 和 W2，则下列说法中正确的是（ ）',
    options: [
      '页表项 R1 和 R2 的内容完全不同',
      'W1 和 W2 映射的物理地址相同',
      '进程 P1 对 W1 的修改不会影响 P2 对 W2 的访问',
      'W1 和 W2 虚拟地址相同',
    ],
    answer: 'B',
    explanation: {
      knowledgePoints: ['文件共享', '内存映射文件'],
      analysis: '共享文件意味着不同进程的虚拟地址映射到同一组物理页面。物理地址必然相同。',
    },
  },
  {
    id: 31,
    subject: '操作系统',
    question: '下列关于驱动程序的描述中，错误的是（）',
    options: [
      '驱动程序是硬件与操作系统之间的接口程序',
      '驱动程序需根据硬件特性定制开发',
      '驱动程序需要设置统一的接口',
      '字符设备、块设备都是同一种 IO 方式',
    ],
    answer: 'D',
    explanation: {
      knowledgePoints: ['设备驱动程序'],
      analysis: '字符设备（按字符流访问）和块设备（按块随机访问）的 I/O 处理方式和接口有本质区别。',
    },
  },
  {
    id: 32,
    subject: '操作系统',
    question: '下列操作中，鼠标中断处理程序完成的是（）',
    options: [
      '解析鼠标的输入指令含义',
      '将鼠标数据同步到用户应用程序缓冲区',
      '将数据从输入设备传输到数据寄存器',
      '将数据从数据寄存器传输到内核缓冲区',
    ],
    answer: 'D',
    explanation: {
      knowledgePoints: ['中断处理', 'I/O控制方式'],
      analysis: '中断处理程序主要负责将外设准备好的数据从硬件寄存器搬运到内存（内核缓冲区）中。',
    },
  },
  {
    id: 33,
    subject: '计算机网络',
    question: '下列关于分层网络体系结构的叙述中，错误的是（ ）',
    options: ['每层都有明确的功能边界', '层次越多效率越高', '有利于各层技术独立演化', '上层无需关心下层的具体实现细节'],
    answer: 'B',
    explanation: {
      knowledgePoints: ['网络体系结构', '分层原则'],
      analysis: '层次过多会导致层间封装和拆封的额外开销增加，从而降低整体效率。',
    },
  },
  {
    id: 34,
    subject: '计算机网络',
    question: '若在带宽 200kHz ，信噪比 S/N=1023 的信道上，发送一个长度为 1500B 的分组，则发送该分组的传输时延至少是 ()',
    options: ['1ms', '2ms', '3ms', '6ms'],
    answer: 'D',
    explanation: {
      knowledgePoints: ['香农定理', '传输时延'],
      analysis: 'C = W log2(1 + S/N) = 200k * log2(1024) = 200k * 10 = 2Mbps。\n传输时延 = 数据长度 / 信道带宽 = (1500 * 8) / (2 * 10^6) = 12000 / 2000000 = 0.006s = 6ms。',
    },
  },
  {
    id: 35,
    subject: '计算机网络',
    question: '假设采用 CSMA/CA 的 IEEE 802.11 无线局域网，其数据传输速率为 300 Mbps，DIFS = 128 μs，SIFS = 28 μs。忽略除数据帧以外的其他帧的传输时延及信号传播时延，主机 H 发送一个总长度为 1500 B 的数据帧，则从开始发送数据帧至确认接收方收到所需的时间至少为（ ）。',
    options: ['40 us', '68 us', '168 us', '196 us'],
    answer: 'D',
    explanation: {
      knowledgePoints: ['802.11 CSMA/CA', '时延计算'],
      analysis: '过程：DIFS + 发送数据帧 + SIFS + 发送 ACK（由于忽略 ACK 发送时间，只算前三项）。\n数据帧发送时间 = (1500 * 8) / (300 * 10^6) = 12000 / 300 = 40 μs。\n总时间 = 128 + 40 + 28 = 196 μs。',
    },
  },
  {
    id: 36,
    subject: '计算机网络',
    question: '支持 VLAN 划分的以太网交换机，已按端口划分了两个 VLAN。VLAN 划分结果及各端口连接主机的 MAC 地址如图所示。下列具有不同目的 MAC 地址（DA）和源 MAC 地址（SA）的以太帧 F1–F4 中，H3 会接收到的是（ ）',
    options: ['仅 F2、F4', '仅 F1、F3', '仅 F1、F2', '仅 F3、F4'],
    answer: 'B',
    explanation: {
      knowledgePoints: ['VLAN', '交换机转发逻辑'],
      analysis: 'H3 属于 VLAN 1。F1 的 DA 是 H3，且 H1 与 H3 同属 VLAN 1，正确。F3 是广播帧，H2 与 H3 同属 VLAN 1，广播帧会在 VLAN 内转发，正确。F2 发生在 VLAN 2 内，H3 收不到。F4 虽然 SA 是 H3，但它是 H3 发出的。',
    },
  },
  {
    id: 37,
    subject: '计算机网络',
    question: '某网络在 t0 时刻的网络拓扑与 R1 的路由表如下图所示。R1~R4 为路由器，基于链路状态路由算法进行路由计算。S0~S4 为路由器 R1 的接口，链路上的数值为链路开销。若在 t1 (t1 > t0) 时刻，R1 检测到 R1 与 R2 之间的链路断开，则 R1 重新计算路由并进行充分路由聚合后，表中路由条目的数量为（ ）。',
    options: ['3', '4', '5', '6'],
    answer: 'A',
    explanation: {
      knowledgePoints: ['路由算法', '路由聚合'],
      analysis: '链路断开后触发重计算，聚合能显著减少条目数。根据 408 题目风格，通常聚合后只剩关键出口路由。具体需要根据拓扑中各网段的连续性进行聚合计算。',
    },
  },
  {
    id: 38,
    subject: '计算机网络',
    question: '下列路由协议中，能将一个自治系统划分为多个区域的内部网关协议是（ ）\nI. OSPF\nII. RIP\nIII. BGP',
    options: ['仅 I', '仅 II', '仅 I、III', '仅 II、III'],
    answer: 'A',
    explanation: {
      knowledgePoints: ['OSPF区域划分'],
      analysis: 'OSPF 支持 Area 概念，可将 AS 划分为多个区域。RIP 不支持。BGP 是外部网关协议。',
    },
  },
  {
    id: 39,
    subject: '计算机网络',
    question: '若将 IP 网络 123.4.4.0/22 划分为规模均衡的 32 个子网，则 IP 地址 123.4.5.11 所在的子网是（）',
    options: ['123.4.4.0/27', '123.4.4.32/27', '123.4.5.0/27', '123.4.5.32/27'],
    answer: 'D',
    explanation: {
      knowledgePoints: ['子网划分'],
      analysis: '/22 划分 32 个（2^5），掩码变为 /22+5 = /27。每个子网大小 32。123.4.4.0/22 包含 123.4.4.0 到 123.4.7.255。32个子网首地址依次为 4.0, 4.32, 4.64, ..., 5.0, 5.32...。123.4.5.11 处于 123.4.5.0 到 123.4.5.31 之间，即 123.4.5.0/27。',
    },
  },
  {
    id: 40,
    subject: '计算机网络',
    question: '下列叙述中不属于 cookie 的技术典型用途的是（）',
    options: ['用户跟踪', '个性化推荐', '构建虚拟购物车', '缩短 web 对象的响应时间'],
    answer: 'D',
    explanation: {
      knowledgePoints: ['Cookie的作用'],
      analysis: '缩短 Web 对象响应时间是 Web 缓存（代理或 CDN）的作用，不是 Cookie 的功能。',
    },
  },
]

export const ANSWER_QUESTIONS: AnswerQuestion[] = [
  {
    id: 41,
    subject: '数据结构',
    question: `（本题满分 13 分）
假定二叉搜索树使用二叉链表存储，存储结构如下：
typedef struct BSTNode{
    int data;
    struct BSTNode *left,*right;
} BSTNode;
typedef BSTNode BTNode;

给一棵二叉搜索树 T 和整数 K，查找树中关键字与 K 之差的绝对值最小的所有结点，并输出该绝对值与结点中的关键字。
（1）给出算法的基本思想。（4 分）
（2）使用 C/C++ 描述算法思想。（8 分）`,
    explanation: {
      knowledgePoints: ['二叉搜索树遍历', '最近邻查找'],
      analysis: `【参考答案与解析】
(1) 算法基本思想：
利用二叉搜索树的中序遍历是有序序列的特性。
1. 定义一个变量 min_diff 记录当前发现的最小绝对差，初始化为正无穷。
2. 定义一个容器（如数组或链表）存储具有当前最小绝对差的节点关键字。
3. 对二叉搜索树进行中序遍历：
   - 计算当前节点值 cur_val 与 K 的绝对差 diff = |cur_val - K|。
   - 如果 diff < min_diff：更新 min_diff = diff，清空容器并存入 cur_val。
   - 如果 diff == min_diff：将 cur_val 存入容器。
   - 如果 diff > min_diff：由于中序遍历递增，若 cur_val > K 且差值已经开始变大，则后续节点无需再遍历（剪枝）。
4. 遍历结束后，输出 min_diff 及容器中的所有关键字。

(2) C++ 代码描述：
void findMinDiff(BTNode* root, int K, int& minDiff, vector<int>& res) {
    if (!root) return;
    findMinDiff(root->left, K, minDiff, res);
    
    int diff = abs(root->data - K);
    if (diff < minDiff) {
        minDiff = diff;
        res.clear();
        res.push_back(root->data);
    } else if (diff == minDiff) {
        res.push_back(root->data);
    } else if (root->data > K) {
        // 剪枝：后续节点的差值只会更大
        return;
    }
    
    findMinDiff(root->right, K, minDiff, res);
}`,

      visual: {
        type: 'bstSearch' as const,
        target: 6,
        rootId: '7',
        nodes: [
          { id: '7',  val: 7,  left: '3',  right: '9'  },
          { id: '3',  val: 3,  left: '1',  right: '5'  },
          { id: '9',  val: 9,  left: undefined, right: '11' },
          { id: '1',  val: 1  },
          { id: '5',  val: 5  },
          { id: '11', val: 11 },
        ],
        steps: [
          {
            description: '开始中序遍历（左→根→右），minDiff=∞，结果集={}',
            currentId: '7',
            visitedIds: [],
          },
          {
            description: '访问节点 1，|1-6|=5 < ∞，更新 minDiff=5，候选={1}',
            currentId: '1',
            candidateId: '1',
            visitedIds: [],
          },
          {
            description: '访问节点 3，|3-6|=3 < 5，更新 minDiff=3，候选={3}',
            currentId: '3',
            candidateId: '3',
            visitedIds: ['1'],
          },
          {
            description: '访问节点 5，|5-6|=1 < 3，更新 minDiff=1，候选={5}',
            currentId: '5',
            candidateId: '5',
            visitedIds: ['1', '3'],
          },
          {
            description: '访问节点 7，|7-6|=1 = minDiff，加入候选，候选={5, 7}',
            currentId: '7',
            candidateId: '5',
            visitedIds: ['1', '3', '5'],
          },
          {
            description: '访问节点 9，|9-6|=3 > 1，且 9>K=6，差值只会更大，剪枝停止',
            currentId: '9',
            candidateId: '5',
            visitedIds: ['1', '3', '5', '7'],
          },
          {
            description: '遍历完成！minDiff=1，最近邻节点：5 和 7',
            currentId: '7',
            visitedIds: ['1', '3', '5', '7', '9', '11'],
          },
        ],
      },
    },
  },
  {
    id: 42,
    subject: '数据结构',
    question: `（本题满分 10 分）
栈的基本操作有出栈和入栈。将序列 1,2,3,…,n 依次入栈，回答下列问题：
(1) 当 n=9 时，可以得到出栈序列 {2,3,1,6,4,7,5,8} 吗？可以得到出栈序列 {2,3,1,4,6,5,7,8} 吗？（2 分）
(2) 假设 1,2,…,n 组成任意序列的出栈序列 P1,P2,…,Pn ，在序列中有 Pi 、 Pj 、 Pk （ i<j<k ），若该出栈序列不能由栈得到，则 Pi 、 Pj 、 Pk 的大小关系是？（2 分）
(3) 若 n=4 ，则以 2 开头的序列个数有多少个？（2 分）
(4) 若 n=k−1 时，出栈序列总共共有 M 个，如果 n=k ，那么以 1 开头的出栈序列个数有多少个？以 2 开头的出栈序列有多少个？总共的出栈序列有多少个？（4 分）`,
    explanation: {
      knowledgePoints: ['栈的出栈序列判定', '卡特兰数'],
      analysis: `【参考答案与解析】
(1) 
- {2,3,1,6,4,7,5,8}：不可以。原因：6 出栈后，栈内剩余 4,5（5在栈顶）。随后应该是 5 先出，4 后出。而序列给出的顺序是 4,7,5，违反了栈的 LIFO 特性。
- {2,3,1,4,6,5,7,8}：可以。

(2) 非法出栈序列的特征：存在 i < j < k 使得 Pk < Pi < Pj。即在一个元素后面比它小的元素必须是降序排列的。

(3) n=4，入栈序列 1,2,3,4。
若以 2 开头（2 第一个出栈）：此时 1 必然已经在栈中。
剩下的操作相当于对 {1, 3, 4} 进行合法出栈。
由于 1 在栈底，它的出栈时间取决于 3, 4 是否先入。
计算得符合条件的序列有 3 个：(2,1,3,4), (2,3,1,4), (2,3,4,1)。

(4) 
- 以 1 开头：1 第一个出栈，剩下 k-1 个元素归并，个数为 M。
- 以 2 开头：2 第一个出栈，此时 1 必须在栈中。剩下 k-1 个元素的操作数依然为 M。
- 总个数：即第 k 个卡特兰数 C(k) = (1/(k+1)) * Binomial(2k, k)。`,
      visual: {
        type: 'stack' as const,
        inputSequence: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        steps: [
          { description: 'PUSH 1：将 1 压入栈', op: 'push', element: 1, stackState: [1], outputSoFar: [] },
          { description: 'PUSH 2：将 2 压入栈', op: 'push', element: 2, stackState: [1, 2], outputSoFar: [] },
          { description: 'POP 2：2 出栈，输出 2', op: 'pop', element: 2, stackState: [1], outputSoFar: [2] },
          { description: 'PUSH 3：将 3 压入栈', op: 'push', element: 3, stackState: [1, 3], outputSoFar: [2] },
          { description: 'POP 3：3 出栈，输出 3', op: 'pop', element: 3, stackState: [1], outputSoFar: [2, 3] },
          { description: 'POP 1：1 出栈，输出 1', op: 'pop', element: 1, stackState: [], outputSoFar: [2, 3, 1] },
          { description: 'PUSH 4：将 4 压入栈', op: 'push', element: 4, stackState: [4], outputSoFar: [2, 3, 1] },
          { description: 'POP 4：4 出栈，输出 4', op: 'pop', element: 4, stackState: [], outputSoFar: [2, 3, 1, 4] },
          { description: 'PUSH 5：将 5 压入栈', op: 'push', element: 5, stackState: [5], outputSoFar: [2, 3, 1, 4] },
          { description: 'PUSH 6：将 6 压入栈', op: 'push', element: 6, stackState: [5, 6], outputSoFar: [2, 3, 1, 4] },
          { description: 'POP 6：6 出栈，输出 6', op: 'pop', element: 6, stackState: [5], outputSoFar: [2, 3, 1, 4, 6] },
          { description: 'POP 5：5 出栈，输出 5', op: 'pop', element: 5, stackState: [], outputSoFar: [2, 3, 1, 4, 6, 5] },
          { description: 'PUSH 7：将 7 压入栈', op: 'push', element: 7, stackState: [7], outputSoFar: [2, 3, 1, 4, 6, 5] },
          { description: 'POP 7：7 出栈，输出 7', op: 'pop', element: 7, stackState: [], outputSoFar: [2, 3, 1, 4, 6, 5, 7] },
          { description: 'PUSH 8：将 8 压入栈', op: 'push', element: 8, stackState: [8], outputSoFar: [2, 3, 1, 4, 6, 5, 7] },
          { description: 'POP 8：8 出栈，输出 8', op: 'pop', element: 8, stackState: [], outputSoFar: [2, 3, 1, 4, 6, 5, 7, 8] },
          { description: 'PUSH 9：将 9 压入栈', op: 'push', element: 9, stackState: [9], outputSoFar: [2, 3, 1, 4, 6, 5, 7, 8] },
          { description: 'POP 9：9 出栈，输出 9。出栈序列完成：2,3,1,4,6,5,7,8,9', op: 'pop', element: 9, stackState: [], outputSoFar: [2, 3, 1, 4, 6, 5, 7, 8, 9] },
        ],
      },
    },
  },
  {
    id: 43,
    subject: '组成原理',
    question: `（本题满分 10 分）
某 16 位计算机按字节编址，通用寄存器 R0～R15 的编号为 0～15，存储器地址为 16 位，采用定长指令字，指令格式有 R 型、I 型、M 型三种，如下表所示。

<table class="w-full border-collapse border border-border my-4 text-sm">
  <thead>
    <tr class="bg-muted/50">
      <th class="border border-border p-2">格式</th>
      <th class="border border-border p-2">字段 1 (4位)</th>
      <th class="border border-border p-2">字段 2 (4位)</th>
      <th class="border border-border p-2">字段 3 (4位)</th>
      <th class="border border-border p-2">字段 4 (4位)</th>
      <th class="border border-border p-2">功能说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-border p-2 text-center">R 型</td>
      <td class="border border-border p-2 text-center">0000</td>
      <td class="border border-border p-2 text-center">rt</td>
      <td class="border border-border p-2 text-center">rs/num</td>
      <td class="border border-border p-2 text-center">op1</td>
      <td class="border border-border p-2">R[rt] ← R[rt] op1 R[rs] 或 R[rt] ← R[rt] op1 num</td>
    </tr>
    <tr>
      <td class="border border-border p-2 text-center">I 型</td>
      <td class="border border-border p-2 text-center">op2</td>
      <td class="border border-border p-2 text-center">rt</td>
      <td class="border border-border p-2 text-center" colspan="2">imm8 (8位)</td>
      <td class="border border-border p-2">R[rt] ← R[rt] op2 imm8</td>
    </tr>
    <tr>
      <td class="border border-border p-2 text-center">M 型</td>
      <td class="border border-border p-2 text-center">op3</td>
      <td class="border border-border p-2 text-center" colspan="3">offset (12位)</td>
      <td class="border border-border p-2">R[0] ← M[R[15] + offset] 或 M[R[15] + offset] ← R[0]</td>
    </tr>
  </tbody>
</table>

其中：
OP1 为 0001、0010 分别表示加、左移指令；
OP2 为 0100 表示加立即数指令；
OP3 为 1110、1111 分别表示取数、存数指令；
R[r] 表示寄存器 r 中的内容；M[addr] 表示存储器地址 addr 中的内容。

请回答下列问题：
(1) 主存单元和通用寄存器的宽度各为多少位？（2 分）
(2) op1 和 op2 的编码是否可以相同？op2 和 op3 的编码是否可以相同？（2 分）
(3) 若 R(2)=ABCDH，R(9)=F00H1，则指令 0000 0010 1001 0001 执行后，R2 和 R9 中的内容分别是多少？（2 分）
(4) 若变量 x 、 y 均为 16 位带符号整数，在存储器中依次从低地址向高地址连续存放， x 的地址在 R15 中。实现 y=16x−5 的 4 条指令 11–14 如题 43 表所示，写出 ①～④ 处的内容。（4 分）

题 43 表：
| 地址 | 内容 |
| :--- | :--- |
| 11 | ① 0000 0000 0000 |
| 12 | 0000 ② 0010 |
| 13 | 0100 0000 ③ |
| 14 | 1111 ④ |`,
    explanation: {
      knowledgePoints: ['指令编码', '寄存器寻址', '程序执行分析'],
      analysis: `【参考答案与解析】
(1) 
- 主存单元宽度：8 位（按字节编址）。
- 通用寄存器宽度：16 位（由“16 位计算机”及寄存器内容 ABCD H 可知）。

(2) 
- op1 和 op2：可以相同。因为 R 型指令的操作码字段是 0000，而 I 型的操作码在最前 4 位且不为 0000，两者通过首 4 位即可区分。
- op2 和 op3：不可以相同。两者都在指令的前 4 位作为操作码字段，若相同则无法区分指令类型。

(3) 指令 0000 (R型) 0010 (rt=2) 1001 (rs=9) 0001 (op1=加法)。
功能：R[2] = R[2] + R[9] = ABCDH + F001H。
ABCDH (1010 1011 1100 1101) + F001H (1111 0000 0000 0001) = 9BCD H (进位舍弃)。
R2 内容：9BCDH；R9 内容：F001H (不变)。

(4) 目标：y = 16x - 5。
x 的地址在 R15，y = M[R15 + 2]。
指令 11：取数 x 到 R0。M型，op3=1110。内容：1110 0000 0000 0000 (offset=0)。
指令 12：x 左移 4 位得到 16x。R型，rt=0, num=4, op1=0010。内容：0000 0000 0100 0010。
指令 13：减 5（加 -5）。I型，op2=0100, rt=0, imm8=-5(FB H)。内容：0100 0000 1111 1011。
指令 14：存 y。M型，op3=1111, offset=2。内容：1111 0000 0000 0010。
① 1110, ② 0000, ③ 1111 1011, ④ 0000 0000 0010。`,
    },
  },
  {
    id: 44,
    subject: '组成原理',
    question: `（本题满分 15 分）
假定 43 题中计算机 C 的部分数据通路如题 44 所示。图中带箭头虚线代表控制信号，IR.rt、IR.rs 分别表示 IR 中的 rt、rs 字段，IR11-0 为 IR 的低 12 位，要求取指令周期完成 PC 增量操作，请回答下列问题。

(1) ①和②是同一类部件，其名称是什么（1 分）
(2) I 型指令中 imm8 可以是带符号或无符号整数，M 型指令中 offset 是带符号整数，则 EXTOP 至少有几位？为什么？（2 分）
(3) 取指周期中 MARSrc、ALUA SrC、ALUB SrC、RegWr 的取值各是什么？（4 分）
(4) 左移指令周期中 ALUB SrC、RegWsrc、RegDst、RegWr 的取值各是什么？Extop 是否可以与 M 型指令中的 EXTop 相同？为什么？（2 分）`,
    explanation: {
      knowledgePoints: ['数据通路', '控制信号', '微操作'],
      analysis: `【参考答案与解析】
(1) 名称：多路选择器 (MUX)。

(2) EXTOP 至少 2 位。
原因：扩展器需要支持三种模式：imm8 的零扩展（无符号）、imm8 的符号扩展（带符号）、offset 的符号扩展（12位带符号）。

(3) 取指周期（Fetch）：
- MARSrc = 0 (选择 PC 的值进入 MAR)。
- ALUA SrC = 0 (选择 PC 参与加法)。
- ALUB SrC = 0 (选择常量 2，假设指令长度 2 字节)。
- RegWr = 0 (取指阶段不写寄存器)。

(4) 左移指令：
- ALUB SrC = 1 (选择扩展器输出的立即数/位移量)。
- RegWsrc = 0 (选择 ALU 的计算结果写回)。
- RegDst = 1 (选择 rt 字段作为目的寄存器地址)。
- RegWr = 1 (执行写回)。
- Extop 不可以与 M 型相同：位移量通常视为无符号或特定处理，而 M 型 offset 必须是符号扩展。`,
    },
  },
  {
    id: 45,
    subject: '操作系统',
    question: `（本题满分 7 分） 
系统采用优先级（优先级越大表示优先级越高）与时间片轮转调度算法，仅当发生时钟中断时才触发抢占 CPU 操作，时钟中断间隔为 10 ms。进程首次进入就绪队列时，其时间片为 50 ms。若进程因时间片用完而返回就绪队列，其优先级值减 1；若进程被更高优先级进程抢占而返回就绪队列，其优先级值保持不变。当多个进程优先级相同时，先进入就绪队列的进程优先被调度。

| 进程 | 到达时间 (ms) | 初始优先级 | CPU 运行时间 (ms) |
| :--- | :--- | :--- | :--- |
| P1 | 10 | 3 | 95 |
| P2 | 10 | 4 | 20 |
| P3 | 12 | 2 | 40 |
| P4 | 14 | 5 | 60 |

（1）从 10 ms 开始进程调度，直至所有进程调度结束，此时中断次数与 CPU 调度次数分别为多少？P1、P2、P3、P4 各自的首次调度发生在哪个时刻？（5 分）
（2）若时间片由 50 ms 改为 100 ms，CPU 调度次数将增大、不变还是减少？若时钟中断间隔由 10 ms 改为 1 ms，系统开销将增大、不变还是减少？（2 分）`,
    explanation: {
      knowledgePoints: ['进程调度', '时间片轮转', '优先级抢占'],
      analysis: `【参考答案与解析】
(1) 调度过程分析：
- 10ms: P1(3), P2(4) 到达。P2 优先级高，执行 P2。
- 12ms: P3(2) 到达。
- 14ms: P4(5) 到达。由于仅在时钟中断（20ms）触发抢占，P2 继续执行。
- 20ms: 时钟中断。检查优先级，P4(5) > P2(4)，P4 抢占。P2 运行完成。
- 30, 40, 50, 60ms: 时钟中断，P4 继续执行。
- 70ms: P4 运行了 50ms（时间片完），优先级减 1 变为 4。此时就绪队列有 P1(3), P2(已完), P3(2), P4(4)。P4 优先级最高，继续执行 10ms。
- 80ms: P4 运行结束。
... 依此类推。

首次调度时刻：
- P2: 10ms
- P4: 20ms
- P1: 80ms
- P3: 175ms (计算得出)

(2) 
- 调度次数：减少（时间片变大，因时间片到期的切换减少）。
- 系统开销：增大（时钟中断更频繁，系统维护开销变大）。`,
      visual: {
        type: 'gantt' as const,
        totalTime: 225,
        description: '调度顺序：P2(10~20) → P4(20~80) → P1(80~130) → P3(130~170) → P1(170~225)',
        segments: [
          { process: 'P2', start: 10,  end: 20  },
          { process: 'P4', start: 20,  end: 80  },
          { process: 'P1', start: 80,  end: 130 },
          { process: 'P3', start: 130, end: 170 },
          { process: 'P1', start: 170, end: 225 },
        ],
      },
    },
  },
  {
    id: 46,
    subject: '操作系统',
    question: `（本题满分 8 分）
文件系统的目录项包括文件名和索引节点号。盘块大小为 4 KB，盘块号占 4 B。索引节点占 128 B，包含直接地址项 5 个，一、二、三级间接地址项各 1 个。索引节点表存放在盘块号 100 开始的 4096 个盘块中。

| 文件名 | 索引节点号 |
| :--- | :--- |
| dir | 100 |
| dir1 | 201 |
| file | 1000 |

file 文件大小为 30 KB。
（1）file 的索引节点所在的盘块号是多少？若 file 的索引节点已经读取到内存，要访问 file 文件中偏移地址 21460 的一个字节数据，则最多需要读多少个盘块？如果文件系统中有足够的磁盘空间，则最多可以存放多少个文件？（3 分）
（2）如果要删除目录 dir1，则需要对元数据进行哪些操作？（5 分）`,
    explanation: {
      knowledgePoints: ['磁盘索引节点', '文件物理结构', '目录管理'],
      analysis: `【参考答案与解析】
(1) 
- 盘块号：每个盘块可存 4KB/128B = 32 个索引节点。1000 号节点在第 1000/32 = 31.25 个块，即偏移 31 块。起始 100 + 31 = 131。
- 读盘块数：偏移 21460 / 4096 = 5.23。即在第 6 个逻辑块。前 5 个块为直接寻址，第 6 个块在一级间接寻址中。需先读一级间接表块（1次），再读数据块（1次）。总共 2 次。
- 最大文件数：由索引节点总数决定。4096 块 * 32 个/块 = 131,072 个。

(2) 删除 dir1 的元数据操作：
1. 在父目录 dir 的数据块中删除 dir1 的目录项。
2. 释放 dir1 对应的索引节点（修改索引节点位示图）。
3. 递归（或按策略）释放 dir1 下属文件的索引节点和数据块。
4. 修改磁盘块位示图，将释放的数据块标记为空闲。
5. 更新父目录的修改时间等属性。`,
    },
  },
  {
    id: 47,
    subject: '计算机网络',
    question: `（本题满分 9 分）
假设客户端 C 向服务器 Si 上传一个 2000 B 的文件。
已知：C 拥塞窗口初始阈值 8 MSS，MSS = 500 B。Si 对每个 TCP 段确认。接收窗口 rwnd = 1000 B，RTT = 5 ms。C 初始序号 1000，Si 初始序号 2000。

（1）C 与 Si 建立 TCP 连接过程需要几次握手？C 收到的 SYN = 1, ACK = 1 的 TCP 段的确认序号是多少？
（2）当 C 接收 Si 发送的 ACK = 1, seq = 2001, ack_seq = 2001, rwnd = 1000 确认段后，C 的拥塞窗口增加到多少？C 的发送窗口设置为多少？
（3）C 与 Si 释放 TCP 连接过程需要几次挥手？C 收到最后一个 TCP 报文段的序号（seq），确认序号（ack_seq），FIN 的值分别是多少？
（4）忽略报文段传输时延，且时间从 C 请求建立 TCP 连接时刻算起，则 C 确定 Si 已成功接收到文件的时间是多少？`,
    explanation: {
      knowledgePoints: ['TCP三次握手', '拥塞控制', '流量控制', '四次挥手'],
      analysis: `【参考答案与解析】
(1) 
- 握手次数：3 次。
- 确认序号：1001 (C 的第一个 SYN 占一个序号)。

(2) 
- 拥塞窗口 (cwnd)：初始为 1 MSS，收到第一个确认后变为 2 MSS (1000 B)。
- 发送窗口 (swnd)：min(cwnd, rwnd) = min(1000, 1000) = 1000 B。

(3) 
- 挥手次数：4 次。
- 最后一个报文（Si 发给 C 的 FIN+ACK）：
  - seq：2001 (假设 Si 没发数据)。
  - ack_seq：3001 (C 发送了 2000B 数据，初始 1000，结束序号 3000，FIN 占 1 个)。
  - FIN：1。

(4) 时间计算：
- 握手过程：1.5 RTT (7.5 ms) 到达“已建立并开始发数据”。
- 数据发送：2000 B / 1000 B每窗口 = 2 个窗口。
  - 第一批 (1000B)：耗时 1 RTT。
  - 第二批 (1000B)：耗时 1 RTT。
- 收到最后一个确认：总计 1.5 RTT (握手) + 2 RTT (数据) = 3.5 RTT = 17.5 ms。`,
      visual: {
        type: 'tcp' as const,
        totalTime: 20,
        description: 'TCP 交互过程：三次握手 (7.5ms) + 两轮数据传输 (10ms)。由于接收窗口限制，每轮最多发送 1000B。',
        packets: [
          { from: 'client', label: 'SYN', seq: 1000, time: 0, arrival: 2.5, payload: '请求建立连接' },
          { from: 'server', label: 'SYN+ACK', seq: 2000, ack: 1001, time: 2.5, arrival: 5, payload: '同意连接' },
          { from: 'client', label: 'ACK', seq: 1001, ack: 2001, time: 5, arrival: 7.5, payload: '握手完成，开始传数据' },
          { from: 'client', label: 'Data (1000B)', seq: '1001:2000', time: 5, arrival: 7.5, payload: '发送第1-2个MSS' },
          { from: 'server', label: 'ACK', ack: 2001, time: 7.5, arrival: 10, payload: '确认前1000B' },
          { from: 'client', label: 'Data (1000B)', seq: '2001:3000', time: 10, arrival: 12.5, payload: '发送第3-4个MSS' },
          { from: 'server', label: 'ACK', ack: 3001, time: 12.5, arrival: 15, payload: '确认全部2000B数据' },
        ],
      },
    },
  },
]
