"use client"

import Navbar from '@/components/Navbar'
import OperatingSystemSidebar from '@/components/OperatingSystemSidebar'
import { 
  Target, 
  Lightbulb, 
  Layers,
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
  Database,
  Cpu,
  Network,
  Settings,
  Play,
  Shield,
  HardDrive
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function OperatingSystemPracticePage() {
  const practiceTopics = [
    {
      id: 'process-management',
      title: '进程管理',
      icon: Cpu,
      description: '进程创建、调度、同步、通信等',
      questionCount: 12,
      difficulty: '基础',
      estimatedTime: '10分钟',
      color: 'from-green-400 to-emerald-400'
    },
    {
      id: 'memory-management',
      title: '内存管理',
      icon: Database,
      description: '分页、分段、虚拟内存、页面置换等',
      questionCount: 15,
      difficulty: '进阶',
      estimatedTime: '12分钟',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: 'file-system',
      title: '文件系统',
      icon: FileText,
      description: '文件组织、目录结构、文件操作等',
      questionCount: 10,
      difficulty: '基础',
      estimatedTime: '8分钟',
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: 'device-management',
      title: '设备管理',
      icon: HardDrive,
      description: 'I/O控制、设备驱动、中断处理等',
      questionCount: 8,
      difficulty: '进阶',
      estimatedTime: '8分钟',
      color: 'from-orange-400 to-red-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="flex h-screen pt-16">
        {/* 左侧边栏 */}
        <div className="flex-shrink-0">
          <OperatingSystemSidebar />
        </div>
        
        {/* 主内容区域 */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* 英雄区域 */}
          <section className="relative mb-8 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 dark:border-gray-700/20 shadow-2xl shadow-black/10 dark:shadow-black/30">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent mb-4">
                  操作系统练习
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  通过系统性的练习巩固计算机系统资源管理与进程调度的核心知识点
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>预计时间: 38分钟</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>题目数量: 45题</span>
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
                <Play className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
                选择练习主题
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {practiceTopics.map((topic, index) => (
                  <div key={topic.id} className="glass-liquid bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/30 dark:border-green-700/30 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <topic.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{topic.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{topic.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <BookOpen className="w-3 h-3" />
                              <span>{topic.questionCount}题</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{topic.estimatedTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3" />
                              <span>{topic.difficulty}</span>
                            </div>
                          </div>
                          
                          <div className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-sm flex items-center group/link">
                            开始练习 <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 综合练习 */}
          <section className="mb-8">
            <div className="glass-liquid bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-400/10 dark:to-emerald-400/10 backdrop-blur-2xl rounded-3xl p-8 border border-green-200/30 dark:border-green-700/30 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  综合练习测试
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  包含所有知识点的综合练习，全面检验操作系统的掌握程度。
                  建议在完成各主题练习后进行。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="glass-liquid bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-white/30 dark:border-gray-700/30">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">45</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">总题目数</div>
                  </div>
                  <div className="glass-liquid bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-white/30 dark:border-gray-700/30">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">38分钟</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">预计用时</div>
                  </div>
                  <div className="glass-liquid bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-white/30 dark:border-gray-700/30">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">综合</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">难度等级</div>
                  </div>
                </div>
                
                <button className="glass-liquid bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto">
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
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>先完成基础主题：进程管理、文件系统</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>再练习进阶主题：内存管理、设备管理</span>
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
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>理解进程的生命周期和调度算法</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>掌握虚拟内存和页面置换机制</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>熟悉文件系统的组织和管理方式</span>
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
            
            <Link href="/operating-system">
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
