'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen, Menu, Home, ChevronLeft, List, GitBranch, Network, Search, Cpu, HardDrive, Monitor, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface TreeNode {
  id: string
  title: string
  children?: TreeNode[]
  isOpen?: boolean
}

interface OperatingSystemSidebarProps {
  className?: string
}

export default function OperatingSystemSidebar({ className }: OperatingSystemSidebarProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [activeNode, setActiveNode] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState(false)

  // 从 localStorage 加载状态
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 加载展开节点状态
      const savedExpandedNodes = localStorage.getItem('operatingSystemExpandedNodes')
      if (savedExpandedNodes) {
        try {
          const parsed = JSON.parse(savedExpandedNodes)
          setExpandedNodes(new Set(parsed))
        } catch (error) {
          console.warn('Failed to parse expanded nodes from localStorage:', error)
        }
      }

      // 加载侧边栏收缩状态
      const savedCollapsed = localStorage.getItem('operatingSystemSidebarCollapsed')
      if (savedCollapsed !== null) {
        setIsCollapsed(JSON.parse(savedCollapsed))
      }

      // 加载活动节点状态
      const savedActiveNode = localStorage.getItem('operatingSystemActiveNode')
      if (savedActiveNode) {
        setActiveNode(savedActiveNode)
      }
    }
  }, [])

  const treeData: TreeNode[] = [
    {
      id: 'process-management',
      title: '进程管理',
      children: [
        {
          id: 'process-concept',
          title: '进程概念',
          children: [
            { id: 'process-definition', title: '进程定义' },
            { id: 'process-state', title: '进程状态' },
            { id: 'process-control-block', title: '进程控制块' }
          ]
        },
        {
          id: 'process-scheduling',
          title: '进程调度',
          children: [
            { id: 'scheduling-algorithms', title: '调度算法' },
            { id: 'priority-scheduling', title: '优先级调度' },
            { id: 'round-robin', title: '时间片轮转' }
          ]
        },
        {
          id: 'process-synchronization',
          title: '进程同步',
          children: [
            { id: 'critical-section', title: '临界区问题' },
            { id: 'semaphore', title: '信号量' },
            { id: 'deadlock', title: '死锁' }
          ]
        }
      ]
    },
    {
      id: 'memory-management',
      title: '内存管理',
      children: [
        {
          id: 'memory-allocation',
          title: '内存分配',
          children: [
            { id: 'partition-allocation', title: '分区分配' },
            { id: 'paging', title: '分页管理' },
            { id: 'segmentation', title: '分段管理' }
          ]
        },
        {
          id: 'virtual-memory',
          title: '虚拟内存',
          children: [
            { id: 'page-replacement', title: '页面置换' },
            { id: 'thrashing', title: '抖动现象' },
            { id: 'working-set', title: '工作集' }
          ]
        },
        {
          id: 'memory-protection',
          title: '内存保护',
          children: [
            { id: 'access-control', title: '访问控制' },
            { id: 'memory-isolation', title: '内存隔离' }
          ]
        }
      ]
    },
    {
      id: 'file-system',
      title: '文件系统',
      children: [
        {
          id: 'file-concept',
          title: '文件概念',
          children: [
            { id: 'file-structure', title: '文件结构' },
            { id: 'file-operations', title: '文件操作' },
            { id: 'file-attributes', title: '文件属性' }
          ]
        },
        {
          id: 'directory-structure',
          title: '目录结构',
          children: [
            { id: 'directory-organization', title: '目录组织' },
            { id: 'path-resolution', title: '路径解析' },
            { id: 'mounting', title: '挂载' }
          ]
        },
        {
          id: 'file-allocation',
          title: '文件分配',
          children: [
            { id: 'contiguous-allocation', title: '连续分配' },
            { id: 'linked-allocation', title: '链接分配' },
            { id: 'indexed-allocation', title: '索引分配' }
          ]
        }
      ]
    },
    {
      id: 'device-management',
      title: '设备管理',
      children: [
        {
          id: 'i-o-system',
          title: 'I/O系统',
          children: [
            { id: 'i-o-architecture', title: 'I/O架构' },
            { id: 'i-o-scheduling', title: 'I/O调度' },
            { id: 'buffering', title: '缓冲技术' }
          ]
        },
        {
          id: 'disk-management',
          title: '磁盘管理',
          children: [
            { id: 'disk-scheduling', title: '磁盘调度' },
            { id: 'disk-formatting', title: '磁盘格式化' },
            { id: 'raid', title: 'RAID技术' }
          ]
        },
        {
          id: 'device-drivers',
          title: '设备驱动',
          children: [
            { id: 'driver-interface', title: '驱动接口' },
            { id: 'plug-and-play', title: '即插即用' }
          ]
        }
      ]
    },
    {
      id: 'security',
      title: '系统安全',
      children: [
        {
          id: 'authentication',
          title: '身份认证',
          children: [
            { id: 'user-authentication', title: '用户认证' },
            { id: 'access-control', title: '访问控制' },
            { id: 'password-security', title: '密码安全' }
          ]
        },
        {
          id: 'protection',
          title: '保护机制',
          children: [
            { id: 'memory-protection', title: '内存保护' },
            { id: 'cpu-protection', title: 'CPU保护' },
            { id: 'file-protection', title: '文件保护' }
          ]
        },
        {
          id: 'malware',
          title: '恶意软件',
          children: [
            { id: 'virus-detection', title: '病毒检测' },
            { id: 'firewall', title: '防火墙' }
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
      localStorage.setItem('operatingSystemExpandedNodes', JSON.stringify(Array.from(newExpanded)))
    }
  }

  const handleNodeClick = (nodeId: string) => {
    setActiveNode(nodeId)
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('operatingSystemActiveNode', nodeId)
    }
    // 这里可以添加路由跳转逻辑
  }

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed
    setIsCollapsed(newCollapsed)
    
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('operatingSystemSidebarCollapsed', JSON.stringify(newCollapsed))
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
            isActive && "bg-green-500/20 dark:bg-green-400/20 border-green-500/30 dark:border-green-400/30",
            isActive && "text-green-700 dark:text-green-300",
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
                  <FolderOpen className="w-3 h-3 text-green-500 dark:text-green-400" />
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
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-400/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
      
      {/* 标题区域 */}
      <div className="relative z-10 sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className={cn(
          "flex items-center justify-between py-4",
          isCollapsed ? "px-4" : "px-6"
        )}>
          {!isCollapsed && (
            <div className="flex-1">
              <h2 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                操作系统
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
                  "hover:shadow-green-500/25 dark:hover:shadow-green-400/25",
                  index === 0 && "bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-400/10 dark:to-emerald-400/10 border-green-200/30 dark:border-green-700/30",
                  index === 1 && "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-400/10 dark:to-cyan-400/10 border-blue-200/30 dark:border-blue-700/30",
                  index === 2 && "bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-400/10 dark:to-pink-400/10 border-purple-200/30 dark:border-purple-700/30",
                  index === 3 && "bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-400/10 dark:to-red-400/10 border-orange-200/30 dark:border-orange-700/30",
                  index === 4 && "bg-gradient-to-br from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-indigo-200/30 dark:border-indigo-700/30"
                )}>
                  {index === 0 && <Cpu className="w-5 h-5 text-green-600 dark:text-green-400" />}
                  {index === 1 && <HardDrive className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  {index === 2 && <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                  {index === 3 && <Monitor className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                  {index === 4 && <Settings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
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