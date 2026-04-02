import type { ModuleKey } from './modules'

export interface Chapter {
  id: string
  title: string
  children?: Chapter[]
}

export const CHAPTERS: Partial<Record<ModuleKey, Chapter[]>> = {
  'data-structure': [
    {
      id: 'ds-01',
      title: '第一章 绪论',
      children: [
        { id: 'ds-01-01', title: '数据结构的基本概念' },
        { id: 'ds-01-02', title: '算法与算法评价' },
      ],
    },
    {
      id: 'ds-02',
      title: '第二章 线性表',
      children: [
        { id: 'ds-02-01', title: '线性表的定义和基本操作' },
        { id: 'ds-02-02', title: '顺序表' },
        { id: 'ds-02-03', title: '链表（单/双/循环）' },
      ],
    },
    {
      id: 'ds-03',
      title: '第三章 栈、队列和数组',
      children: [
        { id: 'ds-03-01', title: '栈' },
        { id: 'ds-03-02', title: '队列' },
        { id: 'ds-03-03', title: '栈和队列的应用' },
        { id: 'ds-03-04', title: '数组和特殊矩阵' },
      ],
    },
    {
      id: 'ds-04',
      title: '第四章 串',
      children: [
        { id: 'ds-04-01', title: '串的定义和实现' },
        { id: 'ds-04-02', title: '串的模式匹配（KMP）' },
      ],
    },
    {
      id: 'ds-05',
      title: '第五章 树与二叉树',
      children: [
        { id: 'ds-05-01', title: '树的基本概念' },
        { id: 'ds-05-02', title: '二叉树的定义及其主要特性' },
        { id: 'ds-05-03', title: '二叉树的存储结构' },
        { id: 'ds-05-04', title: '二叉树的遍历和线索二叉树' },
        { id: 'ds-05-05', title: '树和森林' },
        { id: 'ds-05-06', title: '哈夫曼树与哈夫曼编码' },
      ],
    },
    {
      id: 'ds-06',
      title: '第六章 图',
      children: [
        { id: 'ds-06-01', title: '图的基本概念' },
        { id: 'ds-06-02', title: '图的存储及基本操作' },
        { id: 'ds-06-03', title: '图的遍历（BFS/DFS）' },
        { id: 'ds-06-04', title: '图的应用（最小生成树、最短路径）' },
        { id: 'ds-06-05', title: '拓扑排序与关键路径' },
      ],
    },
    {
      id: 'ds-07',
      title: '第七章 查找',
      children: [
        { id: 'ds-07-01', title: '查找的基本概念' },
        { id: 'ds-07-02', title: '顺序查找和折半查找' },
        { id: 'ds-07-03', title: '树形查找（BST、AVL、红黑树）' },
        { id: 'ds-07-04', title: 'B树和B+树' },
        { id: 'ds-07-05', title: '散列（Hash）查找' },
      ],
    },
    {
      id: 'ds-08',
      title: '第八章 排序',
      children: [
        { id: 'ds-08-01', title: '排序的基本概念' },
        { id: 'ds-08-02', title: '插入排序（直接插入、折半插入、希尔）' },
        { id: 'ds-08-03', title: '交换排序（冒泡、快速）' },
        { id: 'ds-08-04', title: '选择排序（简单选择、堆排序）' },
        { id: 'ds-08-05', title: '归并排序和基数排序' },
        { id: 'ds-08-06', title: '各排序算法的比较与应用' },
      ],
    },
  ],

  'computer-organization': [
    {
      id: 'co-01',
      title: '第一章 计算机系统概述',
      children: [
        { id: 'co-01-01', title: '计算机发展历程' },
        { id: 'co-01-02', title: '计算机系统层次结构' },
        { id: 'co-01-03', title: '计算机的性能指标' },
      ],
    },
    {
      id: 'co-02',
      title: '第二章 数据的表示和运算',
      children: [
        { id: 'co-02-01', title: '数制与编码' },
        { id: 'co-02-02', title: '定点数的表示与运算' },
        { id: 'co-02-03', title: '浮点数的表示与运算' },
        { id: 'co-02-04', title: '算术逻辑单元（ALU）' },
      ],
    },
    {
      id: 'co-03',
      title: '第三章 存储系统',
      children: [
        { id: 'co-03-01', title: '存储器的分类' },
        { id: 'co-03-02', title: '主存储器（SRAM/DRAM）' },
        { id: 'co-03-03', title: '主存与CPU的连接' },
        { id: 'co-03-04', title: '外部存储器' },
        { id: 'co-03-05', title: '高速缓冲存储器（Cache）' },
        { id: 'co-03-06', title: '虚拟存储器' },
      ],
    },
    {
      id: 'co-04',
      title: '第四章 指令系统',
      children: [
        { id: 'co-04-01', title: '指令格式' },
        { id: 'co-04-02', title: '指令的寻址方式' },
        { id: 'co-04-03', title: 'CISC 与 RISC' },
      ],
    },
    {
      id: 'co-05',
      title: '第五章 中央处理器（CPU）',
      children: [
        { id: 'co-05-01', title: 'CPU 的功能和基本结构' },
        { id: 'co-05-02', title: '指令执行过程' },
        { id: 'co-05-03', title: '数据通路' },
        { id: 'co-05-04', title: '控制器（硬布线/微程序）' },
        { id: 'co-05-05', title: '指令流水线' },
      ],
    },
    {
      id: 'co-06',
      title: '第六章 总线',
      children: [
        { id: 'co-06-01', title: '总线概述' },
        { id: 'co-06-02', title: '总线仲裁' },
        { id: 'co-06-03', title: '总线操作和定时' },
        { id: 'co-06-04', title: '总线标准' },
      ],
    },
    {
      id: 'co-07',
      title: '第七章 输入/输出系统',
      children: [
        { id: 'co-07-01', title: 'I/O 系统基本概念' },
        { id: 'co-07-02', title: '外部设备' },
        { id: 'co-07-03', title: 'I/O 接口' },
        { id: 'co-07-04', title: 'I/O 方式（程序查询/中断/DMA）' },
      ],
    },
  ],

  'operating-system': [
    {
      id: 'os-01',
      title: '第一章 操作系统概述',
      children: [
        { id: 'os-01-01', title: '操作系统的基本概念' },
        { id: 'os-01-02', title: '操作系统的发展历程' },
        { id: 'os-01-03', title: '操作系统的运行环境' },
        { id: 'os-01-04', title: '操作系统的体系结构' },
      ],
    },
    {
      id: 'os-02',
      title: '第二章 进程管理',
      children: [
        { id: 'os-02-01', title: '进程与线程' },
        { id: 'os-02-02', title: 'CPU 调度' },
        { id: 'os-02-03', title: '进程同步（信号量/管程）' },
        { id: 'os-02-04', title: '死锁' },
      ],
    },
    {
      id: 'os-03',
      title: '第三章 内存管理',
      children: [
        { id: 'os-03-01', title: '内存管理概念' },
        { id: 'os-03-02', title: '虚拟内存管理' },
        { id: 'os-03-03', title: '页面置换算法' },
        { id: 'os-03-04', title: '内存分配与回收' },
      ],
    },
    {
      id: 'os-04',
      title: '第四章 文件管理',
      children: [
        { id: 'os-04-01', title: '文件系统基础' },
        { id: 'os-04-02', title: '目录' },
        { id: 'os-04-03', title: '文件系统实现' },
        { id: 'os-04-04', title: '磁盘组织与管理' },
      ],
    },
    {
      id: 'os-05',
      title: '第五章 设备管理',
      children: [
        { id: 'os-05-01', title: 'I/O 管理概述' },
        { id: 'os-05-02', title: 'I/O 核心子系统' },
        { id: 'os-05-03', title: '磁盘和固态硬盘' },
      ],
    },
  ],

  'computer-network': [
    {
      id: 'cn-01',
      title: '第一章 计算机网络体系结构',
      children: [
        { id: 'cn-01-01', title: '计算机网络概述' },
        { id: 'cn-01-02', title: '计算机网络体系结构与参考模型' },
      ],
    },
    {
      id: 'cn-02',
      title: '第二章 物理层',
      children: [
        { id: 'cn-02-01', title: '通信基础' },
        { id: 'cn-02-02', title: '传输介质' },
        { id: 'cn-02-03', title: '物理层设备' },
      ],
    },
    {
      id: 'cn-03',
      title: '第三章 数据链路层',
      children: [
        { id: 'cn-03-01', title: '数据链路层的功能' },
        { id: 'cn-03-02', title: '组帧' },
        { id: 'cn-03-03', title: '差错控制（检错/纠错）' },
        { id: 'cn-03-04', title: '流量控制与可靠传输' },
        { id: 'cn-03-05', title: '介质访问控制（CSMA/CD、CSMA/CA）' },
        { id: 'cn-03-06', title: '局域网与以太网' },
        { id: 'cn-03-07', title: '广域网' },
        { id: 'cn-03-08', title: '数据链路层设备' },
      ],
    },
    {
      id: 'cn-04',
      title: '第四章 网络层',
      children: [
        { id: 'cn-04-01', title: '网络层的功能' },
        { id: 'cn-04-02', title: 'IPv4（编址/分组/子网划分）' },
        { id: 'cn-04-03', title: 'IPv6' },
        { id: 'cn-04-04', title: '路由算法与路由协议（RIP/OSPF/BGP）' },
        { id: 'cn-04-05', title: 'IP 组播' },
        { id: 'cn-04-06', title: '移动 IP' },
        { id: 'cn-04-07', title: '网络层设备（路由器）' },
      ],
    },
    {
      id: 'cn-05',
      title: '第五章 传输层',
      children: [
        { id: 'cn-05-01', title: '传输层提供的服务' },
        { id: 'cn-05-02', title: 'UDP 协议' },
        { id: 'cn-05-03', title: 'TCP 协议' },
        { id: 'cn-05-04', title: 'TCP 流量控制与拥塞控制' },
        { id: 'cn-05-05', title: 'TCP 连接管理（三次握手/四次挥手）' },
      ],
    },
    {
      id: 'cn-06',
      title: '第六章 应用层',
      children: [
        { id: 'cn-06-01', title: '网络应用模型' },
        { id: 'cn-06-02', title: 'DNS' },
        { id: 'cn-06-03', title: 'FTP' },
        { id: 'cn-06-04', title: '电子邮件（SMTP/POP3/IMAP）' },
        { id: 'cn-06-05', title: 'WWW（HTTP/HTTPS）' },
      ],
    },
  ],
}
