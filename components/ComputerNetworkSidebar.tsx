'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen, Menu, Home, ChevronLeft, List, GitBranch, Network, Search, Cpu, HardDrive, Monitor, Database, Globe, Wifi, Shield, Server } from 'lucide-react'
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

interface ComputerNetworkSidebarProps {
  className?: string
}

export default function ComputerNetworkSidebar({ className }: ComputerNetworkSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [activeNode, setActiveNode] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState(false)

  // 从 localStorage 加载状态
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 加载展开节点状态
      const savedExpandedNodes = localStorage.getItem('computerNetworkExpandedNodes')
      if (savedExpandedNodes) {
        try {
          const parsed = JSON.parse(savedExpandedNodes)
          setExpandedNodes(new Set(parsed))
        } catch (error) {
          console.warn('Failed to parse expanded nodes from localStorage:', error)
        }
      }

      // 加载侧边栏收缩状态
      const savedCollapsed = localStorage.getItem('computerNetworkSidebarCollapsed')
      if (savedCollapsed !== null) {
        setIsCollapsed(JSON.parse(savedCollapsed))
      }
    }
  }, [])

  // 监听路径变化，更新活动节点状态
  useEffect(() => {
    // 检查当前路径，如果是练习页面主页，则不选中任何节点
    if (pathname === '/computer-network/practice') {
      // 在练习页面主页时，不选中任何节点
      setActiveNode('')
    } else {
      // 在其他页面时，根据当前路径设置活动节点
      const savedActiveNode = localStorage.getItem('computerNetworkActiveNode')
      if (savedActiveNode) {
        setActiveNode(savedActiveNode)
      }
    }
  }, [pathname])



  const treeData: TreeNode[] = [
    {
      id: 'network-basics',
      title: '计算机网络概述',
      children: [
        {
          id: 'network-concept',
          title: '网络基本概念',
          children: [
            { id: 'network-definition', title: '网络定义' },
            { id: 'network-classification', title: '网络分类' },
            { id: 'network-architecture', title: '网络体系结构' }
          ]
        },
        {
          id: 'osi-model',
          title: 'OSI参考模型',
          children: [
            { id: 'physical-layer', title: '物理层' },
            { id: 'data-link-layer', title: '数据链路层' },
            { id: 'network-layer', title: '网络层' },
            { id: 'transport-layer', title: '传输层' },
            { id: 'session-layer', title: '会话层' },
            { id: 'presentation-layer', title: '表示层' },
            { id: 'application-layer', title: '应用层' }
          ]
        },
        {
          id: 'tcp-ip-model',
          title: 'TCP/IP模型',
          children: [
            { id: 'network-interface', title: '网络接口层' },
            { id: 'internet-layer', title: '网际层' },
            { id: 'transport-layer-tcp', title: '传输层' },
            { id: 'application-layer-tcp', title: '应用层' }
          ]
        }
      ]
    },
    {
      id: 'physical-layer',
      title: '物理层',
      children: [
        {
          id: 'transmission-media',
          title: '传输媒体',
          children: [
            { id: 'twisted-pair', title: '双绞线' },
            { id: 'coaxial-cable', title: '同轴电缆' },
            { id: 'optical-fiber', title: '光纤' },
            { id: 'wireless-media', title: '无线传输' }
          ]
        },
        {
          id: 'data-encoding',
          title: '数据编码',
          children: [
            { id: 'digital-encoding', title: '数字编码' },
            { id: 'analog-encoding', title: '模拟编码' },
            { id: 'line-coding', title: '线路编码' }
          ]
        },
        {
          id: 'multiplexing',
          title: '多路复用',
          children: [
            { id: 'fdm', title: '频分复用' },
            { id: 'tdm', title: '时分复用' },
            { id: 'wdm', title: '波分复用' },
            { id: 'cdm', title: '码分复用' }
          ]
        }
      ]
    },
    {
      id: 'data-link-layer',
      title: '数据链路层',
      children: [
        {
          id: 'framing',
          title: '成帧',
          children: [
            { id: 'character-count', title: '字符计数法' },
            { id: 'character-stuffing', title: '字符填充法' },
            { id: 'bit-stuffing', title: '比特填充法' },
            { id: 'physical-coding', title: '物理编码法' }
          ]
        },
        {
          id: 'error-control',
          title: '差错控制',
          children: [
            { id: 'parity-check', title: '奇偶校验' },
            { id: 'checksum', title: '校验和' },
            { id: 'crc', title: '循环冗余校验' },
            { id: 'hamming-code', title: '海明码' }
          ]
        },
        {
          id: 'flow-control',
          title: '流量控制',
          children: [
            { id: 'stop-wait', title: '停止等待协议' },
            { id: 'sliding-window', title: '滑动窗口协议' },
            { id: 'go-back-n', title: 'Go-Back-N协议' },
            { id: 'selective-repeat', title: '选择重传协议' }
          ]
        },
        {
          id: 'mac-protocols',
          title: 'MAC协议',
          children: [
            { id: 'aloha', title: 'ALOHA协议' },
            { id: 'csma', title: 'CSMA协议' },
            { id: 'csma-cd', title: 'CSMA/CD协议' },
            { id: 'token-ring', title: '令牌环协议' }
          ]
        }
      ]
    },
    {
      id: 'network-layer',
      title: '网络层',
      children: [
        {
          id: 'routing',
          title: '路由选择',
          children: [
            { id: 'distance-vector', title: '距离向量算法' },
            { id: 'link-state', title: '链路状态算法' },
            { id: 'ospf', title: 'OSPF协议' },
            { id: 'bgp', title: 'BGP协议' }
          ]
        },
        {
          id: 'ip-protocol',
          title: 'IP协议',
          children: [
            { id: 'ipv4', title: 'IPv4协议' },
            { id: 'ipv6', title: 'IPv6协议' },
            { id: 'ip-addressing', title: 'IP地址' },
            { id: 'subnetting', title: '子网划分' }
          ]
        },
        {
          id: 'icmp',
          title: 'ICMP协议',
          children: [
            { id: 'icmp-messages', title: 'ICMP消息' },
            { id: 'ping', title: 'Ping命令' },
            { id: 'traceroute', title: 'Traceroute命令' }
          ]
        },
        {
          id: 'arp',
          title: 'ARP协议',
          children: [
            { id: 'arp-operation', title: 'ARP工作原理' },
            { id: 'arp-table', title: 'ARP表' },
            { id: 'rarp', title: 'RARP协议' }
          ]
        }
      ]
    },
    {
      id: 'transport-layer',
      title: '传输层',
      children: [
        {
          id: 'udp',
          title: 'UDP协议',
          children: [
            { id: 'udp-header', title: 'UDP首部' },
            { id: 'udp-features', title: 'UDP特点' },
            { id: 'udp-applications', title: 'UDP应用' }
          ]
        },
        {
          id: 'tcp',
          title: 'TCP协议',
          children: [
            { id: 'tcp-header', title: 'TCP首部' },
            { id: 'tcp-connection', title: 'TCP连接管理' },
            { id: 'tcp-reliability', title: 'TCP可靠性' },
            { id: 'tcp-flow-control', title: 'TCP流量控制' },
            { id: 'tcp-congestion', title: 'TCP拥塞控制' }
          ]
        }
      ]
    },
    {
      id: 'application-layer',
      title: '应用层',
      children: [
        {
          id: 'dns',
          title: 'DNS系统',
          children: [
            { id: 'dns-hierarchy', title: 'DNS层次结构' },
            { id: 'dns-resolution', title: '域名解析' },
            { id: 'dns-protocol', title: 'DNS协议' }
          ]
        },
        {
          id: 'http',
          title: 'HTTP协议',
          children: [
            { id: 'http-methods', title: 'HTTP方法' },
            { id: 'http-status', title: 'HTTP状态码' },
            { id: 'http-headers', title: 'HTTP首部' },
            { id: 'https', title: 'HTTPS协议' }
          ]
        },
        {
          id: 'email-protocols',
          title: '电子邮件',
          children: [
            { id: 'smtp', title: 'SMTP协议' },
            { id: 'pop3', title: 'POP3协议' },
            { id: 'imap', title: 'IMAP协议' }
          ]
        },
        {
          id: 'ftp',
          title: 'FTP协议',
          children: [
            { id: 'ftp-operation', title: 'FTP工作原理' },
            { id: 'ftp-commands', title: 'FTP命令' },
            { id: 'sftp', title: 'SFTP协议' }
          ]
        }
      ]
    },
    {
      id: 'network-security',
      title: '网络安全',
      children: [
        {
          id: 'cryptography',
          title: '密码学基础',
          children: [
            { id: 'symmetric-encryption', title: '对称加密' },
            { id: 'asymmetric-encryption', title: '非对称加密' },
            { id: 'hash-functions', title: '哈希函数' },
            { id: 'digital-signature', title: '数字签名' }
          ]
        },
        {
          id: 'authentication',
          title: '身份认证',
          children: [
            { id: 'password-auth', title: '密码认证' },
            { id: 'certificate-auth', title: '证书认证' },
            { id: 'biometric-auth', title: '生物认证' }
          ]
        },
        {
          id: 'network-attacks',
          title: '网络攻击',
          children: [
            { id: 'dos-attack', title: '拒绝服务攻击' },
            { id: 'man-in-middle', title: '中间人攻击' },
            { id: 'sql-injection', title: 'SQL注入' },
            { id: 'xss-attack', title: 'XSS攻击' }
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
      localStorage.setItem('computerNetworkExpandedNodes', JSON.stringify(Array.from(newExpanded)))
    }
  }

  const handleNodeClick = (nodeId: string, href?: string) => {
    setActiveNode(nodeId)
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('computerNetworkActiveNode', nodeId)
    }
    // 如果有href，使用 Next.js 路由进行客户端导航
    if (href) {
      router.push(href)
    }
  }

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed
    setIsCollapsed(newCollapsed)
    
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('computerNetworkSidebarCollapsed', JSON.stringify(newCollapsed))
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
            isActive && "bg-cyan-500/20 dark:bg-cyan-400/20 border-cyan-500/30 dark:border-cyan-400/30",
            isActive && "text-cyan-700 dark:text-cyan-300",
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
              handleNodeClick(node.id, node.href)
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
                  <FolderOpen className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
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
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-400/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
      
      {/* 标题区域 */}
      <div className="relative z-10 sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className={cn(
          "flex items-center justify-between py-4",
          isCollapsed ? "px-4" : "px-6"
        )}>
          {!isCollapsed && (
            <div className="flex-1">
              <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                计算机网络
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
                  "hover:shadow-cyan-500/25 dark:hover:shadow-cyan-400/25",
                  index === 0 && "bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-400/10 dark:to-blue-400/10 border-cyan-200/30 dark:border-cyan-700/30",
                  index === 1 && "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-400/10 dark:to-indigo-400/10 border-blue-200/30 dark:border-blue-700/30",
                  index === 2 && "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-400/10 dark:to-purple-400/10 border-indigo-200/30 dark:border-indigo-700/30",
                  index === 3 && "bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-400/10 dark:to-pink-400/10 border-purple-200/30 dark:border-purple-700/30",
                  index === 4 && "bg-gradient-to-br from-pink-500/10 to-red-500/10 dark:from-pink-400/10 dark:to-red-400/10 border-pink-200/30 dark:border-pink-700/30",
                  index === 5 && "bg-gradient-to-br from-red-500/10 to-orange-500/10 dark:from-red-400/10 dark:to-orange-400/10 border-red-200/30 dark:border-red-700/30",
                  index === 6 && "bg-gradient-to-br from-orange-500/10 to-yellow-500/10 dark:from-orange-400/10 dark:to-yellow-400/10 border-orange-200/30 dark:border-orange-700/30"
                )}>
                  {index === 0 && <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
                  {index === 1 && <Wifi className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  {index === 2 && <Network className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
                  {index === 3 && <Server className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                  {index === 4 && <Database className="w-5 h-5 text-pink-600 dark:text-pink-400" />}
                  {index === 5 && <Cpu className="w-5 h-5 text-red-600 dark:text-red-400" />}
                  {index === 6 && <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
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