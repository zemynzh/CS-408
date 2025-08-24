'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import DataStructureSidebar from '@/components/DataStructureSidebar'
import { 
  Search, 
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
  Home,
  ChevronLeft,
  Hash,
  SortAsc,
  SortDesc,
  Filter,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

interface SearchSortItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  href: string
  status: 'available' | 'coming-soon'
}

export default function SearchSortPage() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const searchSortItems: SearchSortItem[] = [
    {
      id: 'sequential-search',
      title: '顺序查找',
      description: '线性查找和哨兵查找算法',
      icon: <Search className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      href: '/data-structure/sequential-search',
      status: 'coming-soon'
    },
    {
      id: 'binary-search',
      title: '二分查找',
      description: '折半查找和插值查找算法',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      href: '/data-structure/binary-search',
      status: 'coming-soon'
    },
    {
      id: 'hash-table',
      title: '散列表',
      description: '哈希函数和冲突处理方法',
      icon: <Hash className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      href: '/data-structure/hash-table',
      status: 'coming-soon'
    },
    {
      id: 'internal-sort',
      title: '内部排序',
      description: '冒泡、选择、插入排序算法',
      icon: <SortAsc className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      href: '/data-structure/internal-sort',
      status: 'coming-soon'
    },
    {
      id: 'advanced-sort',
      title: '高级排序',
      description: '快排、归并、堆排序算法',
      icon: <SortDesc className="w-8 h-8" />,
      color: 'from-teal-500 to-green-500',
      href: '/data-structure/advanced-sort',
      status: 'coming-soon'
    },
    {
      id: 'external-sort',
      title: '外部排序',
      description: '多路归并和置换选择算法',
      icon: <Filter className="w-8 h-8" />,
      color: 'from-indigo-500 to-purple-500',
      href: '/data-structure/external-sort',
      status: 'coming-soon'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-400/6 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>
            
            <div className="relative glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 dark:border-gray-700/20 shadow-2xl shadow-black/10 dark:shadow-black/30">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 shadow-lg">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-800 dark:from-orange-400 dark:via-red-400 dark:to-orange-600 bg-clip-text text-transparent mb-4">
                  查找与排序
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  掌握高效的数据查找和排序技术，从基础算法到高级优化策略
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span>6个核心概念</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>算法效率</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>性能优化</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 查找与排序导航 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Play className="w-6 h-6 mr-3 text-orange-600 dark:text-orange-400" />
                选择学习内容
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchSortItems.map((item) => (
                  <div
                    key={item.id}
                    className={`glass-liquid rounded-2xl p-6 border transition-all duration-300 cursor-pointer group ${
                      item.status === 'available'
                        ? 'hover:shadow-lg hover:shadow-orange-500/20 border-orange-200/30 dark:border-orange-700/30'
                        : 'opacity-60 cursor-not-allowed border-gray-200/30 dark:border-gray-700/30'
                    }`}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.status === 'available' ? (
                      <Link href={item.href}>
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-center text-orange-600 dark:text-orange-400 font-medium group-hover:translate-x-1 transition-transform duration-300">
                              <span>开始学习</span>
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl shadow-lg`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium">
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
            <Link href="/data-structure/graph-structure">
              <button className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 flex items-center space-x-2 shadow-lg">
                <ChevronLeft className="w-5 h-5" />
                <span>图结构</span>
              </button>
            </Link>
            
            <Link href="/data-structure/linear-structure">
              <button className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 flex items-center space-x-2 shadow-lg">
                <span>线性结构</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
