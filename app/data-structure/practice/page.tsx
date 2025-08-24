"use client"

import Navbar from '@/components/Navbar'
import DataStructureSidebar from '@/components/DataStructureSidebar'
import { 
  Target, 
  Lightbulb, 
  Database,
  Zap,
  BookOpen,
  ArrowRight,
  Clock,
  Award,
  Trophy,
  Star,
  BarChart3,
  Users,
  CheckCircle,
  FileText,
  Code,
  Cpu,
  Network,
  Settings,
  Play,
  GitBranch,
  Layers,
  Search,
  SortAsc
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function DataStructurePracticePage() {
  const practiceTopics = [
    {
      id: 'linear-structure',
      title: '线性结构',
      icon: Layers,
      description: '顺序表、链表、栈、队列等',
      questionCount: 15,
      difficulty: '基础',
      estimatedTime: '12分钟',
      color: 'from-orange-400 to-red-400'
    },
    {
      id: 'tree-structure',
      title: '树形结构',
      icon: GitBranch,
      description: '二叉树、二叉搜索树、AVL树等',
      questionCount: 18,
      difficulty: '进阶',
      estimatedTime: '15分钟',
      color: 'from-green-400 to-emerald-400'
    },
    {
      id: 'graph-structure',
      title: '图形结构',
      icon: Network,
      description: '图的表示、遍历、最短路径等',
      questionCount: 12,
      difficulty: '进阶',
      estimatedTime: '10分钟',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: 'search-algorithm',
      title: '查找算法',
      icon: Search,
      description: '顺序查找、二分查找、哈希查找等',
      questionCount: 10,
      difficulty: '基础',
      estimatedTime: '8分钟',
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: 'sort-algorithm',
      title: '排序算法',
      icon: SortAsc,
      description: '冒泡、快速、归并、堆排序等',
      questionCount: 15,
      difficulty: '进阶',
      estimatedTime: '12分钟',
      color: 'from-indigo-400 to-purple-400'
    },
    {
      id: 'algorithm-analysis',
      title: '算法分析',
      icon: BarChart3,
      description: '时间复杂度、空间复杂度分析等',
      questionCount: 8,
      difficulty: '基础',
      estimatedTime: '6分钟',
      color: 'from-yellow-400 to-orange-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="flex h-screen pt-16">
        {/* 左侧边栏 */}
        <div className="flex-shrink-0">
          <DataStructureSidebar />
        </div>
        
        {/* 主内容区域 */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* 英雄区域 */}
          <section className="relative mb-8 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 dark:border-gray-700/20 shadow-2xl shadow-black/10 dark:shadow-black/30">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 dark:from-orange-400 dark:via-red-400 dark:to-orange-400 bg-clip-text text-transparent mb-4">
                  数据结构练习
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  通过系统性的练习巩固数据组织与算法设计的核心知识点
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>预计时间: 63分钟</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>题目数量: 78题</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>难度: 基础到进阶</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 练习主题选择 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Play className="w-6 h-6 mr-3 text-orange-600 dark:text-orange-400" />
                选择练习主题
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {practiceTopics.map((topic, index) => {
                  // 根据主题ID确定跳转链接
                  const getTopicLink = (topicId: string) => {
                    switch (topicId) {
                      case 'linear-structure':
                        return '/data-structure/sequential-list/practice'
                      case 'tree-structure':
                        return '/data-structure/tree-structure/practice'
                      case 'graph-structure':
                        return '/data-structure/graph-structure/practice'
                      case 'search-algorithm':
                        return '/data-structure/search-sort/practice'
                      case 'sort-algorithm':
                        return '/data-structure/search-sort/practice'
                      case 'algorithm-analysis':
                        return '/data-structure/practice'
                      default:
                        return '/data-structure/practice'
                    }
                  }

                  return (
                    <Link href={getTopicLink(topic.id)} key={topic.id}>
                      <div className="glass-liquid bg-gradient-to-r from-orange-50/50 to-red-50/50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200/30 dark:border-orange-700/30 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer group h-full">
                        <div className="flex flex-col h-full">
                          {/* 头部区域：图标和标题 */}
                          <div className="flex items-start space-x-4 mb-4">
                            <div className={`w-14 h-14 bg-gradient-to-br ${topic.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                              <topic.icon className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 leading-tight">{topic.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{topic.description}</p>
                            </div>
                          </div>
                          
                          {/* 中间区域：统计信息 */}
                          <div className="flex items-center justify-between mb-6 px-1">
                            <div className="flex items-center space-x-6">
                              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <BookOpen className="w-4 h-4" />
                                <span className="font-medium">{topic.questionCount}题</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <Clock className="w-4 h-4" />
                                <span className="font-medium">{topic.estimatedTime}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <Star className="w-4 h-4" />
                                <span className="font-medium">{topic.difficulty}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* 底部区域：开始练习按钮 */}
                          <div className="mt-auto">
                            <div className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-xl font-semibold text-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-gray-500/25 border border-gray-300/50 dark:border-gray-600/50 flex items-center justify-center space-x-2">
                              <span>开始{topic.difficulty === '基础' ? '基础' : '进阶'}练习</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>

          {/* 综合练习 */}
          <section className="mb-8">
            <div className="glass-liquid bg-gradient-to-r from-orange-500/10 to-red-500/10 dark:from-orange-400/10 dark:to-red-400/10 backdrop-blur-2xl rounded-3xl p-8 border border-orange-200/30 dark:border-orange-700/30 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  综合练习测试
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  包含所有知识点的综合练习，全面检验数据结构的掌握程度。
                  建议在完成各主题练习后进行。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="glass-liquid bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-white/30 dark:border-gray-700/30">
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">78</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">总题目数</div>
                  </div>
                  <div className="glass-liquid bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-white/30 dark:border-gray-700/30">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">63分钟</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">预计用时</div>
                  </div>
                  <div className="glass-liquid bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-white/30 dark:border-gray-700/30">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">综合</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">难度等级</div>
                  </div>
                </div>
                
                <button className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 border border-gray-300/50 dark:border-gray-600/50 flex items-center space-x-2 mx-auto">
                  <Play className="w-5 h-5" />
                  <span>开始综合练习</span>
                </button>
              </div>
            </div>
          </section>

          {/* 学习建议 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-3 text-yellow-600 dark:text-yellow-400" />
                学习建议
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">练习顺序建议</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>先完成基础主题：线性结构、查找算法、算法分析</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>再练习进阶主题：树形结构、图形结构、排序算法</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>最后进行综合练习，检验整体掌握情况</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">重点知识点</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>掌握各种数据结构的特点和适用场景</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>理解算法的设计思想和实现方法</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>学会分析算法的时间复杂度和空间复杂度</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 导航按钮 */}
          <section className="flex justify-between items-center">
            <Link href="/practice">
              <button className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 flex items-center space-x-2 shadow-lg">
                <ArrowRight className="w-5 h-5 rotate-180" />
                <span>返回练习中心</span>
              </button>
            </Link>
            
            <Link href="/data-structure">
              <button className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 flex items-center space-x-2 shadow-lg">
                <span>返回学习</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
 