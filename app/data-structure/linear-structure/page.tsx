'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import DataStructureSidebar from '@/components/DataStructureSidebar'
import { 
  List, 
  ArrowRight, 
  ChevronRight,
  BookOpen,
  Code,
  Play,
  Target,
  Award,
  Clock,
  Users,
  Zap,
  Layers,
  Database,
  Cpu,
  GitBranch,
  Network,
  Search,
  Home,
  ChevronLeft
} from 'lucide-react'
import Link from 'next/link'

interface LinearStructureItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  href: string
  status: 'available' | 'coming-soon'
}

export default function LinearStructurePage() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const linearStructures: LinearStructureItem[] = [
    {
      id: 'linear-list',
      title: '线性表',
      description: '顺序表和链表的基本概念、操作和实现',
      icon: <List className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      href: '/data-structure/sequential-list',
      status: 'available'
    },
    {
      id: 'stack',
      title: '栈',
      description: '后进先出(LIFO)的数据结构及其应用',
      icon: <Layers className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      href: '/data-structure/stack',
      status: 'coming-soon'
    },
    {
      id: 'queue',
      title: '队列',
      description: '先进先出(FIFO)的数据结构及其变体',
      icon: <Database className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      href: '/data-structure/queue',
      status: 'coming-soon'
    },
    {
      id: 'string',
      title: '串',
      description: '字符串的基本操作和模式匹配算法',
      icon: <Code className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      href: '/data-structure/string',
      status: 'coming-soon'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="flex h-screen pt-16">
        {/* 左侧边栏 - 固定 */}
        <div className="flex-shrink-0">
          <DataStructureSidebar />
        </div>
        
        {/* 主内容区域 - 可滚动 */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* 英雄区域 */}
          <section className="relative mb-8 overflow-hidden">
            {/* 背景液体效果 */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/6 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>
            
            <div className="relative glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 dark:border-gray-700/20 shadow-2xl shadow-black/10 dark:shadow-black/30">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-6 shadow-lg">
                  <List className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-600 bg-clip-text text-transparent mb-4">
                  线性结构
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  探索线性数据结构的世界，从基础的线性表到高级的栈、队列和串操作
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span>4个核心概念</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>基础到进阶</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>实践应用</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 线性结构导航 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Play className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                选择学习内容
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {linearStructures.map((item) => (
                  <div
                    key={item.id}
                    className={`glass-liquid rounded-2xl p-6 border transition-all duration-300 cursor-pointer group ${
                      item.status === 'available'
                        ? 'hover:shadow-lg hover:shadow-blue-500/20 border-blue-200/30 dark:border-blue-700/30'
                        : 'opacity-60 cursor-not-allowed border-gray-200/30 dark:border-gray-700/30'
                    }`}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.status === 'available' ? (
                      <Link href={item.href}>
                        <div className="flex items-start space-x-4">
                          <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                              {item.description}
                            </p>
                            <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform duration-300">
                              <span>开始学习</span>
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex items-start space-x-4">
                        <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl shadow-lg`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 font-medium">
                            <span>即将推出</span>
                            <Clock className="w-4 h-4 ml-1" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 导航按钮 */}
          <section className="flex justify-between items-center">
            <Link href="/data-structure">
              <button className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 flex items-center space-x-2 shadow-lg">
                <ChevronLeft className="w-5 h-5" />
                <span>返回数据结构</span>
              </button>
            </Link>
            
            <Link href="/data-structure/tree-structure">
              <button className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 flex items-center space-x-2 shadow-lg">
                <span>树形结构</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
} 