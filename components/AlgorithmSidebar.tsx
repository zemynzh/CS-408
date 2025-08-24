'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen, Menu, Home, ChevronLeft, List, GitBranch, Network, Search, Zap, Target, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

interface TreeNode {
  id: string
  title: string
  children?: TreeNode[]
  isOpen?: boolean
  href?: string
}

interface AlgorithmSidebarProps {
  className?: string
}

export default function AlgorithmSidebar({ className }: AlgorithmSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [activeNode, setActiveNode] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState(false)

  // 从 localStorage 加载状态
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 加载展开节点状态
      const savedExpandedNodes = localStorage.getItem('algorithmExpandedNodes')
      if (savedExpandedNodes) {
        try {
          const parsed = JSON.parse(savedExpandedNodes)
          setExpandedNodes(new Set(parsed))
        } catch (error) {
          console.warn('Failed to parse expanded nodes from localStorage:', error)
        }
      }

      // 加载侧边栏收缩状态
      const savedCollapsed = localStorage.getItem('algorithmSidebarCollapsed')
      if (savedCollapsed !== null) {
        setIsCollapsed(JSON.parse(savedCollapsed))
      }
    }
  }, [])

  // 监听路径变化，更新活动节点状态
  useEffect(() => {
    // 检查当前路径，如果是算法可视化主页，则不选中任何节点
    if (pathname === '/algorithm') {
      // 在算法可视化主页时，不选中任何节点
      setActiveNode('')
    } else {
      // 在其他算法页面时，根据当前路径设置活动节点
      const savedActiveNode = localStorage.getItem('algorithmActiveNode')
      if (savedActiveNode) {
        setActiveNode(savedActiveNode)
      }
    }
  }, [pathname])



  const treeData: TreeNode[] = [
    {
      id: 'basic-algorithms',
      title: '基础算法',
      children: [
        {
          id: 'sorting',
          title: '排序算法',
          children: [
            { id: 'bubble-sort', title: '冒泡排序' },
            { id: 'selection-sort', title: '选择排序' },
            { id: 'insertion-sort', title: '插入排序' },
            { id: 'quick-sort', title: '快速排序' },
            { id: 'merge-sort', title: '归并排序' },
            { id: 'heap-sort', title: '堆排序' }
          ]
        },
        {
          id: 'searching',
          title: '查找算法',
          children: [
            { id: 'linear-search', title: '线性查找' },
            { id: 'binary-search', title: '二分查找' },
            { id: 'depth-first-search', title: '深度优先搜索' },
            { id: 'breadth-first-search', title: '广度优先搜索' }
          ]
        },
        {
          id: 'recursion',
          title: '递归算法',
          children: [
            { id: 'factorial', title: '阶乘计算' },
            { id: 'fibonacci', title: '斐波那契数列' },
            { id: 'tower-of-hanoi', title: '汉诺塔' },
            { id: 'backtracking', title: '回溯算法' }
          ]
        }
      ]
    },
    {
      id: 'graph-algorithms',
      title: '图论算法',
      children: [
        {
          id: 'shortest-path',
          title: '最短路径',
          children: [
            { id: 'dijkstra', title: 'Dijkstra算法' },
            { id: 'bellman-ford', title: 'Bellman-Ford算法' },
            { id: 'floyd-warshall', title: 'Floyd-Warshall算法' }
          ]
        },
        {
          id: 'minimum-spanning-tree',
          title: '最小生成树',
          children: [
            { id: 'prim', title: 'Prim算法' },
            { id: 'kruskal', title: 'Kruskal算法' }
          ]
        },
        {
          id: 'network-flow',
          title: '网络流',
          children: [
            { id: 'ford-fulkerson', title: 'Ford-Fulkerson算法' },
            { id: 'edmonds-karp', title: 'Edmonds-Karp算法' }
          ]
        }
      ]
    },
    {
      id: 'dynamic-programming',
      title: '动态规划',
      children: [
        {
          id: 'classic-dp',
          title: '经典问题',
          children: [
            { id: 'longest-common-subsequence', title: '最长公共子序列' },
            { id: 'longest-increasing-subsequence', title: '最长递增子序列' },
            { id: 'knapsack-problem', title: '背包问题' },
            { id: 'edit-distance', title: '编辑距离' }
          ]
        },
        {
          id: 'optimization-dp',
          title: '优化问题',
          children: [
            { id: 'matrix-chain-multiplication', title: '矩阵链乘法' },
            { id: 'optimal-binary-search-tree', title: '最优二叉搜索树' },
            { id: 'traveling-salesman', title: '旅行商问题' }
          ]
        }
      ]
    },
    {
      id: 'greedy-algorithms',
      title: '贪心算法',
      children: [
        {
          id: 'scheduling',
          title: '调度问题',
          children: [
            { id: 'activity-selection', title: '活动选择' },
            { id: 'job-scheduling', title: '作业调度' },
            { id: 'interval-scheduling', title: '区间调度' }
          ]
        },
        {
          id: 'optimization',
          title: '优化问题',
          children: [
            { id: 'huffman-coding', title: '哈夫曼编码' },
            { id: 'fractional-knapsack', title: '分数背包' },
            { id: 'coin-change', title: '硬币找零' }
          ]
        }
      ]
    },
    {
      id: 'advanced-algorithms',
      title: '高级算法',
      children: [
        {
          id: 'string-algorithms',
          title: '字符串算法',
          children: [
            { id: 'kmp', title: 'KMP算法' },
            { id: 'boyer-moore', title: 'Boyer-Moore算法' },
            { id: 'rabin-karp', title: 'Rabin-Karp算法' },
            { id: 'suffix-array', title: '后缀数组' }
          ]
        },
        {
          id: 'geometric-algorithms',
          title: '几何算法',
          children: [
            { id: 'convex-hull', title: '凸包算法' },
            { id: 'closest-pair', title: '最近点对' },
            { id: 'line-intersection', title: '线段相交' }
          ]
        },
        {
          id: 'numerical-algorithms',
          title: '数值算法',
          children: [
            { id: 'fast-fourier-transform', title: '快速傅里叶变换' },
            { id: 'modular-exponentiation', title: '模幂运算' },
            { id: 'primality-testing', title: '素数测试' }
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
      localStorage.setItem('algorithmExpandedNodes', JSON.stringify(Array.from(newExpanded)))
    }
  }

  const handleNodeClick = (nodeId: string) => {
    setActiveNode(nodeId)
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('algorithmActiveNode', nodeId)
    }
    
    // 路由跳转逻辑
    switch (nodeId) {
      case 'bubble-sort':
        router.push('/algorithm/visualizations/bubble-sort')
        break
      case 'selection-sort':
        router.push('/algorithm/visualizations/selection-sort')
        break
      case 'insertion-sort':
        router.push('/algorithm/visualizations/insertion-sort')
        break
      case 'quick-sort':
        router.push('/algorithm/visualizations/quick-sort')
        break
      case 'merge-sort':
        router.push('/algorithm/visualizations/merge-sort')
        break
      case 'heap-sort':
        router.push('/algorithm/visualizations/heap-sort')
        break
      case 'linear-search':
        router.push('/algorithm/visualizations/linear-search')
        break
      case 'binary-search':
        router.push('/algorithm/visualizations/binary-search')
        break
      case 'depth-first-search':
        router.push('/algorithm/visualizations/depth-first-search')
        break
      case 'breadth-first-search':
        router.push('/algorithm/visualizations/breadth-first-search')
        break
      case 'factorial':
        router.push('/algorithm/visualizations/factorial')
        break
      case 'fibonacci':
        router.push('/algorithm/visualizations/fibonacci')
        break
      case 'tower-of-hanoi':
        router.push('/algorithm/visualizations/tower-of-hanoi')
        break
      case 'backtracking':
        router.push('/algorithm/visualizations/backtracking')
        break
      // 可以继续添加其他算法的路由
      default:
        break
    }
  }

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed
    setIsCollapsed(newCollapsed)
    
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('algorithmSidebarCollapsed', JSON.stringify(newCollapsed))
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
                算法可视化
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                动态演示算法执行过程
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
                  index === 4 && "bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-400/10 dark:to-blue-400/10 border-indigo-200/30 dark:border-indigo-700/30"
                )}>
                  {index === 0 && <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  {index === 1 && <Network className="w-5 h-5 text-green-600 dark:text-green-400" />}
                  {index === 2 && <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                  {index === 3 && <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                  {index === 4 && <GitBranch className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
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