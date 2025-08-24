"use client"

import { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import DataStructureSidebar from '@/components/DataStructureSidebar'
import { 
  Database, 
  GitBranch, 
  Network, 
  Layers, 
  Search, 
  SortAsc,
  BarChart3,
  Target,
  Zap,
  Lightbulb,
  Eye,
  MousePointer,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Share2,
  Settings,
  ChevronRight,
  ChevronDown,
  Star,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

interface MindMapNode {
  id: string
  title: string
  description?: string
  icon: any
  color: string
  bgColor: string
  children?: MindMapNode[]
  level: number
  x: number
  y: number
  isExpanded?: boolean
  isHighlighted?: boolean
}

export default function DataStructureMindmapPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [zoom, setZoom] = useState(100)
  const [centerX, setCenterX] = useState(0)
  const [centerY, setCenterY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  // 数据结构思维导图数据 - 符合六大核心要求
  const mindmapData: MindMapNode = {
    id: 'data-structure',
    title: '数据结构',
    description: '数据组织与算法设计',
    icon: Database,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-gradient-to-br from-orange-400 to-red-500',
    level: 0,
    x: 0,
    y: 0,
    isExpanded: true,
    children: [
      {
        id: 'linear-structure',
        title: '线性结构',
        description: '数据元素之间存在一对一关系',
        icon: Layers,
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-gradient-to-br from-blue-400 to-cyan-500',
        level: 1,
        x: -300,
        y: -200,
        isExpanded: true,
        children: [
          {
            id: 'array',
            title: '数组',
            description: '连续存储的线性表',
            icon: Layers,
            color: 'text-blue-500 dark:text-blue-300',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
            level: 2,
            x: -450,
            y: -300,
            children: [
              { id: 'static-array', title: '静态数组', icon: Layers, color: 'text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20', level: 3, x: -500, y: -350 },
              { id: 'dynamic-array', title: '动态数组', icon: Layers, color: 'text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20', level: 3, x: -400, y: -350 }
            ]
          },
          {
            id: 'linked-list',
            title: '链表',
            description: '非连续存储的线性表',
            icon: GitBranch,
            color: 'text-blue-500 dark:text-blue-300',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
            level: 2,
            x: -150,
            y: -300,
            children: [
              { id: 'singly-linked', title: '单链表', icon: GitBranch, color: 'text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20', level: 3, x: -200, y: -350 },
              { id: 'doubly-linked', title: '双链表', icon: GitBranch, color: 'text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20', level: 3, x: -100, y: -350 },
              { id: 'circular-linked', title: '循环链表', icon: GitBranch, color: 'text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20', level: 3, x: -150, y: -400 }
            ]
          },
          {
            id: 'stack',
            title: '栈',
            description: '后进先出(LIFO)',
            icon: Layers,
            color: 'text-blue-500 dark:text-blue-300',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
            level: 2,
            x: 0,
            y: -300,
            children: [
              { id: 'array-stack', title: '数组实现', icon: Layers, color: 'text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20', level: 3, x: -50, y: -350 },
              { id: 'linked-stack', title: '链表实现', icon: Layers, color: 'text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20', level: 3, x: 50, y: -350 }
            ]
          },
          {
            id: 'queue',
            title: '队列',
            description: '先进先出(FIFO)',
            icon: Layers,
            color: 'text-blue-500 dark:text-blue-300',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
            level: 2,
            x: 150,
            y: -300,
            children: [
              { id: 'array-queue', title: '数组实现', icon: Layers, color: 'text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20', level: 3, x: 100, y: -350 },
              { id: 'linked-queue', title: '链表实现', icon: Layers, color: 'text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20', level: 3, x: 200, y: -350 },
              { id: 'priority-queue', title: '优先队列', icon: Layers, color: 'text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20', level: 3, x: 150, y: -400 }
            ]
          }
        ]
      },
      {
        id: 'tree-structure',
        title: '树形结构',
        description: '数据元素之间存在一对多关系',
        icon: GitBranch,
        color: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-gradient-to-br from-green-400 to-emerald-500',
        level: 1,
        x: 300,
        y: -200,
        isExpanded: true,
        children: [
          {
            id: 'binary-tree',
            title: '二叉树',
            description: '每个节点最多两个子节点',
            icon: GitBranch,
            color: 'text-green-500 dark:text-green-300',
            bgColor: 'bg-green-100 dark:bg-green-900/30',
            level: 2,
            x: 200,
            y: -300,
            children: [
              { id: 'bst', title: '二叉搜索树', icon: GitBranch, color: 'text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20', level: 3, x: 150, y: -350 },
              { id: 'avl-tree', title: 'AVL树', icon: GitBranch, color: 'text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20', level: 3, x: 250, y: -350 },
              { id: 'red-black-tree', title: '红黑树', icon: GitBranch, color: 'text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20', level: 3, x: 200, y: -400 }
            ]
          },
          {
            id: 'heap',
            title: '堆',
            description: '完全二叉树',
            icon: GitBranch,
            color: 'text-green-500 dark:text-green-300',
            bgColor: 'bg-green-100 dark:bg-green-900/30',
            level: 2,
            x: 400,
            y: -300,
            children: [
              { id: 'max-heap', title: '最大堆', icon: GitBranch, color: 'text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20', level: 3, x: 350, y: -350 },
              { id: 'min-heap', title: '最小堆', icon: GitBranch, color: 'text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20', level: 3, x: 450, y: -350 }
            ]
          },
          {
            id: 'b-tree',
            title: 'B树',
            description: '多路平衡树',
            icon: GitBranch,
            color: 'text-green-500 dark:text-green-300',
            bgColor: 'bg-green-100 dark:bg-green-900/30',
            level: 2,
            x: 300,
            y: -100,
            children: [
              { id: 'b-plus-tree', title: 'B+树', icon: GitBranch, color: 'text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20', level: 3, x: 250, y: -150 },
              { id: 'b-star-tree', title: 'B*树', icon: GitBranch, color: 'text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20', level: 3, x: 350, y: -150 }
            ]
          }
        ]
      },
      {
        id: 'graph-structure',
        title: '图形结构',
        description: '数据元素之间存在多对多关系',
        icon: Network,
        color: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-gradient-to-br from-purple-400 to-pink-500',
        level: 1,
        x: 0,
        y: 200,
        isExpanded: true,
        children: [
          {
            id: 'directed-graph',
            title: '有向图',
            description: '边有方向',
            icon: Network,
            color: 'text-purple-500 dark:text-purple-300',
            bgColor: 'bg-purple-100 dark:bg-purple-900/30',
            level: 2,
            x: -200,
            y: 300,
            children: [
              { id: 'dag', title: '有向无环图', icon: Network, color: 'text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-900/20', level: 3, x: -250, y: 350 },
              { id: 'strongly-connected', title: '强连通图', icon: Network, color: 'text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-900/20', level: 3, x: -150, y: 350 }
            ]
          },
          {
            id: 'undirected-graph',
            title: '无向图',
            description: '边无方向',
            icon: Network,
            color: 'text-purple-500 dark:text-purple-300',
            bgColor: 'bg-purple-100 dark:bg-purple-900/30',
            level: 2,
            x: 200,
            y: 300,
            children: [
              { id: 'connected-graph', title: '连通图', icon: Network, color: 'text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-900/20', level: 3, x: 150, y: 350 },
              { id: 'complete-graph', title: '完全图', icon: Network, color: 'text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-900/20', level: 3, x: 250, y: 350 }
            ]
          },
          {
            id: 'weighted-graph',
            title: '带权图',
            description: '边有权重',
            icon: Network,
            color: 'text-purple-500 dark:text-purple-300',
            bgColor: 'bg-purple-100 dark:bg-purple-900/30',
            level: 2,
            x: 0,
            y: 400,
            children: [
              { id: 'positive-weighted', title: '正权图', icon: Network, color: 'text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-900/20', level: 3, x: -50, y: 450 },
              { id: 'negative-weighted', title: '负权图', icon: Network, color: 'text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-900/20', level: 3, x: 50, y: 450 }
            ]
          }
        ]
      },
      {
        id: 'algorithm-analysis',
        title: '算法分析',
        description: '算法效率与复杂度分析',
        icon: BarChart3,
        color: 'text-indigo-600 dark:text-indigo-400',
        bgColor: 'bg-gradient-to-br from-indigo-400 to-purple-500',
        level: 1,
        x: -300,
        y: 200,
        isExpanded: true,
        children: [
          {
            id: 'time-complexity',
            title: '时间复杂度',
            description: '算法执行时间分析',
            icon: BarChart3,
            color: 'text-indigo-500 dark:text-indigo-300',
            bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
            level: 2,
            x: -400,
            y: 300,
            children: [
              { id: 'big-o', title: '大O表示法', icon: BarChart3, color: 'text-indigo-400', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20', level: 3, x: -450, y: 350 },
              { id: 'best-case', title: '最好情况', icon: BarChart3, color: 'text-indigo-400', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20', level: 3, x: -350, y: 350 },
              { id: 'worst-case', title: '最坏情况', icon: BarChart3, color: 'text-indigo-400', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20', level: 3, x: -400, y: 400 }
            ]
          },
          {
            id: 'space-complexity',
            title: '空间复杂度',
            description: '算法内存使用分析',
            icon: BarChart3,
            color: 'text-indigo-500 dark:text-indigo-300',
            bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
            level: 2,
            x: -200,
            y: 300,
            children: [
              { id: 'auxiliary-space', title: '辅助空间', icon: BarChart3, color: 'text-indigo-400', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20', level: 3, x: -250, y: 350 },
              { id: 'input-space', title: '输入空间', icon: BarChart3, color: 'text-indigo-400', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20', level: 3, x: -150, y: 350 }
            ]
          }
        ]
      }
    ]
  }

  // 渲染思维导图节点
  const renderNode = (node: MindMapNode, parentX: number = 0, parentY: number = 0) => {
    const x = parentX + node.x + centerX
    const y = parentY + node.y + centerY
    const scale = zoom / 100

    return (
      <div key={node.id}>
        {/* 连接线 */}
        {node.level > 0 && (
          <svg
            className="absolute pointer-events-none"
            style={{
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              zIndex: 1
            }}
          >
            <line
              x1={parentX + centerX}
              y1={parentY + centerY}
              x2={x}
              y2={y}
              stroke={node.level === 1 ? '#f97316' : node.level === 2 ? '#3b82f6' : '#8b5cf6'}
              strokeWidth={node.level === 1 ? 3 : node.level === 2 ? 2 : 1}
              strokeDasharray={node.level === 1 ? 'none' : '5,5'}
              opacity={0.6}
            />
          </svg>
        )}

        {/* 节点 */}
        <div
          className={`absolute cursor-pointer transition-all duration-300 transform hover:scale-110 ${
            selectedNode === node.id ? 'ring-4 ring-orange-300 dark:ring-orange-600' : ''
          }`}
          style={{
            left: x,
            top: y,
            transform: `scale(${scale})`,
            zIndex: node.level === 0 ? 10 : node.level === 1 ? 8 : 6
          }}
          onClick={() => setSelectedNode(node.id)}
        >
          <div className={`${node.bgColor} rounded-2xl p-4 shadow-lg border-2 border-white/20 dark:border-gray-700/20 backdrop-blur-sm`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 ${node.bgColor} rounded-lg flex items-center justify-center`}>
                <node.icon className={`w-5 h-5 ${node.color}`} />
              </div>
              <div>
                <h3 className={`font-bold text-sm ${node.color}`}>{node.title}</h3>
                {node.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{node.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 递归渲染子节点 */}
        {node.children && node.isExpanded && node.children.map(child => 
          renderNode(child, x, y)
        )}
      </div>
    )
  }

  // 鼠标拖拽处理
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - centerX, y: e.clientY - centerY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setCenterX(e.clientX - dragStart.x)
      setCenterY(e.clientY - dragStart.y)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 缩放控制
  const handleZoomIn = () => setZoom(prev => Math.min(200, prev + 10))
  const handleZoomOut = () => setZoom(prev => Math.max(50, prev - 10))
  const handleResetZoom = () => setZoom(100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="flex h-screen pt-16">
        {/* 左侧边栏 */}
        <div className="flex-shrink-0">
          <DataStructureSidebar />
        </div>
        
        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col">
          {/* 工具栏 */}
          <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-4 border-b border-white/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">数据结构思维导图</h1>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/80 transition-colors"
                  >
                    <ZoomOut className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-300 min-w-[60px] text-center">
                    {zoom}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/80 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/80 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/80 transition-colors">
                  <Download className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/80 transition-colors">
                  <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/80 transition-colors">
                  <Settings className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>

          {/* 思维导图画布 */}
          <div 
            ref={canvasRef}
            className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* 背景网格 */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* 思维导图内容 */}
            <div className="absolute inset-0">
              {renderNode(mindmapData)}
            </div>

            {/* 中心指示器 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-4 h-4 bg-orange-500 rounded-full opacity-30" />
            </div>
          </div>

          {/* 底部信息栏 */}
          <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-4 border-t border-white/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>中心明确</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GitBranch className="w-4 h-4" />
                  <span>结构放射</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>关键词精炼</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>视觉突出</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>逻辑清晰</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>强调重点</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                符合思维导图六大核心要求
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
