'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen, Menu, Home, ChevronLeft, List, GitBranch, Network, Search, Cpu, HardDrive, Monitor, Database } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface TreeNode {
  id: string
  title: string
  children?: TreeNode[]
  isOpen?: boolean
}

interface ComputerOrganizationSidebarProps {
  className?: string
}

export default function ComputerOrganizationSidebar({ className }: ComputerOrganizationSidebarProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [activeNode, setActiveNode] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState(false)

  // 从 localStorage 加载状态
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 加载展开节点状态
      const savedExpandedNodes = localStorage.getItem('computerOrganizationExpandedNodes')
      if (savedExpandedNodes) {
        try {
          const parsed = JSON.parse(savedExpandedNodes)
          setExpandedNodes(new Set(parsed))
        } catch (error) {
          console.warn('Failed to parse expanded nodes from localStorage:', error)
        }
      }

      // 加载侧边栏收缩状态
      const savedCollapsed = localStorage.getItem('computerOrganizationSidebarCollapsed')
      if (savedCollapsed !== null) {
        setIsCollapsed(JSON.parse(savedCollapsed))
      }

      // 加载活动节点状态
      const savedActiveNode = localStorage.getItem('computerOrganizationActiveNode')
      if (savedActiveNode) {
        setActiveNode(savedActiveNode)
      }
    }
  }, [])

  const treeData: TreeNode[] = [
    {
      id: 'computer-system',
      title: '计算机系统概述',
      children: [
        {
          id: 'computer-development',
          title: '计算机发展历程',
          children: [
            { id: 'generations', title: '计算机代际' },
            { id: 'von-neumann', title: '冯·诺依曼体系结构' }
          ]
        },
        {
          id: 'computer-classification',
          title: '计算机分类',
          children: [
            { id: 'by-purpose', title: '按用途分类' },
            { id: 'by-size', title: '按规模分类' }
          ]
        },
        {
          id: 'performance-evaluation',
          title: '性能评价',
          children: [
            { id: 'performance-metrics', title: '性能指标' },
            { id: 'benchmark', title: '基准测试' }
          ]
        }
      ]
    },
    {
      id: 'data-representation',
      title: '数据的表示和运算',
      children: [
        {
          id: 'number-system',
          title: '数制与编码',
          children: [
            { id: 'binary-system', title: '二进制系统' },
            { id: 'hexadecimal', title: '十六进制' },
            { id: 'bcd-code', title: 'BCD码' }
          ]
        },
        {
          id: 'fixed-point',
          title: '定点数',
          children: [
            { id: 'signed-magnitude', title: '原码表示' },
            { id: 'ones-complement', title: '反码表示' },
            { id: 'twos-complement', title: '补码表示' }
          ]
        },
        {
          id: 'floating-point',
          title: '浮点数',
          children: [
            { id: 'ieee-754', title: 'IEEE 754标准' },
            { id: 'floating-arithmetic', title: '浮点运算' }
          ]
        },
        {
          id: 'arithmetic-unit',
          title: '运算器',
          children: [
            { id: 'alu-design', title: 'ALU设计' },
            { id: 'multiplier', title: '乘法器' },
            { id: 'divider', title: '除法器' }
          ]
        }
      ]
    },
    {
      id: 'memory-system',
      title: '存储器层次结构',
      children: [
        {
          id: 'memory-hierarchy',
          title: '存储层次',
          children: [
            { id: 'cache-memory', title: '高速缓存' },
            { id: 'main-memory', title: '主存储器' },
            { id: 'virtual-memory', title: '虚拟存储器' }
          ]
        },
        {
          id: 'cache-organization',
          title: 'Cache组织',
          children: [
            { id: 'cache-mapping', title: '地址映射' },
            { id: 'cache-replacement', title: '替换算法' },
            { id: 'cache-write', title: '写策略' }
          ]
        },
        {
          id: 'memory-management',
          title: '存储管理',
          children: [
            { id: 'page-management', title: '页式管理' },
            { id: 'segment-management', title: '段式管理' },
            { id: 'tlb', title: 'TLB快表' }
          ]
        }
      ]
    },
    {
      id: 'instruction-system',
      title: '指令系统',
      children: [
        {
          id: 'instruction-format',
          title: '指令格式',
          children: [
            { id: 'opcode', title: '操作码' },
            { id: 'addressing-mode', title: '寻址方式' },
            { id: 'instruction-types', title: '指令类型' }
          ]
        },
        {
          id: 'addressing-modes',
          title: '寻址方式',
          children: [
            { id: 'immediate', title: '立即寻址' },
            { id: 'register', title: '寄存器寻址' },
            { id: 'direct', title: '直接寻址' },
            { id: 'indirect', title: '间接寻址' },
            { id: 'relative', title: '相对寻址' }
          ]
        },
        {
          id: 'risc-cisc',
          title: 'RISC与CISC',
          children: [
            { id: 'risc-features', title: 'RISC特点' },
            { id: 'cisc-features', title: 'CISC特点' },
            { id: 'comparison', title: '对比分析' }
          ]
        }
      ]
    },
    {
      id: 'cpu',
      title: '中央处理器',
      children: [
        {
          id: 'cpu-structure',
          title: 'CPU结构',
          children: [
            { id: 'control-unit', title: '控制器' },
            { id: 'datapath', title: '数据通路' },
            { id: 'registers', title: '寄存器组' }
          ]
        },
        {
          id: 'instruction-cycle',
          title: '指令周期',
          children: [
            { id: 'fetch', title: '取指周期' },
            { id: 'decode', title: '译码周期' },
            { id: 'execute', title: '执行周期' },
            { id: 'write-back', title: '写回周期' }
          ]
        },
        {
          id: 'pipeline',
          title: '流水线技术',
          children: [
            { id: 'pipeline-stages', title: '流水线级数' },
            { id: 'hazards', title: '流水线冲突' },
            { id: 'forwarding', title: '数据前递' }
          ]
        }
      ]
    },
    {
      id: 'bus-system',
      title: '总线系统',
      children: [
        {
          id: 'bus-structure',
          title: '总线结构',
          children: [
            { id: 'system-bus', title: '系统总线' },
            { id: 'io-bus', title: 'I/O总线' },
            { id: 'bus-protocol', title: '总线协议' }
          ]
        },
        {
          id: 'bus-arbitration',
          title: '总线仲裁',
          children: [
            { id: 'centralized', title: '集中式仲裁' },
            { id: 'distributed', title: '分布式仲裁' }
          ]
        },
        {
          id: 'bus-timing',
          title: '总线时序',
          children: [
            { id: 'synchronous', title: '同步总线' },
            { id: 'asynchronous', title: '异步总线' }
          ]
        }
      ]
    },
    {
      id: 'io-system',
      title: '输入输出系统',
      children: [
        {
          id: 'io-interface',
          title: 'I/O接口',
          children: [
            { id: 'interface-types', title: '接口类型' },
            { id: 'interface-control', title: '接口控制' }
          ]
        },
        {
          id: 'io-methods',
          title: 'I/O方式',
          children: [
            { id: 'programmed-io', title: '程序控制I/O' },
            { id: 'interrupt-io', title: '中断I/O' },
            { id: 'dma', title: 'DMA方式' }
          ]
        },
        {
          id: 'interrupt-system',
          title: '中断系统',
          children: [
            { id: 'interrupt-types', title: '中断类型' },
            { id: 'interrupt-handling', title: '中断处理' },
            { id: 'interrupt-vector', title: '中断向量' }
          ]
        }
      ]
    }
  ]

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
    
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('computerOrganizationExpandedNodes', JSON.stringify(Array.from(newExpanded)))
    }
  }

  const handleNodeClick = (nodeId: string) => {
    setActiveNode(nodeId)
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('computerOrganizationActiveNode', nodeId)
    }
    // 这里可以添加路由跳转逻辑
  }

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed
    setIsCollapsed(newCollapsed)
    
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('computerOrganizationSidebarCollapsed', JSON.stringify(newCollapsed))
    }
  }

  const renderNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id)
    const isActive = activeNode === node.id
    const hasChildren = node.children && node.children.length > 0
    const isLeaf = !hasChildren

    return (
      <div key={node.id} className="select-none">
        <div
          className={cn(
            "group relative flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer",
            "hover:bg-white/20 dark:hover:bg-gray-800/20",
            "backdrop-blur-sm border border-transparent",
            "hover:border-white/20 dark:hover:border-gray-600/20",
            "hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20",
            isActive && "bg-blue-500/20 dark:bg-blue-400/20 border-blue-500/30 dark:border-blue-400/30",
            isActive && "text-blue-700 dark:text-blue-300",
            !isActive && "text-gray-700 dark:text-gray-300",
            level === 0 && "font-semibold text-gray-800 dark:text-gray-200",
            level === 1 && "font-medium",
            level === 2 && "font-normal text-sm"
          )}
          style={{ paddingLeft: `${12 + level * 16}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node.id)
            } else {
              handleNodeClick(node.id)
            }
          }}
        >
          {/* iOS26 玻璃液态背景效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 dark:from-gray-800/5 dark:via-gray-800/10 dark:to-gray-800/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* 液体流动效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          
          {/* 内容区域 */}
          <div className="relative z-10 flex items-center w-full">
            {/* 展开/折叠图标 */}
            {hasChildren && (
              <div className="flex items-center justify-center w-4 h-4 mr-2 transition-transform duration-200">
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                )}
              </div>
            )}
            
            {/* 节点图标 */}
            <div className="flex items-center justify-center w-4 h-4 mr-2">
              {hasChildren ? (
                isExpanded ? (
                  <FolderOpen className="w-3 h-3 text-blue-500 dark:text-blue-400" />
                ) : (
                  <Folder className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                )
              ) : (
                <FileText className="w-3 h-3 text-gray-400 dark:text-gray-500" />
              )}
            </div>
            
            {/* 节点标题 */}
            <span className="truncate">{node.title}</span>
          </div>
        </div>
        
        {/* 子节点 */}
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn(
      "h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl",
      "border-r border-gray-200/50 dark:border-gray-700/50",
      "shadow-xl shadow-black/5 dark:shadow-black/20",
      "overflow-hidden",
      "sticky top-0 transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-80",
      className
    )}>
      {/* 背景液体效果 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-400/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
      
      {/* 标题区域 */}
      <div className="relative z-10 sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className={cn(
          "flex items-center justify-between py-4",
          isCollapsed ? "px-4" : "px-6"
        )}>
          {!isCollapsed && (
            <div className="flex-1">
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                计算机组成原理
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                知识点导航
              </p>
            </div>
          )}
          
          {/* 控制按钮区域 */}
          <div className="flex items-center space-x-2">
            {/* 收缩/展开按钮 */}
            <button
              onClick={toggleCollapse}
              className={cn(
                "glass-liquid p-2 rounded-xl transition-all duration-300",
                "hover:bg-white/20 dark:hover:bg-gray-800/20",
                "hover:scale-110 hover:shadow-lg",
                "border border-transparent hover:border-white/20 dark:hover:border-gray-600/20",
                isCollapsed ? "w-8 h-8" : "w-8 h-8"
              )}
              title={isCollapsed ? "展开侧边栏" : "收缩侧边栏"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            
            {/* 返回首页按钮 */}
            <Link 
              href="/"
              className={cn(
                "glass-liquid p-2 rounded-xl transition-all duration-300",
                "hover:bg-white/20 dark:hover:bg-gray-800/20",
                "hover:scale-110 hover:shadow-lg",
                "border border-transparent hover:border-white/20 dark:hover:border-gray-600/20",
                isCollapsed ? "w-8 h-8" : "w-8 h-8"
              )}
              title="返回首页"
            >
              <Home className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* 导航树 */}
      <div className={cn(
        "relative z-10 space-y-1 overflow-y-auto h-full",
        "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600",
        "scrollbar-track-transparent",
        isCollapsed ? "p-2" : "p-4"
      )}>
        {!isCollapsed && treeData.map(node => renderNode(node))}
        {isCollapsed && (
          <div className="space-y-4">
            {/* 分隔线 */}
            <div className="mx-2 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            
            {treeData.map((node, index) => (
              <div
                key={node.id}
                className="group relative"
                title={node.title}
              >
                <div className={cn(
                  "glass-liquid w-10 h-10 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300 hover:scale-110 hover:shadow-lg border",
                  "hover:shadow-blue-500/25 dark:hover:shadow-blue-400/25",
                  index === 0 && "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-400/10 dark:to-cyan-400/10 border-blue-200/30 dark:border-blue-700/30",
                  index === 1 && "bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-400/10 dark:to-emerald-400/10 border-green-200/30 dark:border-green-700/30",
                  index === 2 && "bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-400/10 dark:to-pink-400/10 border-purple-200/30 dark:border-purple-700/30",
                  index === 3 && "bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-400/10 dark:to-red-400/10 border-orange-200/30 dark:border-orange-700/30",
                  index === 4 && "bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-400/10 dark:to-blue-400/10 border-indigo-200/30 dark:border-indigo-700/30",
                  index === 5 && "bg-gradient-to-br from-teal-500/10 to-cyan-500/10 dark:from-teal-400/10 dark:to-cyan-400/10 border-teal-200/30 dark:border-teal-700/30",
                  index === 6 && "bg-gradient-to-br from-yellow-500/10 to-orange-500/10 dark:from-yellow-400/10 dark:to-orange-400/10 border-yellow-200/30 dark:border-yellow-700/30"
                )}>
                  {index === 0 && <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  {index === 1 && <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />}
                  {index === 2 && <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                  {index === 3 && <List className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                  {index === 4 && <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
                  {index === 5 && <Network className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
                  {index === 6 && <HardDrive className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />}
                </div>
                
                {/* 悬停提示 */}
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {node.title}
                  <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900 dark:border-r-gray-100"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
