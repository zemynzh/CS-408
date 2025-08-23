"use client"

import Navbar from '@/components/Navbar'
import { 
  Brain, 
  Lightbulb, 
  Network, 
  Layers, 
  Code, 
  Database,
  Cpu,
  Globe,
  Shield,
  Zap,
  Target,
  BookOpen,
  ChevronRight,
  Plus,
  Minus,
  RotateCcw,
  Download,
  Share2,
  Settings,
  Search,
  Filter,
  Grid,
  List,
  Eye,
  EyeOff
} from 'lucide-react'
import { useState } from 'react'

export default function MindmapPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [zoom, setZoom] = useState(100)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showDetails, setShowDetails] = useState(true)

  const mindmapData = {
    center: {
      id: 'cs408',
      title: 'CS-408 计算机考研',
      icon: Brain,
      color: 'from-purple-400 to-pink-400 dark:from-purple-500 dark:to-pink-500'
    },
    branches: [
      {
        id: 'computer-organization',
        title: '计算机组成原理',
        icon: Cpu,
        color: 'from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500',
        description: '计算机硬件系统结构与工作原理',
        topics: [
          '数据表示与运算',
          '存储系统',
          '指令系统',
          'CPU结构',
          '总线系统',
          '输入输出系统'
        ]
      },
      {
        id: 'operating-system',
        title: '操作系统',
        icon: Layers,
        color: 'from-green-400 to-emerald-400 dark:from-green-500 dark:to-emerald-500',
        description: '计算机系统资源管理与进程调度',
        topics: [
          '进程管理',
          '内存管理',
          '文件系统',
          '设备管理',
          '死锁处理',
          '系统安全'
        ]
      },
      {
        id: 'computer-network',
        title: '计算机网络',
        icon: Globe,
        color: 'from-indigo-400 to-purple-400 dark:from-indigo-500 dark:to-purple-500',
        description: '网络通信协议与体系结构',
        topics: [
          '网络体系结构',
          '物理层',
          '数据链路层',
          '网络层',
          '传输层',
          '应用层'
        ]
      },
      {
        id: 'data-structure',
        title: '数据结构',
        icon: Database,
        color: 'from-orange-400 to-red-400 dark:from-orange-500 dark:to-red-500',
        description: '数据组织与算法设计',
        topics: [
          '线性结构',
          '树形结构',
          '图形结构',
          '查找算法',
          '排序算法',
          '算法分析'
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="pt-16 p-6 lg:p-8">
        {/* 页面标题区域 */}
        <section className="mb-8 mt-8 lg:mt-12">
          <div className="relative overflow-hidden">
            {/* 背景液体效果 */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/6 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>
            
            <div className="relative glass-liquid bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-2xl shadow-black/10 dark:shadow-black/30">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 dark:from-purple-500 dark:to-pink-600 rounded-3xl mb-6 shadow-2xl">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
                  思维导图
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  CS-408 计算机考研知识点可视化思维导图
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>4个核心科目</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span>24个主要知识点</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Zap className="w-4 h-4" />
                    <span>交互式学习</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 工具栏 */}
        <section className="mb-8 mt-4">
          <div className="glass-liquid bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl p-4 border border-white/30 dark:border-gray-700/30 shadow-xl shadow-black/10 dark:shadow-black/30">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setZoom(Math.max(50, zoom - 10))}
                  className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 p-2 rounded-xl border border-white/30 dark:border-gray-600/30 transition-all duration-300 hover:scale-105"
                >
                  <Minus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px] text-center">
                  {zoom}%
                </span>
                <button 
                  onClick={() => setZoom(Math.min(200, zoom + 10))}
                  className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 p-2 rounded-xl border border-white/30 dark:border-gray-600/30 transition-all duration-300 hover:scale-105"
                >
                  <Plus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button 
                  onClick={() => setZoom(100)}
                  className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 p-2 rounded-xl border border-white/30 dark:border-gray-600/30 transition-all duration-300 hover:scale-105"
                >
                  <RotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                                 <button 
                   onClick={() => setViewMode('grid')}
                   className={`p-2 rounded-xl transition-all duration-300 ${
                     viewMode === 'grid' 
                       ? 'glass-liquid bg-purple-400/30 dark:bg-purple-400/20 border border-purple-400/40 dark:border-purple-600/30' 
                       : 'glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 border border-white/30 dark:border-gray-600/30'
                   }`}
                 >
                   <Grid className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                 </button>
                 <button 
                   onClick={() => setViewMode('list')}
                   className={`p-2 rounded-xl transition-all duration-300 ${
                     viewMode === 'list' 
                       ? 'glass-liquid bg-purple-400/30 dark:bg-purple-400/20 border border-purple-400/40 dark:border-purple-600/30' 
                       : 'glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 border border-white/30 dark:border-gray-600/30'
                   }`}
                 >
                   <List className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                 </button>
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 p-2 rounded-xl border border-white/30 dark:border-gray-600/30 transition-all duration-300 hover:scale-105"
                >
                  {showDetails ? <EyeOff className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Eye className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 p-2 rounded-xl border border-white/30 dark:border-gray-600/30 transition-all duration-300 hover:scale-105">
                  <Download className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 p-2 rounded-xl border border-white/30 dark:border-gray-600/30 transition-all duration-300 hover:scale-105">
                  <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 p-2 rounded-xl border border-white/30 dark:border-gray-600/30 transition-all duration-300 hover:scale-105">
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 思维导图主体 */}
        <section className="mb-8">
          <div className="glass-liquid bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl shadow-black/10 dark:shadow-black/30 min-h-[600px]">
            {/* 中心节点 */}
            <div className="flex justify-center mb-12">
                             <div 
                 className={`glass-liquid bg-gradient-to-br ${mindmapData.center.color} backdrop-blur-2xl rounded-3xl p-6 border border-white/40 dark:border-gray-700/30 shadow-2xl shadow-black/20 dark:shadow-black/40 transition-all duration-500 hover:scale-110 cursor-pointer ${
                   selectedNode === mindmapData.center.id ? 'ring-4 ring-purple-300/50 dark:ring-purple-600/50' : ''
                 }`}
                 onClick={() => setSelectedNode(mindmapData.center.id)}
               >
                                 <div className="text-center">
                   <div className="w-16 h-16 bg-white/30 dark:bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                     <mindmapData.center.icon className="w-8 h-8 text-gray-800 dark:text-white" />
                   </div>
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{mindmapData.center.title}</h3>
                   <p className="text-gray-700 dark:text-white/80 text-sm">计算机考研核心</p>
                 </div>
              </div>
            </div>

            {/* 分支节点 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mindmapData.branches.map((branch, index) => (
                <div key={branch.id} className="relative">
                  {/* 连接线 */}
                  <div className="absolute top-1/2 left-1/2 w-px h-16 bg-gradient-to-b from-purple-400/30 to-transparent transform -translate-x-1/2 -translate-y-full"></div>
                  
                                     <div 
                     className={`glass-liquid bg-gradient-to-br ${branch.color} backdrop-blur-2xl rounded-2xl p-6 border border-white/40 dark:border-gray-700/30 shadow-xl shadow-black/20 dark:shadow-black/40 transition-all duration-500 hover:scale-105 cursor-pointer ${
                       selectedNode === branch.id ? 'ring-4 ring-purple-300/50 dark:ring-purple-600/50' : ''
                     }`}
                     onClick={() => setSelectedNode(branch.id)}
                   >
                    <div className="text-center">
                                             <div className="w-12 h-12 bg-white/30 dark:bg-white/20 rounded-xl flex items-center justify-center mb-3 mx-auto">
                         <branch.icon className="w-6 h-6 text-gray-800 dark:text-white" />
                       </div>
                       <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{branch.title}</h4>
                       <p className="text-gray-700 dark:text-white/80 text-xs mb-3">{branch.description}</p>
                       
                       {showDetails && (
                         <div className="space-y-2">
                           {branch.topics.slice(0, 3).map((topic, topicIndex) => (
                             <div key={topicIndex} className="glass-liquid bg-white/40 dark:bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/40 dark:border-white/20">
                               <p className="text-gray-800 dark:text-white/90 text-xs font-medium">{topic}</p>
                             </div>
                           ))}
                           {branch.topics.length > 3 && (
                             <div className="glass-liquid bg-white/40 dark:bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/40 dark:border-white/20">
                               <p className="text-gray-700 dark:text-white/80 text-xs">+{branch.topics.length - 3} 更多...</p>
                             </div>
                           )}
                         </div>
                       )}
                       
                       <button className="mt-4 glass-liquid bg-white/50 dark:bg-white/20 hover:bg-white/60 dark:hover:bg-white/30 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/50 dark:border-white/30 transition-all duration-300 hover:scale-105">
                         <span className="text-gray-800 dark:text-white text-xs font-medium">查看详情</span>
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 详细信息面板 */}
        {selectedNode && (
          <section className="mb-8">
            <div className="glass-liquid bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {selectedNode === 'cs408' ? 'CS-408 计算机考研' : mindmapData.branches.find(b => b.id === selectedNode)?.title}
                </h2>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 p-2 rounded-xl border border-white/30 dark:border-gray-600/30 transition-all duration-300 hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              
              {selectedNode === 'cs408' ? (
                <div className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    计算机考研408是全国统考科目，包含四门核心课程：计算机组成原理、操作系统、计算机网络和数据结构。
                    通过系统性的学习和思维导图可视化，帮助考生更好地理解和记忆知识点。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-liquid bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-700/30">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">学习建议</h3>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>• 建立知识体系框架</li>
                        <li>• 理解核心概念原理</li>
                        <li>• 多做真题练习</li>
                        <li>• 定期复习巩固</li>
                      </ul>
                    </div>
                    <div className="glass-liquid bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">考试重点</h3>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>• 基础概念理解</li>
                        <li>• 算法设计与分析</li>
                        <li>• 系统设计原理</li>
                        <li>• 实际应用能力</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {(() => {
                    const branch = mindmapData.branches.find(b => b.id === selectedNode)
                    if (!branch) return null
                    
                    return (
                      <>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {branch.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="glass-liquid bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-700/30">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">核心知识点</h3>
                            <div className="space-y-2">
                              {branch.topics.map((topic, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">{topic}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="glass-liquid bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">学习要点</h3>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                              <li>• 理解基本概念</li>
                              <li>• 掌握核心原理</li>
                              <li>• 熟悉典型算法</li>
                              <li>• 练习实际应用</li>
                            </ul>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
              )}
            </div>
          </section>
        )}

        {/* 操作提示 */}
        <section className="text-center">
          <div className="glass-liquid bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-400/10 dark:to-pink-400/10 backdrop-blur-2xl rounded-3xl p-8 border border-purple-200/30 dark:border-purple-700/30 shadow-xl shadow-black/10 dark:shadow-black/30">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              交互式学习体验
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              点击任意节点查看详细信息，使用工具栏进行缩放、切换视图模式等操作。
              通过思维导图的方式，让知识点之间的联系更加清晰直观。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                             <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-8 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 relative overflow-hidden group">
                 <span className="relative z-10 flex items-center justify-center">
                   <Lightbulb className="w-5 h-5 mr-2" />
                   开始探索
                 </span>
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
               </button>
              <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-8 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  返回课程
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
